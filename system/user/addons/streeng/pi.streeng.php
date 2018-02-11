<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

include_once(PATH_THIRD . 'streeng/addon.setup.php');

$plugin_info = array (
	'pi_author' => STREENG_AUTHOR,
	'pi_author_url' => STREENG_AUTHOR_URL,
	'pi_description' => STREENG_DESC,
	'pi_name' => STREENG_NAME,
	'pi_version' => STREENG_VER,
	'pi_usage' => Streeng::usage()
);

class Streeng
{
	public $return_data = '';

	public function __construct() {
		$string = ee()->TMPL->tagdata;

		// Strip tags
		$allowed = ee()->TMPL->fetch_param('allowed');

		if ($allowed !== false) {
			$tags = explode('|', $allowed);
			$allow = '<' . implode('>,<', $tags) . '>';

			$string = ($allowed === 'none') ?
				strip_tags($string) :
				strip_tags($string, $allow);
		}

		// Find and replace
		$find = ee()->TMPL->fetch_param('find');

		if ($find !== false) {
			$replace = ee()->TMPL->fetch_param('replace');
			$insensitive = ee()->TMPL->fetch_param('insensitive');

			if ($replace !== false) {
				// Options
				$flags = ee()->TMPL->fetch_param('flags');

				// Search options
				$searchOptions = array(
					'NEWLINE' => "\n",
					'PIPE'    => '\|',
					'QUOTE'   => '"',
					'SPACE'   => ' '
				);

				// Replacement options
				$replacementOptions = array(
					'NEWLINE' => "\n",
					'PIPE'    => '|',
					'QUOTE'   => '"',
					'SPACE'   => ' '
				);

				$explode = ee()->TMPL->fetch_param('explode', '|');

				$find = explode($explode, $find);
				$replace = explode($explode, $replace);

				foreach ($find as $i => $search) {
					$search = isset($searchOptions[$search]) ?
						$searchOptions[$search] :
						$search;
					$search = $this->_prep_regex($search, $insensitive, $flags);

					$replacement = isset($replace[$i]) ?
						$replace[$i] :
						$replace[0];
					$replacement = isset($replacementOptions[$replacement]) ?
						$replacementOptions[$replacement] :
						$replacement;

					$string = preg_replace($search, $replacement, $string);
				}
			} else {
				$this->return_data = ((
					$insensitive ?
						stripos($string, $find) :
						strpos($string, $find)
					) !== false) ? 1 : 0;

				return;
			}
		}

		// Trim whitespace
		$trim = ee()->TMPL->fetch_param('trim', 'both');

		if ($trim !== 'no') {
			switch ($trim) {
				case 'both':
					$string = trim($string);
					break;
				case 'left':
					$string = ltrim($string);
					break;
				default:
					$string = rtrim($string);
			}
		}

		// URL encode
		$url = ee()->TMPL->fetch_param('url');

		if ($url === 'yes') {
			$string = urlencode($string);
		}

		// HTML encode
		$encode = ee()->TMPL->fetch_param('encode');

		if ($encode === 'yes') {
			$encode_flags = constant(
				ee()->TMPL->fetch_param('encode_flags', 'ENT_COMPAT')
			);

			$encode_encoding = ee()->TMPL->fetch_param(
				'encode_encoding',
				'UTF-8'
			);

			$string = htmlentities($string, $encode_flags, $encode_encoding);
		}

		// HTML decode
		$decode = ee()->TMPL->fetch_param('decode');

		if ($decode === 'yes') {
			$decode_flags = constant(
				ee()->TMPL->fetch_param('decode_flags', 'ENT_COMPAT')
			);

			$decode_encoding = ee()->TMPL->fetch_param('decode_flags', 'UTF-8');

			$string = html_entity_decode(
				$string,
				$decode_flags,
				$decode_encoding
			);
		}

		// HTML special characters
		$specialchars = ee()->TMPL->fetch_param('specialchars');

		if ($specialchars === 'yes') {
			$specialchars_flags = constant(
				ee()->TMPL->fetch_param('specialchars_flags', 'ENT_COMPAT')
			);

			$specialchars_encoding = ee()->TMPL->fetch_param(
				'decode_flags',
				'UTF-8'
			);

			$string = htmlspecialchars(
				$string,
				$specialchars_flags,
				$specialchars_encoding
			);
		}

		// Capitalize
		$capitalize = ee()->TMPL->fetch_param('capitalize');

		if ($capitalize === 'yes') {
			$string = ucfirst($string);
		}

		// Title case
		$title = ee()->TMPL->fetch_param('title');

		if ($title === 'yes') {
			$string = ucwords(strtolower($string));
		}

		// Lowercase
		$lower = ee()->TMPL->fetch_param('lower');

		if ($lower === 'yes') {
			$string = strtolower($string);
		}

		// Uppercase
		$upper = ee()->TMPL->fetch_param('upper');

		if ($upper === 'yes') {
			$string = strtoupper($string);
		}

		// Truncate
		$characters = (int) ee()->TMPL->fetch_param('characters');
		$words = (int) ee()->TMPL->fetch_param('words');
		$append = ee()->TMPL->fetch_param('append', '&hellip;');

		if ($words !== 0) {
			$temp_string = strip_tags($string);
			$temp_string = explode(' ', $temp_string);
			$temp_string = implode(' ', array_splice($temp_string, 0, $words + 1));

			if ($allowed === 'none') {
				$string = strlen($temp_string) < strlen($string) ?
					($temp_string . $append) :
					$temp_string;
			} else {
				$characters = strlen($temp_string);
				$string = $this->_truncate_markup($string, $characters, $append, true, true);
			}
		} elseif ($characters !== 0) {
			if ($allowed === 'none') {
				$temp_string = strip_tags($string);

				if (strlen($temp_string) > $characters) {
					$pos = strrpos(substr($temp_string, 0, $characters), ' ');
					$string = substr($temp_string, 0, $pos) . $append;
				}
			} else {
				$string = $this->_truncate_markup(
					$string, $characters, $append, true, true
				);
			}
		}

		// Slug
		$slug = ee()->TMPL->fetch_param('slug');

		if ($slug === 'yes') {
			$separator = ee()->TMPL->fetch_param('separator', '-');

			$string = preg_replace('/[^A-Za-z0-9-]+/', $separator, $string);
		}

		// Parse typography
		$typography = ee()->TMPL->fetch_param('typography');

		if ($typography !== false) {
			$typographyAllowed = array(
				'all',
				'xhtml',
				'br',
				'lite'
			);

			if (in_array($typography, $typographyAllowed)) {
				ee()->load->library('typography');

				ee()->typography->initialize();

				$typographyPrefs = array(
					'text_format' => $typography,
					'html_format' => 'all',
					'auto_links' => 'n',
					'allow_img_url' => 'y'
				);

				$string = ee()->typography->parse_type(
					$string,
					$typographyPrefs
				);
			}
		}

		// Repeat
		$repeat = (int) ee()->TMPL->fetch_param('repeat', 0);

		if ($repeat > 0) {
			$string .= str_repeat($string, $repeat);
		}

		// Substring count
		$count = ee()->TMPL->fetch_param('count');

		if ($count !== false) {
			if ($count === 'ALL') {
				$string = strlen($string);
			} else {
				$string = substr_count($string, $count);
			}
		}

		// Split count
		$splits = ee()->TMPL->fetch_param('splits');

		if ($splits !== false) {
			$string = count(explode($splits, $string));
		}

		// Automatically add an `id` to headings
		$string = $this->_auto_id_headings($string);

		$this->return_data = $string;
	}

	private function _prep_regex($string, $insensitive = true, $flags = false)
	{
		// Check containing characters
		if (substr($string, 0, 1) !== '/' || substr($string, 0, 2) === '\/') {
			$string = '/' . $string;
		}

		if (substr($string, -1, 1) !== '/' || substr($string, -2, 2) === '\/') {
			$string .= '/';
		}

		// Pattern modifiers
		if ($flags) {
			$string .= str_replace('i', '', $flags);
		}

		if (! $insensitive) {
			$string .= 'i';
		}

		return $string;
	}

	/**
	 * @package   php-shorten
	 * @example   example.html.php
	 * @link      https://github.com/Dreamseer/php-shorten/
	 * @author    Marc Görtz (http://marcgoertz.de/)
	 * @license   MIT License
	 * @copyright Copyright (c) 2011-2013, Marc Görtz
	 * @version   1.1.0
	 */

	private function _truncate_markup($markup, $length = 400, $appendix = '…', $appendixInside = false, $wordsafe = false) {
		$truncated = '';
		$lengthOutput = 0;
		$position = 0;
		$tags = array();

		// To avoid UTF-8 multibyte glitches we need entities, but no special characters for tags or existing entities
		$markup = str_replace(array(
			'&lt;', '&gt;', '&amp;',
		), array(
			'<', '>', '&',
		), htmlentities($markup, ENT_NOQUOTES, 'UTF-8'));

		// Loop through text
		while ($lengthOutput < $length && preg_match('{</?([a-z]+)[^>]*>|&#?[a-zA-Z0-9]+;}', $markup, $match, PREG_OFFSET_CAPTURE, $position)) {
			list($tag, $positionTag) = $match[0];

			// Add text leading up to the tag or entity
			$text = substr($markup, $position, $positionTag - $position);

			if ($lengthOutput + strlen($text) > $length) {
				$truncated .= substr($text, 0, $length - $lengthOutput);
				$lengthOutput = $length;

				break;
			}

			$truncated .= $text;
			$lengthOutput += strlen($text);

			// Add tags and entities
			if ($tag[0] === '&') {
				// Handle the entity
				$truncated .= $tag;
				// Which is only one character
				$lengthOutput++;
			} else {
				// Handle the tag
				$tagName = $match[1][0];

				if ($tag[1] === '/') {
					// This is a closing tag
					$openingTag = array_pop($tags);
					// Check that tags are properly nested
					assert($openingTag === $tagName);
					$truncated .= $tag;
				} elseif ($tag[strlen($tag) - 2] === '/') {
					// Self-closing tag in XML dialect
					$truncated .= $tag;
				} else {
					// Opening tag
					$truncated .= $tag;
					$tags[] = $tagName;
				}
			}

			// Continue after the tag
			$position = $positionTag + strlen($tag);
		}

		// Add any remaining text
		if ($lengthOutput < $length && $position < strlen($markup)) {
			$truncated .= substr($markup, $position, $length - $lengthOutput);
		}

		if (strlen($truncated) < strlen($markup)) {
			// If the words shouldn't be cut in the middle
			if ($wordsafe) {
				// Search the last occurrence of a space
				$spacepos = strrpos($truncated, ' ');

				if ($spacepos !== false) {
					// Cut the text in this position
					$truncated = substr($truncated, 0, $spacepos);
				}
			}

			// Add appendix to last tag content
			if ($appendixInside) {
				$truncated .= $appendix;
			}

			// Close any open tags
			while (! empty($tags)) {
				$truncated .= sprintf('</%s>', array_pop($tags));
			}

			return ($appendixInside) ? $truncated : $truncated . $appendix;
		}

		return $truncated;
	}

  /**
   * Start hyphenate titles addition
   * Taken from Wordpress for the most part 🤷‍♂️
   */

	/**
   * Set the mbstring internal encoding to a binary safe encoding when func_overload
   * is enabled.
   *
   * When mbstring.func_overload is in use for multi-byte encodings, the results from
   * strlen() and similar functions respect the utf8 characters, causing binary data
   * to return incorrect lengths.
   *
   * This function overrides the mbstring encoding to a binary-safe encoding, and
   * resets it to the users expected encoding afterwards through the
   * `reset_mbstring_encoding` function.
   *
   * It is safe to recursively call this function, however each
   * `mbstring_binary_safe_encoding()` call must be followed up with an equal number
   * of `reset_mbstring_encoding()` calls.
   *
   * @since 3.7.0
   *
   * @see reset_mbstring_encoding()
   *
   * @staticvar array $encodings
   * @staticvar bool  $overloaded
   *
   * @param bool $reset Optional. Whether to reset the encoding back to a previously-set encoding.
   *                    Default false.
   */
  private function mbstring_binary_safe_encoding( $reset = false ) {
  	static $encodings  = array();
  	static $overloaded = null;

  	if ( is_null( $overloaded ) ) {
  		$overloaded = function_exists( 'mb_internal_encoding' ) && ( ini_get( 'mbstring.func_overload' ) & 2 );
  	}

  	if ( false === $overloaded ) {
  		return;
  	}

  	if ( ! $reset ) {
  		$encoding = mb_internal_encoding();
  		array_push( $encodings, $encoding );
  		mb_internal_encoding( 'ISO-8859-1' );
  	}

  	if ( $reset && $encodings ) {
  		$encoding = array_pop( $encodings );
  		mb_internal_encoding( $encoding );
  	}
  }

  /**
   * Reset the mbstring internal encoding to a users previously set encoding.
   *
   * @see mbstring_binary_safe_encoding()
   *
   * @since 3.7.0
   */
  private function reset_mbstring_encoding() {
  	$this->mbstring_binary_safe_encoding( true );
  }

	/**
   * Checks to see if a string is utf8 encoded.
   *
   * NOTE: This function checks for 5-Byte sequences, UTF8
   *       has Bytes Sequences with a maximum length of 4.
   *
   * @author bmorel at ssi dot fr (modified)
   * @since 1.2.1
   *
   * @param string $str The string to be checked
   * @return bool True if $str fits a UTF-8 model, false otherwise.
   */
  private function seems_utf8( $str ) {
  	$this->mbstring_binary_safe_encoding();
  	$length = strlen( $str );
  	$this->reset_mbstring_encoding();
  	for ( $i = 0; $i < $length; $i++ ) {
  		$c = ord( $str[ $i ] );
  		if ( $c < 0x80 ) {
  			$n = 0; // 0bbbbbbb
  		} elseif ( ( $c & 0xE0 ) == 0xC0 ) {
  			$n = 1; // 110bbbbb
  		} elseif ( ( $c & 0xF0 ) == 0xE0 ) {
  			$n = 2; // 1110bbbb
  		} elseif ( ( $c & 0xF8 ) == 0xF0 ) {
  			$n = 3; // 11110bbb
  		} elseif ( ( $c & 0xFC ) == 0xF8 ) {
  			$n = 4; // 111110bb
  		} elseif ( ( $c & 0xFE ) == 0xFC ) {
  			$n = 5; // 1111110b
  		} else {
  			return false; // Does not match any model
  		}
  		for ( $j = 0; $j < $n; $j++ ) { // n bytes matching 10bbbbbb follow ?
  			if ( ( ++$i == $length ) || ( ( ord( $str[ $i ] ) & 0xC0 ) != 0x80 ) ) {
  				return false;
  			}
  		}
  	}
  	return true;
  }

  /**
   * Encode the Unicode values to be used in the URI.
   *
   * @since 1.5.0
   *
   * @param string $utf8_string
   * @param int    $length Max  length of the string
   * @return string String with Unicode encoded for URI.
   */
  private function utf8_uri_encode( $utf8_string, $length = 0 ) {
  	$unicode        = '';
  	$values         = array();
  	$num_octets     = 1;
  	$unicode_length = 0;

  	$this->mbstring_binary_safe_encoding();
  	$string_length = strlen( $utf8_string );
  	$this->reset_mbstring_encoding();

  	for ( $i = 0; $i < $string_length; $i++ ) {

  		$value = ord( $utf8_string[ $i ] );

  		if ( $value < 128 ) {
  			if ( $length && ( $unicode_length >= $length ) ) {
  				break;
  			}
  			$unicode .= chr( $value );
  			$unicode_length++;
  		} else {
  			if ( count( $values ) == 0 ) {
  				if ( $value < 224 ) {
  					$num_octets = 2;
  				} elseif ( $value < 240 ) {
  					$num_octets = 3;
  				} else {
  					$num_octets = 4;
  				}
  			}

  			$values[] = $value;

  			if ( $length && ( $unicode_length + ( $num_octets * 3 ) ) > $length ) {
  				break;
  			}
  			if ( count( $values ) == $num_octets ) {
  				for ( $j = 0; $j < $num_octets; $j++ ) {
  					$unicode .= '%' . dechex( $values[ $j ] );
  				}

  				$unicode_length += $num_octets * 3;

  				$values     = array();
  				$num_octets = 1;
  			}
  		}
  	}

  	return $unicode;
  }

  private function _sanitize_title( $title )
  {
    $title = strip_tags( $title );
  	// Preserve escaped octets.
  	$title = preg_replace( '|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $title );
  	// Remove percent signs that are not part of an octet.
  	$title = str_replace( '%', '', $title );
  	// Restore octets.
  	$title = preg_replace( '|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $title );

  	if ( $this->seems_utf8( $title ) ) {
  		if ( function_exists( 'mb_strtolower' ) ) {
  			$title = mb_strtolower( $title, 'UTF-8' );
  		}
  		$title = $this->utf8_uri_encode( $title, 200 );
  	}

  	$title = strtolower( $title );

		// Convert nbsp, ndash and mdash to hyphens
		$title = str_replace( array( '%c2%a0', '%e2%80%93', '%e2%80%94' ), '-', $title );
		// Convert nbsp, ndash and mdash HTML entities to hyphens
		$title = str_replace( array( '&nbsp;', '&#160;', '&ndash;', '&#8211;', '&mdash;', '&#8212;' ), '-', $title );
		// Convert forward slash to hyphen
		$title = str_replace( '/', '-', $title );

		// Strip these characters entirely
		$title = str_replace(
			array(
				// iexcl and iquest
				'%c2%a1',
				'%c2%bf',
				// angle quotes
				'%c2%ab',
				'%c2%bb',
				'%e2%80%b9',
				'%e2%80%ba',
				// curly quotes
				'%e2%80%98',
				'%e2%80%99',
				'%e2%80%9c',
				'%e2%80%9d',
				'%e2%80%9a',
				'%e2%80%9b',
				'%e2%80%9e',
				'%e2%80%9f',
				// copy, reg, deg, hellip and trade
				'%c2%a9',
				'%c2%ae',
				'%c2%b0',
				'%e2%80%a6',
				'%e2%84%a2',
				// acute accents
				'%c2%b4',
				'%cb%8a',
				'%cc%81',
				'%cd%81',
				// grave accent, macron, caron
				'%cc%80',
				'%cc%84',
				'%cc%8c',
			), '', $title
		);

		// Convert times to x
		$title = str_replace( '%c3%97', 'x', $title );

  	$title = preg_replace( '/&.+?;/', '', $title ); // kill entities
  	$title = str_replace( '.', '-', $title );

  	$title = preg_replace( '/[^%a-z0-9 _-]/', '', $title );
  	$title = preg_replace( '/\s+/', '-', $title );
  	$title = preg_replace( '|-+|', '-', $title );
  	$title = trim( $title, '-' );

  	return $title;
  }

  /**
   * Automatically add IDs to headings such as <h2></h2>
   */
  private function _auto_id_headings( $string )
  {
		/**
     * Automatically add IDs to headings such as <h2></h2>
     */
  	$string = preg_replace_callback( '/(\<h[1-6](.*?))\>(.*)(<\/h[1-6]>)/i', function( $matches )
  	{
  		if ( ! stripos( $matches[0], 'id=' ) )
  		{
  			$matches[0] = $matches[1] . $matches[2] . ' id="' . $this->_sanitize_title($matches[3]) . '">' . $matches[3] . $matches[4];
      }

  		return $matches[0];

  	}, $string );

    return $string;
  }

  /**
   * End hyphenate titles addition
   */

	public static function usage() {
		return 'See docs and examples at https://github.com/caddis/streeng';
	}
}
