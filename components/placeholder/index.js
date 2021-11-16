import DesignBlue from '@/images/default/design-default-1.svg'
import DesignGreen from '@/images/default/design-default-1.svg'
import DesignRed from '@/images/default/design-default-1.svg'
import DesignYellow from '@/images/default/design-default-1.svg'
import CodeBlue from '@/images/default/code-default-1.svg'
import CodeGreen from '@/images/default/code-default-1.svg'
import CodeRed from '@/images/default/code-default-1.svg'
import CodeYellow from '@/images/default/code-default-1.svg'

const PlaceholderDesign = [
  DesignBlue,
  DesignRed,
  DesignGreen,
  DesignYellow
]

const PlaceholderCode = [
  CodeBlue,
  CodeRed,
  CodeGreen,
  CodeYellow
]

const rand = PlaceholderCode[Math.floor(Math.random() * PlaceholderCode.length)]

const Placeholder = ({ kind }) => {
  const PlaceholderDesignSvg = PlaceholderDesign[rand]
  const PlaceholderCodeSvg = PlaceholderCode[rand]

  return ( kind === 'Design' ? <PlaceholderDesignSvg /> : <PlaceholderCodeSvg /> )
}

export default Placeholder
