import Badge from '@/components/badge'
import Icon from '@/components/icon'

export default function TestIconPage() {
  return (
    <div className="min-h-screen bg-surface p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Type icon test</h1>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Badge with sprite icon</h2>
          <Badge theme="neutral-02" iconStart="type" size={24}>
            Typography
          </Badge>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Icon component (from sprite)
          </h2>
          <Icon icon="type" size={24} />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Raw SVG (original Figma)</h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L15 9.5V16H6L12 3Z"
              fill="white"
              style={{ fill: 'white', fillOpacity: 1 }}
            />
            <mask
              id="mask0_test"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="2"
              y="1"
              width="13"
              height="21"
            >
              <path
                d="M2 1H15V22H2V1Z"
                fill="white"
                style={{ fill: 'white', fillOpacity: 1 }}
              />
            </mask>
            <g mask="url(#mask0_test)">
              <path
                d="M3 24L12 4L21 24"
                stroke="#092E24"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 16L18 16"
                stroke="#092E24"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M16 3H18V21H16"
              stroke="#092E24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 3H18V21H20"
              stroke="#092E24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Raw SVG with currentColor</h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-fern-1100"
          >
            <path d="M12 3L15 9.5V16H6L12 3Z" fill="currentColor" />
            <mask
              id="mask0_test2"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="2"
              y="1"
              width="13"
              height="21"
            >
              <path d="M2 1H15V22H2V1Z" fill="white" />
            </mask>
            <g mask="url(#mask0_test2)">
              <path
                d="M3 24L12 4L21 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M6 16L18 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            <path
              d="M16 3H18V21H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 3H18V21H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
