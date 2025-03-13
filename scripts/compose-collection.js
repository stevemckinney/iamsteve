const fs = require('fs');
const path = require('path');

// Function to normalize URLs for comparison and filename generation
const normalizeUrlForFilename = (url) => {
  try {
    if (!url) return 'untitled';

    // Create URL object to parse the URL
    let urlObj;
    try {
      urlObj = new URL(url);
    } catch (e) {
      // If URL parsing fails, return a default value
      return 'untitled';
    }

    // Extract hostname and path, remove protocol and TLD
    let hostname = urlObj.hostname.toLowerCase();
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }

    // Remove TLD
    const domainParts = hostname.split('.');
    const domainWithoutTld = domainParts.slice(0, -1).join('-');

    // Normalize path (remove leading/trailing slashes)
    let path = urlObj.pathname.replace(/^\/|\/$/g, '');

    // Combine hostname and path for filename
    const combined = path ? `${domainWithoutTld}-${path}` : domainWithoutTld;

    // Slugify: replace spaces and special characters with hyphens
    let slug = combined
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
      .substring(0, 100); // Limit filename length

    return slug || 'untitled';
  } catch (e) {
    console.error(`Error generating filename from URL ${url}: ${e.message}`);
    return 'untitled';
  }
};

// Function to generate frontmatter
const genFrontMatter = (bookmark) => {
  const date = new Date().toISOString();
  return `---
title: ${bookmark.title}
url: "${bookmark.url}"
date: "${date}"
collection:
  - ${bookmark.collection}
type: Collections
---
`;
};

// Function to import bookmarks from JSON
const importFromJson = (bookmarksFilePath, indexFilePath, options = {}) => {
  try {
    const bookmarksData = fs.readFileSync(bookmarksFilePath, 'utf8');
    const bookmarks = JSON.parse(bookmarksData);

    const indexData = fs.readFileSync(indexFilePath, 'utf8');
    const existingCollections = JSON.parse(indexData);

    console.log(`Found ${bookmarks.length} bookmarks in ${bookmarksFilePath}`);

    // Normalize existing collection URLs
    const existingUrls = new Set();
    existingCollections.forEach(item => {
      const normalizedUrl = normalizeUrlForFilename(item.url);
      existingUrls.add(normalizedUrl);
    });

    // Initialize counters
    let wouldProcess = 0;
    let wouldSkip = 0;
    const duplicates = [];
    const newEntries = [];

    // Process each bookmark
    bookmarks.forEach(bookmark => {
      const normalizedBookmarkUrl = normalizeUrlForFilename(bookmark.url);

      if (existingUrls.has(normalizedBookmarkUrl)) {
        wouldSkip++;
        duplicates.push({
          title: bookmark.title,
          url: bookmark.url,
          normalizedUrl: normalizedBookmarkUrl
        });
      } else {
        wouldProcess++;
        newEntries.push({
          title: bookmark.title,
          url: bookmark.url,
          collection: bookmark.collection,
          filename: normalizedBookmarkUrl
        });
      }

      // If not a dry run, create the file
      if (!options.dryRun && !existingUrls.has(normalizedBookmarkUrl)) {
        // Add extension if not present
        if (!bookmark.extension) {
          bookmark.extension = 'md';
        }

        // Create the file
        const fileName = normalizedBookmarkUrl || 'untitled';

        const frontmatter = genFrontMatter(bookmark);

        const filePath = `content/collections/${fileName}.${bookmark.extension}`;

        try {
          fs.writeFileSync(filePath, frontmatter, { flag: 'wx' });
          console.log(`Created: ${fileName}`);
        } catch (err) {
          console.error(`Error creating file for ${bookmark.url}: ${err.message}`);
        }
      }
    });

    // Display summary based on mode
    if (options.dryRun) {
      console.log('\n=== DRY RUN SUMMARY ===');
      console.log(`Total bookmarks: ${bookmarks.length}`);
      console.log(`Would create: ${wouldProcess}`);
      console.log(`Would skip (duplicates): ${wouldSkip}`);

      if (duplicates.length > 0) {
        console.log('\n=== DUPLICATES ===');
        duplicates.forEach((dup, index) => {
          console.log(`${index + 1}. "${dup.title}"`);
          console.log(`   URL: ${dup.url}`);
          console.log(`   Normalized URL: ${dup.normalizedUrl}`);
        });
      }

      if (newEntries.length > 0 && options.verbose) {
        console.log('\n=== NEW ENTRIES ===');
        newEntries.forEach((entry, index) => {
          console.log(`${index + 1}. "${entry.title}"`);
          console.log(`   URL: ${entry.url}`);
          console.log(`   Filename: ${entry.filename}`);
        });
      }
    } else {
      console.log(`\nImport complete: ${wouldProcess} created, ${wouldSkip} skipped`);
    }

  } catch (error) {
    console.error(`Error importing from JSON: ${error.message}`);
  }
};

// Example usage
const args = process.argv.slice(2);
const bookmarksFilePath = args[0] || 'bookmarks.json';
const indexFilePath = args[1] || '_index.json';
const options = {
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose')
};

importFromJson(bookmarksFilePath, indexFilePath, options);
