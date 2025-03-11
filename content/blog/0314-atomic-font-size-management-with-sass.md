---
title: '‘Atomic’ font size management with Sass'
date: '2018-06-13T06:27:00+00:00'
lastmod: '2019-10-10T11:44:17+00:00'
summary: 'In a responsive world, managing font sizes can be tricky. So how can an atomic approach help?'
metadesc: 'How many times do you set a font size? How do you manage consistency? An atomic approach can help with both of these issues.'
theme: '#f8fbfc'
tags: ['Code', 'CSS']
categories: ['Code', 'CSS']
images: ['/images/blog/atomic-font-sizes-featured-image@2x.png']
large: '/images/blog/atomic-font-sizes-featured-image@2x.png'
medium: '/images/blog/atomic-font-sizes-featured-image-medium@2x.png'
ogImage: '/assets/og/cover.jpg'
status: 'open'
id: 314
fileroot: 'atomic-font-size-management-with-sass'
---

Have you found yourself thinking: ‘how many times have I set this font size?’ If so, this post should help. Font size management is challenging, especially with responsive design. However, I’ve been using an ‘atomic’ approach with Sass which has made things easier.

## A very brief overview of tachyons/atomic CSS

If you’re new to this style of writing CSS, the principle is generally to do one thing and do it well, and across multiple breakpoints.

In the example of font sizing, we’ll end up with CSS which looks somewhat like the following:

```css:example.css showLineNumbers
.f1 {
  font-size: 36px; }

/* and so on... */

.f6 {
  font-size: 16px; }

@media (min-width: 480px) {
  .f1-a {
    font-size: 36px; }

  /* and so on... */

  .f6-a {
    font-size: 16px; } }

@media (min-width: 960px) {
  .f1-d {
    font-size: 36px; }

  /* and so on... */

  .f6-d {
    font-size: 16px; } } }
```

You have multiple class names for applying one property across a set of media queries. The class names inside the media queries have a suffix which identifies them eg: `-a`. You may have more font sizes, you may have more breakpoints. The idea is speed, less repetitive writing of the same CSS and more consistency.

```markup title="example.html" showLineNumbers
<h1 class="f3 f2-a f1-d">This is my heading</h1>
<p class="f6 f5-d">This is my paragraph of text, lorem ipsum dolor sit.</p>
```

There’s something nice about this approach to your HTML:

1. Knowing which font size is applied at which media query
2. Knowing changes won’t affect anywhere else
3. Being able to trial sizes quickly
4. Knowing the font sizes are always part of your type scale

Now, let’s get into the setup with Sass.

## To begin get your font sizes together

Depending on the stage you find yourself at, be it the site is built, ready to build or in the design phase. The first step is to gather all the font sizes you currently have. This can also help identify where you may have too many.

### Add your font sizes to variables

Next, add each of those font sizes to variables. They will be used within the next steps, it also helps keep things reusable.

```scss:variables.scss showLineNumbers
$f1: 36px;
$f2: 30px;
$f3: 24px;
$f4: 21px;
$f5: 18px;
$f6: 16px;
```

The naming of each variable isn’t make or break. For me `f1` through `f6` works well. The similarity is shared with `h1` through `h6`. `h1` is the larger and `h6` is the smaller. Also, it isn’t necessarily tied to being the ‘h’ of heading.

### Set up the initial font sizes

Next, you need to choose a naming convention and write the CSS for your font sizes. These will be used as the lowest breakpoint, or when you don’t need the font size to change across the board.

```scss:typography.scss showLineNumbers
.f1 {
  font-size: $f1;
}
.f2 {
  font-size: $f2;
}
.f3 {
  font-size: $f3;
}
.f4 {
  font-size: $f4;
}
.f5 {
  font-size: $f5;
}
.f6 {
  font-size: $f6;
}
```

### Setting up a breakpoint map

Now you need to decide how many breakpoints you want each font size to be applied at. I’m using three in the following example, but it’s entirely up to what your design requires.

```scss showLineNumbers
$a: 480px;
$b: 600px;
$c: 960px;
```

Define variables for your widths, like your font sizes. And again, naming isn’t hugely important, but I always recommend something short and memorable.

```scss:_font-size.scss showLineNumbers
$breakpoint-map: (
  'a': $a,
  'b': $b,
  'c': $c,
);
```

The second step is to set up your breakpoint map. You want the keys (eg: `'a'`) to be named the same as your variables minus the `$`, the values of those keys are your variables.

### Looping through the breakpoint map and assigning font sizes

The next step is where Sass does all the work for you and you will see the benefits of how quickly it can be adjusted.

```scss:_font-size.scss showLineNumbers=7
// Loop through the breakpoint map, assign each breakpoint to the relevant variable
// eg: $breakpoint-name = 'b' and $breakpoint-width = 480px
@each $breakpoint-name, $breakpoint-width in $breakpoint-map {
  @media (min-width: $breakpoint-width) {
    .f1-#{$breakpoint-name} {
      font-size: $f1;
    }
    .f2-#{$breakpoint-name} {
      font-size: $f2;
    }
    .f3-#{$breakpoint-name} {
      font-size: $f3;
    }
    .f4-#{$breakpoint-name} {
      font-size: $f4;
    }
    .f5-#{$breakpoint-name} {
      font-size: $f5;
    }
    .f6-#{$breakpoint-name} {
      font-size: $f6;
    }
  }
}
```

What’s happening here is the `@each` loop is going through the `$breakpoint-map` and:

1. Assigning each key (eg: `'a'`) to `$breakpoint-name` to every font size class
2. Assigning each value (eg: `$a`) to `$breakpoint-width` to every media query

### Quick and easy to update

The benefits of this approach versus doing it through manual CSS are fairly clear. It’s a matter of adding a new breakpoint to the map or quickly adjust on a per project basis. All you have to wait for is Sass to compile.

Even if your project doesn’t allow for Sass and you need to generate something quickly you can always use Codepen.

## Alternative: font size ‘locks’

This approach gained some popularity a while ago now, but [CSS locks](https://fvsch.com/code/css-locks/) can build upon this style of writing CSS further.

The main benefit of font size locks is having proportional font sizes no matter the screen size.

### A smart *calc()*ulation

The linked article does a far better job of explaining the intricacies than I’m able to. Essentially you use `calc()` to have a minimum and maximum font size between two minimum and maximum screen widths.

```scss
// overview
calc( min-font-size + ( ( max-font-size - min-font-size ) * ( 100vw - min-screen-width ) / ( max-screen-width - min-screen-width) ) )

// actual usage
calc( 16px + ( ( 24 - 16 ) * ( 100vw - 480 ) / ( 1280 - 480) ) )
```

I wouldn’t worry about understanding this too much, as the next step is to make a Sass function for easy use.

### Put it all in a Sass function

To save remembering whether part of the calculation should or shouldn’t be a pixel value, you bundle it all together into a Sass function instead.

```scss showLineNumbers
@function font-size-lock(
  $min-font-size,
  $max-font-size,
  $min-screen-width,
  $max-screen-width
) {
  @return calc(
    #{$min-font-size} +
      (
        (#{strip-unit($max-font-size)} - #{strip-unit($min-font-size)}) * (
            100vw - #{$min-screen-width}
          ) /
          (#{strip-unit($max-screen-width)} - #{strip-unit($min-screen-width)})
      )
  );
}
```

There is also the use of a `strip-unit()` function because of the variables you set earlier. They can be used without breaking the calculations.

```scss showLineNumbers
@function strip-unit($number) {
  @if type-of($number) == 'number' and not unitless($number) {
    @return $number / ($number * 0 + 1);
  }

  @return $number;
}
```

### Usage

Drop those functions into your current setup and you’re good to go.

```scss showLineNumbers
.f1-l {
  font-size: font-size-lock($f3, $f1, 480px, 1200px);
}
```

### Set a restriction once you go beyond min/max screen size

Beyond the screen sizes specified, you’ll find the font size will still increase and decrease. So to counter that you need to add a couple of media queries.

```scss showLineNumbers
// $f1: 36px;
// $f3: 24px;

.f1-l {
  font-size: $f3;

  @media (min-width: 480px) {
    font-size: font-size-lock($f3, $f1, 480px, 1200px);
  }

  @media (min-width: 1200px) {
    font-size: $f1;
  }
}
```

Now you have your font size starting at 24px, below 480px wide viewports. Then, beyond that it will scale between 24px and 36px, until 1200px. Finally, above 1200px the font size will not go beyond 36px.

## That’s it

If you’re like me, the ability to keep track and be able to feel in control of your design implementation is the main reason this approach should grow on you.

Again, if you don’t use Sass or any preprocessor for that matter, you can still benefit, by using something like Codepen. Drop in the code and copy the output and you’re good to go.
