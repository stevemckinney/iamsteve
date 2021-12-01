// placholder
// assign a matching background colour and image randomly
import Image from 'next/image'

// placeholders
const PlaceholderDesignMap = new Map();
PlaceholderDesignMap.set('#e9f5f5', '/static/images/default/design-default-1.svg');
PlaceholderDesignMap.set('#fff8e2', '/static/images/default/design-default-2.svg');
PlaceholderDesignMap.set('#ffe5e2', '/static/images/default/design-default-3.svg');
PlaceholderDesignMap.set('#d5f5ee', '/static/images/default/design-default-4.svg');

const PlaceholderCodeMap = new Map();
PlaceholderCodeMap.set('#e9f5f5', '/static/images/default/code-default-1.svg');
PlaceholderCodeMap.set('#fff8e2', '/static/images/default/code-default-2.svg');
PlaceholderCodeMap.set('#ffe5e2', '/static/images/default/code-default-3.svg');
PlaceholderCodeMap.set('#d5f5ee', '/static/images/default/code-default-4.svg');

function getRandomKey(collection) {
  let keys = Array.from(collection.keys());
  return keys[Math.floor(Math.random() * keys.length)];
}

function Placeholder(kind) {
  // assign the random value to a variable to use later
  // depending on the kind passed to this function
  let random = kind === 'Design' ? getRandomKey(PlaceholderDesignMap) : getRandomKey(PlaceholderCodeMap)

  return (
    <div className="radius flex" style={{ backgroundColor: random }}>
      {kind === 'Design' ? <Image src={PlaceholderDesignMap.get(random)} className="radius" width={378} height={252} /> : <Image src={PlaceholderCodeMap.get(random)} className="radius" width={378} height={252} />}
    </div>
  )
}

export default Placeholder
