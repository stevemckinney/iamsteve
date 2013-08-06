NSM .htaccess Generator - Changelog
===================================

v1.1.5
------

* [Fix] Now using Security library for hash function

v1.1.4
------

* [New] Extension settings page now checks that NSM Morphine Theme is installed and activated
* [New] Extension settings page will check that .htaccess files exist and can be written to and output results

v1.1.3
------

* [Fix] Empty .htaccess files are now writeable

v1.1.2
------

* [Fix] Installer setting issues

v1.1.1
------

* [New] Added error message if path setting was not an array
* [Enhancement] Check to see if pages exist before trying to replace them

v1.1.0
------

* [New] Added multi path support
* [Change] Morphine v2 implementation

v1.0.5
------

* [Bug] Check if Structure or Pages module is installed before pulling site pages from DB

v1.0.4
------

* [Feature] Improved Structure support

v1.0.3
------

* [Feature] Removed free version due to rising support
* [Bug] Check for empty pages array
* [Change] {ee:template} and {ee:pages} now automatically append a pipe "|" addressing many "Internal Server 500" errors

v1.0.2
------

* [Feature] PHP 5.0+ compatibility (EngineHosting)

v1.0.1
------

* [Bug] Whitespace in path no longer causes filer permission errors

v1.0.0
------

* Initial Release