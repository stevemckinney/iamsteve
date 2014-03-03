# Require any additional compass plugins here.
# require 'animate-sass'
# require 'compass-recipes'

# path: /Users/Steve/.rvm/gems/ruby-2.0.0-p0/gems/

require 'ceaser-easing'
require 'susy'

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "site/assets/css"
sass_dir = "src/assets/sass"
images_dir = "src/assets/images"
javascripts_dir = "src/assets/js"
fonts_dir = "src/assets/fonts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
environment = :development
output_style = (environment == :production) ? :expanded : :compact

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
