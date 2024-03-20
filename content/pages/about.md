---
title: About
description: I’m Steve McKinney, I write this blog about the design and build of websites. I aim to explore the craft behind web design.
slot: <nav className="grid grid-cols-2 w-full gap-x-8 self-end lg:-mb-3">
    <a href="#site" className="col-span-1 py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none flex gap-2 items-center text-current">Site</a>
    <a href="#author" className="col-span-1 py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none flex gap-2 items-center text-current">Author</a>
    <a href="#examples" className="border-t border-neutral-500/20 col-span-1 py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none flex gap-2 items-center text-current">Best posts</a>
    <a href="#history" className="border-t border-neutral-500/20 col-span-1 py-2 md:py-3 text-base md:text-lg lg:text-xl text-fern-1100 transition-all duration-200 ease-linear font-ui lowercase leading-none flex gap-2 items-center text-current">Design history</a>
  </nav>
---

<>
  <article id="site" className="col-content max-w-[592px] flex flex-col md:gap-4">
    ## About the site
    I registered the domain for this website in 2010 as a 20 year old and started as a portfolio and a bit of a blog as I was nearing the end of my time at university. I had treated it as such, a place to write website updates and the odd tutorial to support with work.

    <Blockquote style="afterthought">In hindsight I’d probably have a different domain name with the focus of the website today. Maybe I’ll do that someday.</Blockquote>

    It’s always felt like a thing on the web to share what you know. I did this when I was far younger with photoshop tutorials, trading links with the little banners, trying to emulate some of the bigger websites at the time. The web design community is a good one.

    I made a decision in 2015 to try to have a real aim of publishing regularly. It helped me to realise I learn well through writing about topics. It forces you to really absorb a topic. Which leads nicely into who this website is for.
  </article>

  <article className="col-content grid grid-cols-6 md:gap-8">
    <section className="col-span-full md:col-span-3 flex flex-col md:gap-4">
    ## What is this site for?
    I aim to focus on the craft of web design. This is a broad topic in itself, which feels challenging to achieve. But going back to my point about learning through writing, I hope to achieve this for you the reader.
    </section>
    <section className="md:row-start-2 col-span-full md:col-span-2 md:gap-8">
      ### When did this start?
      I made a decision to start writing this blog consistently in January 2015. Every week, for two years, a blog post went out. I started out writing about anything I was interested in, as long as it was related to websites.

      I realised over those two years, there was a lack of content focusing on the visual side of design. I still feel that is the case today, it’s tough to teach outside of the ‘[quick tips](/blog/visual-design-tips-you-can-apply-immediately)’ but it’s where I want to be.

      Eventually, I stopped posting frequently and haven’t quite found that rhythm again. I’ve accepted I’ll always be figuring things out, but with a vision in mind I can work towards that.
    </section>
    <section className="md:row-start-2 col-span-full md:col-span-2 md:gap-8">
      ### Who is this for?
      I’d like to think if you’ve an interest in designing for the web then hopefully you benefit. Specifically, I feel you’re a developer wanting to improve their visual design skills, or a designer with some coding experience.

      You’re someone who understands the value of not only good design, but the skill that goes into making something visually appealing too and want to improve like myself.
    </section>
    <section className="md:row-start-2 col-span-full md:col-span-2">
      ### Why do you do this?
      There’s a few reasons why I do this. I want to push against the message of “you can’t expect your designs to look the same as they do in design app”. I know it comes from a good place, but it’s always struck me as a way to avoid challenges.

      I also want to challenge myself to create consistently and get better at design and building those designs.

      Finally, I want to add an overall positive to the web that isn’t plagued by cookie banners, tracking and such.
    </section>
  </article>

  <article id="author" className="col-content max-w-[592px] flex flex-col md:gap-4">
    ## About me
    I’ve spent the majority of my 12 plus year career designing and—a good part—building for the web. I specialise in visual design and user experience—doing this across a variety of industries.

    As a designer, someone might ask if you have a personal style. I do feel I have a personal style, I enjoy serif typefaces, use of colour, using illustration over photography. However, I will always design for the audience, goals and systems that are already in place with the brand. It’s good to have constraints.

    Generally, I think it’s an enjoyment of creating things on the web. Be it icons, animation, illustration, CSS or JavaScript. It gives me a broad enough space to draw topics from to write about.

    <aside className="flex flex-col">
      ### Find me on
      <Social />
    </aside>
  </article>

  <article id="examples" className="col-content max-w-[592px]">
    ## Best posts
    These are a mixture of my most popular posts and what I believe are my best.

    <ul className="list-outside list-disc">
      <li key="01" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/creating-custom-stroke-width-profiles-in-illustrator">Creating custom stroke width profiles in Illustrator</a></li>
      <li key="02" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/horizontal-scrolling-responsive-menu">Creating a horizontal scrolling responsive menu</a></li>
      <li key="03" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/get-up-to-speed-with-css-shapes">Get up to speed with CSS shapes</a></li>
      <li key="04" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/how-to-use-kerning-tracking">How to use kerning &amp; tracking</a></li>
      <li key="05" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/a-guide-to-vertical-rhythm">A guide to vertical rhythm</a></li>
      <li key="06" className="text-lg text-ui-body"><a className="underline underline-offset-4 hover:text-dandelion-600 transition duration-200" href="/blog/search-overlay-with-smooth-reveal-animation">Search overlay with smooth reveal animation</a></li>
    </ul>
  </article>

  <article id="history" className="col-content grid grid-cols-subgrid">
    <div className="col-span-full md:col-span-6">
    ## Design history
    Here is the design history of this website. The first version of this website I started working on in 2009, so you can see how my design sensibility has evolved over the years.

    I’ve experimented with different logos and styles as the trends have evolved. Moving from a portfolio and blog to solely a blog.

    ### Documentation
    Version two onwards I have documented some of the design decisions. The later the version the more in depth it gets.

    <ul className="text-ui-body md:text-lg lg:text-xl">
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">Version one <span>2009</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version two](/blog/redesign) <span>2010</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version three](/blog/about-the-redesign-v3) <span>Early 2011</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version four](/blog/about-version-4) <span>Mid 2011</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version five](/blog/about-version-5) <span>Late 2012</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version six](/blog/about-version-6) <span>Late 2016</span></li>
      <li className="flex justify-between border-t border-neutral-01-500/20 py-2">[Version seven](/blog/about-version-7) <span>Rebuild 2021</span></li>
      <li className="flex self-start items-center content-center justify-between border-t border-b border-neutral-01-500/20 py-2">[Version eight](/blog/about-version-8) <span className="px-2 bg-cornflour-500/10 leading-none text-cornflour-500 rounded-sm pt-1.5 pb-1">Current</span></li>
    </ul>
    </div>

    <div className={`overflow-hidden image-stack col-span-full md:col-start-8 md:col-span-5 max-md:mt-12 max-w-max self-start shadow-placed rounded-lg grid [&>*]:[grid-area:images]`}>
      <Image
        src="/images/about/iamsteve-small-v1.jpg"
        width={488}
        height={416}
        alt="Version one of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed"
      />
      <Image
        src="/images/about/iamsteve-small-v2.jpg"
        width={488}
        height={416}
        alt="Version two of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[4rem]"
      />
      <Image
        src="/images/about/iamsteve-small-v3.jpg"
        width={488}
        height={416}
        alt="Version three of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[8rem]"
      />
      <Image
        src="/images/about/iamsteve-small-v4.jpg"
        width={488}
        height={416}
        alt="Version four of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[12rem]"
      />
      <Image
        src="/images/about/iamsteve-small-v5.jpg"
        width={488}
        height={416}
        alt="Version five of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[16rem]"
      />
      <Image
        src="/images/about/iamsteve-small-v6.jpg"
        width={488}
        height={416}
        alt="Version six of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[20rem]"
      />
      <Image
        src="/images/about/iamsteve-small-v7.jpg"
        width={488}
        height={416}
        alt="Version seven of this website’s design"
        className="rounded-lg max-w-full grid-row-1 shadow-placed mt-[24rem]"
      />
    </div>

  </article>

  <aside className="col-content max-w-[592px]">
    ## Colophon
    You may be interested in what the site is built with and the tools I use. You can find those on [the uses page](/uses).
  </aside>
</>
