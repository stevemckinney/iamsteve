const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()

  // Clean the URL if it has YAML formatting artifacts
  let cleanUrl = answers.url;
  if (typeof cleanUrl === 'string') {
    cleanUrl = cleanUrl.replace(/^>-\s+/, '').trim();
  }

  // Determine if URL needs quotes
  const needsQuotes = cleanUrl.includes(':') ||
                     cleanUrl.includes('#') ||
                     cleanUrl.includes('?') ||
                     cleanUrl.includes('&') ||
                     cleanUrl.includes(' ');

  const urlField = needsQuotes ? `url: "${cleanUrl}"` : `url: ${cleanUrl}`;

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  ${urlField}
  date: "${date}"
  collection:
    ${answers.collection ? `- ${answers.collection}` : ''}
  type: Collections
  `
  frontmatter = frontmatter + '\n---'

  return frontmatter
}

const importFromJson = (jsonFilePath, options = {}) => {
  try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const bookmarks = JSON.parse(jsonData);

    // Apply category filter if specified
    let filteredBookmarks = bookmarks;
    if (options.filterCategory) {
      filteredBookmarks = bookmarks.filter(b => b.collection === options.filterCategory);
      console.log(`Filtered to ${filteredBookmarks.length} bookmarks in category "${options.filterCategory}"`);
    }

    console.log(`Found ${filteredBookmarks.length} bookmarks in ${jsonFilePath}`);

    // Initialize counters
    let wouldProcess = 0;
    let wouldSkip = 0;
    const duplicates = [];
    const newEntries = [];

    // Function to normalize URLs for comparison
    const normalizeUrl = (url) => {
      try {
        if (!url) return '';

        // Clean any YAML artifacts
        url = url.replace(/^>-\s+/, '').trim();

        // Remove quotes if present
        url = url.replace(/^["'](.*)["']$/, '$1');

        // Create URL object (handles normalization of many aspects)
        let urlObj;
        try {
          urlObj = new URL(url);
        } catch (e) {
          // If URL parsing fails, return the original URL
          return url.toLowerCase();
        }

        // Normalize hostname (remove www if present)
        let hostname = urlObj.hostname.toLowerCase();
        if (hostname.startsWith('www.')) {
          hostname = hostname.substring(4);
        }

        // Normalize path (ensure trailing slash consistency)
        let path = urlObj.pathname;
        if (path === '/') path = '';

        // Reconstruct the normalized URL
        const normalizedUrl = `${urlObj.protocol}//${hostname}${path}`;

        // Include query parameters if present
        if (urlObj.search) {
          return normalizedUrl + urlObj.search;
        }

        return normalizedUrl;
      } catch (e) {
        console.error(`Error normalizing URL ${url}: ${e.message}`);
        return url;
      }
    };

    // Process each bookmark
    filteredBookmarks.forEach(bookmark => {
      // Check for duplicates by checking if a file with this URL already exists
      let isDuplicate = false;
      let duplicateFile = null;

      try {
        const files = fs.readdirSync('content/collections/');

        // Normalize the bookmark URL for comparison
        const normalizedBookmarkUrl = normalizeUrl(bookmark.url);

        for (const file of files) {
          if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const content = fs.readFileSync(`content/collections/${file}`, 'utf8');

            // Extract URL from content using regex
            const urlMatch = content.match(/url:\s*["']?(.*?)["']?\s*$/m);

            if (urlMatch && urlMatch[1]) {
              const contentUrl = urlMatch[1].trim();
              const normalizedContentUrl = normalizeUrl(contentUrl);

              if (normalizedBookmarkUrl === normalizedContentUrl) {
                isDuplicate = true;
                duplicateFile = file;
                break;
              }
            }
          }
        }
      } catch (err) {
        console.error(`Error checking for duplicates: ${err.message}`);
      }

      if (isDuplicate) {
        wouldSkip++;
        duplicates.push({
          title: bookmark.title,
          url: bookmark.url,
          normalizedUrl: normalizeUrl(bookmark.url),
          collection: bookmark.collection,
          existingFile: duplicateFile
        });
      } else {
        wouldProcess++;
        newEntries.push({
          title: bookmark.title,
          url: bookmark.url,
          collection: bookmark.collection
        });
      }

      // If not a dry run, create the file
      if (!options.dryRun && !isDuplicate) {
        // Add extension if not present
        if (!bookmark.extension) {
          bookmark.extension = 'md';
        }

        // Create the file
        const fileName = bookmark.title
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .replace(/ /g, '-')
          .replace(/-+/g, '-')
          .substring(0, 100); // Limit filename length

        const frontmatter = genFrontMatter(bookmark);

        const filePath = `content/collections/${fileName || 'untitled'}.${bookmark.extension}`;

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
      console.log(`Total bookmarks: ${filteredBookmarks.length}`);
      console.log(`Would create: ${wouldProcess}`);
      console.log(`Would skip (duplicates): ${wouldSkip}`);

      if (duplicates.length > 0) {
        console.log('\n=== DUPLICATES ===');
        duplicates.forEach((dup, index) => {
          console.log(`${index + 1}. "${dup.title}" (${dup.collection})`);
          console.log(`   URL: ${dup.url}`);
          console.log(`   Normalized URL: ${dup.normalizedUrl}`);
          console.log(`   Already exists in: ${dup.existingFile}`);
        });
      }

      if (newEntries.length > 0 && options.verbose) {
        console.log('\n=== NEW ENTRIES ===');
        newEntries.forEach((entry, index) => {
          console.log(`${index + 1}. "${entry.title}" (${entry.collection})`);
          console.log(`   URL: ${entry.url}`);
        });
      }
    } else {
      console.log(`\nImport complete: ${wouldProcess} created, ${wouldSkip} skipped`);
    }

  } catch (error) {
    console.error(`Error importing from JSON: ${error.message}`);
  }
};

const args = process.argv.slice(2);

if (args.length > 0 && args[0] === '--import-json') {
  const jsonFilePath = args[1];

  if (!jsonFilePath) {
    console.error('Please provide a path to the JSON file');
    process.exit(1);
  }

  // Parse options
  const options = {
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose')
  };

  // Check for filter
  const filterIndex = args.indexOf('--filter');
  if (filterIndex !== -1 && args.length > filterIndex + 1) {
    options.filterCategory = args[filterIndex + 1];
  }

  // Show what we're doing
  if (options.dryRun) {
    console.log('Running in DRY RUN mode - no files will be created');
  }

  importFromJson(jsonFilePath, options);
  process.exit(0);
}

// Your existing inquirer prompt code
inquirer
  .prompt([
    {
      name: 'title',
      message: 'Title:',
      type: 'input',
    },
    {
      name: 'url',
      message: 'URL:',
      type: 'input',
    },
    {
      name: 'collection',
      message: 'Collection:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontmatter = genFrontMatter(answers)

    // 00 will break here at some point, but that's a long while off
    const filePath = `content/collections/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
    fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Collection item generated successfully at ${filePath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!')
    }
  })
