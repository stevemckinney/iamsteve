# Allow EE Code

Allows ExpressionEngine code to be used in entries. **This add-on should be used with extreme caution, if at all. Ask yourself if you should really be putting tags inside _content_. If you are confident the answer is yes, here you go!**

## Installation

1. Download the [latest release](https://github.com/EllisLab/Allow-Eecode/releases/latest).
2. Copy the `allowed_eecode` folder to your `system/user/addons` folder (you can ignore the rest of this repository's files).
3. In your ExpressionEngine control panel, visit the Add-On Manager and click Install next to "Allow EE Code".

## Usage

### `{exp:allow_eecode}`

#### Example Usage

```
{exp:allow_eecode}

    field whose ExpressionEngine code you want processed (ex: {body})

{/exp:allow_eecode}
```

#### Parameters

- `query` - (y/n) Allow you to allow the use of the {exp:query} tag in your entries. Set to 'n' by default.
- `embed` - (y/n) Allow you to allow the use of {embed} tags in your entries. Set to 'n' by default.

## Change Log

### 2.0.2

- Clarified installation instructions, setup auto-builds from tags.

### 2.0.1

- Added installation instructions.

### 2.0

- Updated plugin to be 3.0 compatible

### 1.4

- Updated plugin to be 2.0 compatible

### 1.3

- Updated plugin to work with 1.6.5's typography changes

### 1.2

- Fixed a bug where code containing single variables would not work

### 1.1

- Added embed parameter to tag to enable the use of {embed} tags in entries.

### 1.0.2

- Fixed a bug where any code containing variables pairs would not work (ex: {items} blah {/items})

### 1.0.1

- Removed the ability to use the {exp:query} plugin by default for security reasons.
- Added query parameter to tag to enable the use of {exp:query} in entries.

## Additional Files

You may be wondering what the rest of the files in this package are for. They are solely for development, so if you are forking the GitHub repo, they can be helpful. If you are just using the add-on in your ExpressionEngine installation, you can ignore all of these files.

- **.editorconfig**: [EditorConfig](http://editorconfig.org) helps developers maintain consistent coding styles across files and text editors.
- **.gitignore:** [.gitignore](https://git-scm.com/docs/gitignore) lets you specify files in your working environment that you do not want under source control.
- **.travis.yml:** A [Travis CI](https://travis-ci.org) configuration file for continuous integration (automated testing, releases, etc.).
- **.composer.json:** A [Composer project setup file](https://getcomposer.org/doc/01-basic-usage.md) that manages development dependencies.
- **.composer.lock:** A [list of dependency versions](https://getcomposer.org/doc/01-basic-usage.md#composer-lock-the-lock-file) that Composer has locked to this project.

## License

Copyright (C) 2004 - 2016 EllisLab, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ELLISLAB, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of EllisLab, Inc. shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from EllisLab, Inc.
