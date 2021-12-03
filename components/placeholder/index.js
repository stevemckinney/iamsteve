// placholder
// assign a matching background colour and image randomly
import Image from 'next/image'

// placeholders
const PlaceholderDesignMap = new Map()
PlaceholderDesignMap.set('#e9f5f5', '/static/images/default/design-default-1.svg')
PlaceholderDesignMap.set('#fff8e2', '/static/images/default/design-default-2.svg')
PlaceholderDesignMap.set('#ffe5e2', '/static/images/default/design-default-3.svg')
PlaceholderDesignMap.set('#d5f5ee', '/static/images/default/design-default-4.svg')

const PlaceholderCodeMap = new Map()
PlaceholderCodeMap.set('#e9f5f5', '/static/images/default/code-default-1.svg')
PlaceholderCodeMap.set('#fff8e2', '/static/images/default/code-default-2.svg')
PlaceholderCodeMap.set('#ffe5e2', '/static/images/default/code-default-3.svg')
PlaceholderCodeMap.set('#d5f5ee', '/static/images/default/code-default-4.svg')

function getRandomKey(collection) {
  let keys = Array.from(collection.keys())
  return keys[Math.floor(Math.random() * keys.length)]
}

function Placeholder({ category, kind }) {
  // assign the random value to a variable to use later
  // depending on the kind passed to this function
  const random =
    category === 'Design' ? getRandomKey(PlaceholderDesignMap) : getRandomKey(PlaceholderCodeMap)

  const containerClass =
    kind.toString() === 'hero'
      ? 'pt4 pb4 pt6-b pb6-b pt7-d pb8-d flex center featured-image entry-image'
      : 'radius flex'

  return (
    <div className={containerClass} style={{ backgroundColor: random }}>
      {category === 'Design' ? (
        <Image
          src={PlaceholderDesignMap.get(random)}
          className="radius"
          width={378}
          height={252}
          alt=""
        />
      ) : (
        <Image
          src={PlaceholderCodeMap.get(random)}
          className="radius"
          width={378}
          height={252}
          alt=""
        />
      )}
    </div>
  )
}

export default Placeholder
