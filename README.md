# iamsteve - website files
A design and code blog running on ExpressionEngine.

- Gulp is used to manage JavaScript and images
- Compass compiles Sass (compile times remain quicker this way)
- Dandelion can deploy

## Dandelion for deployments
`dandelion --config=dandelion.dev.yml deploy`

## Getting started
The website runs on ExpressionEngine, using a MySQL database.

### Install gulp
`npm install --global gulp-cli`

### Run `npm install`
Now all the things install

### Setup config
- Make a database
- Make a config file in `/config` named `config.local.php`
- Update `config.env.php`
