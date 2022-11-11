// placeholder
// assign a matching background colour and image randomly
import { useState, useEffect } from 'react';
import Image from 'next/image'

// placeholders
const PlaceholderDesign = {
  '#e9f5f5': '/static/images/default/design-default-1.svg',
  '#fff8e2': '/static/images/default/design-default-2.svg',
  '#ffe5e2': '/static/images/default/design-default-3.svg',
  '#d5f5ee': '/static/images/default/design-default-4.svg',
}

const PlaceholderCode = {
  '#e9f5f5': '/static/images/default/code-default-1.svg',
  '#fff8e2': '/static/images/default/code-default-2.svg',
  '#ffe5e2': '/static/images/default/code-default-3.svg',
  '#d5f5ee': '/static/images/default/code-default-4.svg',
}

const randomProperty = function (obj) {
  var keys = Object.keys(obj)
  return obj[keys[(keys.length * Math.random()) << 0]]
}

const randomValues = function (obj) {
  var vals = Object.values(obj)
  return obj[vals[(vals.length * Math.random()) << 0]]
}

const randomEntries = function (obj) {
  var entries = Object.entries(obj)
  return entries[(entries.length * Math.random()) << 0]
}

function Placeholder({ category, kind }) {
  // assign the random value to a variable to use later
  // depending on the kind passed to this function
  const [random, setRandom] = useState(category === 'Design' ? randomEntries(PlaceholderDesign) : randomEntries(PlaceholderCode));

  const containerClass =
    kind.toString() === 'hero'
      ? 'pt4 pb4 pt6-b pb6-b pt7-d pb8-d flex center featured-image entry-image is-placeholder'
      : 'radius flex'

  return (
    <>
      <div className={containerClass} style={{ backgroundColor: random[0] }}>
        {category === 'Design' ? (
          <Image
            src={random[1]}
            className="radius"
            width={378}
            height={252}
            alt=""
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            placeholder="blur"
            priority
          />
        ) : (
          <Image
            src={random[1]}
            className="radius"
            width={378}
            height={252}
            alt=""
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            placeholder="blur"
            priority
          />
        )}
      </div>
    </>
  )
}

export default Placeholder
