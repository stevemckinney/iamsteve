{embed="/include/header" entry_title="{exp:channel:entries channel="blog" status="Latest|open|draft"}{title}{/exp:channel:entries}"}

{exp:channel:entries channel="blog" status="Latest|open|draft"}
<article role="article" class="dark group">

<header>
<h1>{title}</h1>
</header>
{post_meta}

<div class="article">
{blog_article}
</div>

</article>

<section role="region">

<div id="disqus_thread" class="dark centre"></div>

<article role="article" class="dark">

<h1>Tips</h1>

<ul>

<li>Be polite.</li>
<li>Wrap your multiple line code in <code>&lt;pre&gt;&lt;code&gt;</code> tags.</li>
<li>Like: <code>&lt;pre&gt;&lt;code&gt; your code &lt;/pre&gt;&lt;/code&gt;</code></li>

</ul>

</article>

</section>
<script type="text/javascript">
    
	var disqus_shortname = 'eeiamsteve'; 
	var disqus_identifier = {entry_id};
	
	(function() {
	    var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
	    dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();

	var disqus_iframe_css = "{site_url}/ee/assets/css/disqus.css";
	
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
{/exp:channel:entries}

{embed="/include/footer"}