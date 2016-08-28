# Cookie

This plugin lets you easily get and set cookies in your ExpressionEngine templates. It automatically respects your ExpressionEngine's cookie preferences so the prefix, domain, and flags are unified with the rest of the application cookies. Since the prefix is handled automatically, just refer to the cookie by its descriptive name, e.g. `example_cookie` instead of `exp_example_cookie`.


## Requirements

- ExpressionEngine 3
- PHP 5.4+

## Installation

1. Download the [latest release](https://github.com/EllisLab/Cookie/releases/latest).
2. Copy the `cookie` folder to your `system/user/addons` folder (you can ignore the rest of this repository's files).
3. In your ExpressionEngine control panel, visit the Add-On Manager and click Install next to "Cookie".

## Usage

### `{exp:cookie:delete}`

#### Example Usage

This is a single tag that deletes a cookie with the given name.

```
{exp:cookie:delete name='ab_test'}
```

#### Parameters

- `name=` (*required*) - The name of the cookie to delete.

### `{exp:cookie:get}`

#### Example Usage

This is a single tag that retreives and outputs the value of a cookie with the given name.

```
{exp:cookie:get name='ab_test'}
```

#### Parameters

- `name=` (*required*) - The name of the cookie to get.
- `sanitize=` - (`yes`/`no`) Whether or not to perform XSS sanitization on the cookie value, default `yes`.
- `htmlentities=` - (`yes`/`no`) Whether or not to convert all applicable characters to HTML entities, default `yes`. You should always leave this enabled when outputting cookie values to HTML tag attributes or ExpressionEngine tags. Since cookies are user input, it's best to be defensive, and this will also prevent HTML in cookie values from being rendered by the browser.

### `{exp:cookie:set}`

#### Example Usage

This is a single tag that stores a cookie with the given content and name.

```
{exp:cookie:set name="recent_article" value="{entry_id}" expire="1209600"}
```

#### Parameters

- `name=` (*required*) - The name of the cookie to set.
- `value=` (*required*) - The content to store in the cookie.
- `expire=` (*required*) - The time in seconds that the cookie should live.

## Change Log

### 1.0.0

- Initial release. Boom!

## Additional Files

You may be wondering what the rest of the files in this package are for. They are solely for development, so if you are forking the GitHub repo, they can be helpful. If you are just using the add-on in your ExpressionEngine installation, you can ignore all of these files.

- **.editorconfig**: [EditorConfig](http://editorconfig.org) helps developers maintain consistent coding styles across files and text editors.
- **.gitignore:** [.gitignore](https://git-scm.com/docs/gitignore) lets you specify files in your working environment that you do not want under source control.
- **.travis.yml:** A [Travis CI](https://travis-ci.org) configuration file for continuous integration (automated testing, releases, etc.).
- **.composer.json:** A [Composer project setup file](https://getcomposer.org/doc/01-basic-usage.md) that manages development dependencies.
- **.composer.lock:** A [list of dependency versions](https://getcomposer.org/doc/01-basic-usage.md#composer-lock-the-lock-file) that Composer has locked to this project.

## License

Copyright (C) 2016 EllisLab, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ELLISLAB, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of EllisLab, Inc. shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from EllisLab, Inc.
