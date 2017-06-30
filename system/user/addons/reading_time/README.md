# Reading Time

The Reading Time plugin lets you output an estimated reading time for a given bit of content.

> You can read this in about 3 minutes

## Installation

1. Download the [latest release](https://github.com/EllisLab/Reading-Time/releases/latest).
2. Copy the `reading_time` folder to your `system/user/addons` folder (you can ignore the rest of this repository's files).
3. In your ExpressionEngine control panel, visit the Add-On Manager and click Install next to "Reading Time".

## Usage

### `{exp:reading_time}`

This is the Reading Time's only tag, it is used as follows.

#### Example Usage

```
{exp:reading_time}
    {exp:channel:entries channel="blog"}
        <h1>{title}</h1>
        <p>You can read this {finished_reading_time:relative}.</p>

        {content}
    {/exp:channel:entries}
{/exp:reading_time}
```

#### Parameters

- `wpm` - Words per minute. _default: 200_

#### Variables

##### {finished_reading_time}

Timestamp that the visitor will be finished reading the content. This variable is an [ExpressionEngine date variable](https://docs.expressionengine.com/latest/templates/date_variable_formatting.html) which provides immense flexibility in output. For example, you can output the time they'll be finished:

    You'll be done reading at {finished_reading_time format="%h:%i%a"}.
    <!-- You'll be done reading at 12:41pm -->

Or a relative time:

    You can read this {finished_reading_time:relative}.
    <!-- You can read this in 3 minutes. -->

[Relative dates](https://docs.expressionengine.com/latest/templates/date_variable_formatting.html#relative-dates) allow you to customize the output quite a bit:

    You can read this {finished_reading_time:relative depth="2"}.
    <!-- You can read this in 6 minutes and 57 seconds. -->

Or even:

    You'll know how to make {recipe_title} {finished_reading_time:relative future="%s from now"}!
    <!-- You'll know how to make Beef Bourguignonne 12 minutes from now! -->

## Changelog

### 2.0.1

- Automated linting and release builds (dev, no functional change)

### 2.0.0

- ExpressionEngine 3 Compatible

### 1.0.0

- Initial release

## License

Copyright (C) 2015–2016 EllisLab, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL ELLISLAB, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Except as contained in this notice, the name of EllisLab, Inc. shall not be used in advertising or otherwise to promote the sale, use or other dealings in this Software without prior written authorization from EllisLab, Inc.
