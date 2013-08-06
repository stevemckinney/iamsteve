<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
========================================================
Plugin TruncHTML
--------------------------------------------------------
Copyright: Oliver Heine
License: Freeware
http://utilitees.de/ee.php/trunchtml
--------------------------------------------------------
This addon may be used free of charge. Should you
employ it in a commercial project of a customer or your
own I'd appreciate a small donation.
========================================================
File: pi.trunchtml.php
--------------------------------------------------------
Purpose: Truncates HTML to the specified length without
leaving open tags.
========================================================
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
========================================================
*/


$plugin_info = array(  'pi_name' => 'TruncHTML',
    'pi_version' => '2.0',
    'pi_author' => 'Oliver Heine',
    'pi_author_url' => 'http://utilitees.de/ee.php/trunchtml',
    'pi_description' => 'Truncates HTML/Text to the specified number of characters. Does not count characters in HTML-tags, does not cut-off in the middle of tags, closes all open tags.',
    'pi_usage' => trunchtml::usage());

class Trunchtml
{
    var $return_data;

    function Trunchtml()
    {
        $this->EE =& get_instance();

        $text = $this->EE->TMPL->tagdata;

        $threshold = $this->EE->TMPL->fetch_param('threshold', '0');
        $chars = $this->EE->TMPL->fetch_param('chars','500');
        $ending = $this->EE->TMPL->fetch_param('ending','');
        $exact = $this->EE->TMPL->fetch_param('exact','no');
        $inline = $this->EE->TMPL->fetch_param('inline','');

        $raw = strlen(preg_replace('/<.*?>/', '', $text));

        if ( $raw <= $chars)
        {
            $this->return_data = $text;
            return;
        }

        if ( $threshold > 0 && $raw < $threshold )
        {
            $this->return_data = $text;
            return;
        }

        preg_match_all('/(<.+?>)?([^<>]*)/s', $text, $lines, PREG_SET_ORDER);
        $total_length = 0;
        $open_tags = array();
        $truncate = '';
        foreach ($lines as $line_matchings)
        {
            if (!empty($line_matchings[1]))
            {
                if (preg_match('/^<(\s*.+?\/\s*|\s*(img|br|input|hr|area|base|basefont|col|frame|isindex|link|meta|param)(\s.+?)?)>$/is', $line_matchings[1]))
                {
                }
                elseif (preg_match('/^<\s*\/([^\s]+?)\s*>$/s', $line_matchings[1], $tag_matchings))
                {
                    $pos = array_search($tag_matchings[1], $open_tags);
                    if ($pos !== false)
                    {
                        unset($open_tags[$pos]);
                    }
                }
                elseif (preg_match('/^<\s*([^\s>!]+).*?>$/s', $line_matchings[1], $tag_matchings))
                {
                    array_unshift($open_tags, strtolower($tag_matchings[1]));
                }
                $truncate .= $line_matchings[1];
            }
            $content_length = strlen(preg_replace('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', ' ', $line_matchings[2]));
            if ($total_length + $content_length > $chars)
            {
                $left = $chars - $total_length;
                $entities_length = 0;
                if (preg_match_all('/&[0-9a-z]{2,8};|&#[0-9]{1,7};|&#x[0-9a-f]{1,6};/i', $line_matchings[2], $entities, PREG_OFFSET_CAPTURE|PREG_PATTERN_ORDER))
                {
                    foreach ($entities[0] as $entity)
                    {
                        if ($entity[1] + 1 - $entities_length <= $left)
                        {
                            $left--;
                            $entities_length += strlen($entity[0]);
                        }
                        else
                        {
                            break;
                        }
                    }
                }
                $truncate .= substr($line_matchings[2], 0, $left + $entities_length);

                break;
            }
            else
            {
                $truncate .= $line_matchings[2];
                $total_length += $content_length;
            }
            if ($total_length >= $chars)
            {
                break;
            }
        }


        if ($exact != "yes")
        {
            $last_gt = strrpos($truncate, '>');
            $spacepos = strrpos($truncate, ' ');
            if ( ($last_gt !== FALSE && $spacepos !== FALSE) && $last_gt > $spacepos )
            {
                $spacepos = strrpos($truncate, '<');
                if ($spacepos !== FALSE)
                {
                    $truncate = substr($truncate, 0, $spacepos);
                    array_shift($open_tags);
                }
            }
            elseif ( $spacepos !== FALSE )
            {
                $truncate = substr($truncate, 0, $spacepos);
            }
        }

        $truncate = rtrim($truncate);

        if (!empty($inline))
        {
            if (substr($inline,0,1)=="_")
            {
                $inline = " ".ltrim($inline,"_");
            }
            $truncate .= $inline;
        }

        foreach ($open_tags as $tag)
        {
            $truncate .= '</' . $tag . '>';
        }

        if ( !empty($ending) )
        {
            $truncate .= $ending;
        }

        $this->return_data = $truncate;
    }


    // ----------------------------------------
    //  Plugin Usage
    // ----------------------------------------
    // This function describes how the plugin is used.
    //  Make sure and use output buffering
    function usage()
    {
        ob_start();
        ?>
Example:
----------------
{exp:trunchtml chars="300" inline="..." ending="<a href='{path=site/comments}'>read on</a>"}
{body}
{/exp:trunchtml}

Parameters:
----------------
chars=""
Defaults to 500. Number of characters that are to be returned.

ending=""
Optional. String to be added after the output.

inline=""
Optional. This string is placed directly _after_ the truncated
text and _before_ any closing tags.
If you want the first character to be a space, use an underscore
e.g. inline="_continue"

exact="yes"
If this is set, text will be truncated after exactly the specified
number of chars. Otherwise text will be cut after a space to prevent
cutting words in the middle.

threshold="X"
If this is set the text will only be truncated if it at least X characters long.
Otherwise the full text is returned.

----------------
CHANGELOG:

2.0
* 1st version for EE 2.0



        <?php
        $buffer = ob_get_contents();
        ob_end_clean();
        return $buffer;
    }
      /* END */

}
/* END Class */
/* End of file pi.trunchtml.php */
/* Location: ./system/expressionengine/third_party/trunchtml/pi.trunchtml.php */