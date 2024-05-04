/**
 * Sprite16
 * - Uses SVG export plugin in Figma to export layer names to class names
 * - Used in icon component to select correct size icon
 * - Each icon ID has a size suffix (eg: logo-32, type-16, or type-24)
 * - Tailwind for styling and some custom for stroke properties (eg: sl-r)
 */
const Sprite16 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden',
      display: 'none',
    }}
    {...props}
  >
    <defs>
      <symbol id="search" viewBox="0 0 16 16">
        <g class="search">
          <path d="m11 11 2 2" class="fill-none stroke-current stroke-4 sl-r" />
          <circle
            cx="7"
            cy="7"
            r="5"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="shadow" viewBox="0 0 16 16">
        <g class="shadow">
          <circle
            cx="8"
            cy="6"
            r="4"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M3.101 12A6.977 6.977 0 0 0 8 14a6.977 6.977 0 0 0 4.899-2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="settings" viewBox="0 0 16 16">
        <g class="settings">
          <circle
            cx="5"
            cy="4"
            r="2"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <circle
            cx="11"
            cy="12"
            r="2"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M5 6v9" class="fill-none stroke-current stroke-2" />
          <path d="M11 1v9" class="fill-none stroke-current stroke-2" />
        </g>
      </symbol>
      <symbol id="calendar" viewBox="0 0 16 16">
        <g class="calendar">
          <rect
            width="12"
            height="10"
            x="2"
            y="3"
            class="fill-current stroke-current stroke-2 sl-r"
            rx="1"
          />
          <path d="M3 5h10" class="fill-none stroke-current stroke-2 sl-r" />
          <rect width="10" height="6" x="3" y="6" class="fill-white" rx=".5" />
        </g>
      </symbol>
      <symbol id="timer" viewBox="0 0 16 16">
        <g class="timer">
          <path
            d="M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="m2 3.5 2-2" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="m14 3.5-2-2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M8 7v2h2" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="design" viewBox="0 0 16 16">
        <g class="design">
          <g class="fill-none stroke-current stroke-2 sl-s">
            <path d="M3 12c0-2.76 2.24-5 5-5s5 2.24 5 5" />
            <path d="M3 12c0-2.76 2.24-5 5-5s5 2.24 5 5" />
          </g>
          <path d="M2 7h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="M9 6H7v2h2V6Z"
            class="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M2 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            class="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M14 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            class="fill-current stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="download" viewBox="0 0 16 16">
        <g class="download">
          <path d="M2 15h12" class="fill-none stroke-current stroke-2 sl-r" />
          <g class="fill-none stroke-current stroke-2 sl-r">
            <path d="m5 8 3 3 3-3" />
            <path d="m5 8 3 3 3-3" />
          </g>
          <path d="M8 1v9" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="code" viewBox="0 0 16 16">
        <g class="code">
          <rect
            width="14"
            height="12"
            x="1"
            y="2"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <path
            d="m5 6 2 2-2 2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M9 10h2" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="checkmark / underline" viewBox="0 0 16 16">
        <g class="checkmark / underline">
          <path d="M2 15h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="m3 8 3 3 7-7"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="checkmark / checkmark" viewBox="0 0 16 16">
        <g class="checkmark / checkmark">
          <path
            d="m3 8 3 3 7-7"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="folder" viewBox="0 0 16 16">
        <g class="folder">
          <path
            d="M15 6H1V3c0-.55.45-1 1-1h5l.67 1H14c.55 0 1 .45 1 1v2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M1 6h14v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-left" viewBox="0 0 16 16">
        <g class="arrow-left">
          <path d="M1 8h14" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="M5 4 1 8l4 4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 16 16">
        <g class="arrow-right">
          <path d="M15 8H1" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="m11 12 4-4-4-4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-up" viewBox="0 0 16 16">
        <g class="arrow-up">
          <path d="M8 1v14" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="M12 5 8 1 4 5"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-down" viewBox="0 0 16 16">
        <g class="arrow-down">
          <path d="M8 15V1" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="m4 11 4 4 4-4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="airplane" viewBox="0 0 16 16">
        <g class="airplane">
          <path
            d="M15 8 5 14v-4l3-2-3-2V2l10 6Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M2 8H1" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M13 8H8" class="fill-none stroke-current stroke-2 sl-r" />
          <circle cx="2" cy="4" r="1" class="fill-current" />
          <circle cx="2" cy="12" r="1" class="fill-current" />
        </g>
      </symbol>
      <symbol id="envelope" viewBox="0 0 16 16">
        <g class="envelope">
          <g class="fill-white stroke-current stroke-2 sl-r">
            <path d="M2 5.29 1 6v9h14V6l-1-.72" />
            <path d="M2 5.29 1 6v9h14V6l-1-.72" />
          </g>
          <path d="M14 7V3H2v4H1l7 4 7-4h-1Z" class="fill-white" />
          <path
            d="m1 7 7 4 7-4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M10.8 3 8 1"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M8 1 5.2 3" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="M2 7V3h12v4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="person" viewBox="0 0 16 16">
        <g class="person">
          <path
            d="M9.84 9.7v-.03c.9-.72 1.49-1.94 1.49-3.33v-2c0-1.21 0-2-.67-2.67C10 1 9.33 1 8.67 1c-.6 0-.66.54-1.64.65-1.37.15-2.36 1.37-2.36 2.74v1.94c0 1.39.59 2.62 1.49 3.33v.03c-.09 1.21-.93 1.21-2.09 1.57-.62.19-1.14.4-1.56.59-.71.33-1.17 1.04-1.17 1.82V14c0 .55.45 1 1 1h11.33c.55 0 1-.45 1-1v-.32c0-.78-.45-1.49-1.17-1.82-.42-.19-.95-.4-1.56-.59-1.16-.36-2.01-.36-2.1-1.57Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="frame" viewBox="0 0 16 16">
        <g class="frame">
          <path d="M4 4h8v8H4z" class="fill-white" />
          <path d="M2 4h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M4 2v12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M12 2v12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M2 12h12" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="autolayout / v" viewBox="0 0 16 16">
        <g class="autolayout / v">
          <rect
            width="12"
            height="4"
            x="2"
            y="2"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <rect
            width="12"
            height="4"
            x="2"
            y="10"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="autolayout / h" viewBox="0 0 16 16">
        <g class="autolayout / h">
          <rect
            width="4"
            height="12"
            x="2"
            y="2"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <rect
            width="4"
            height="12"
            x="10"
            y="2"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="component / instance" viewBox="0 0 16 16">
        <g class="component / instance">
          <path
            d="M7.293 1.636a1 1 0 0 1 1.414 0l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414 0L1.636 8.707a1 1 0 0 1 0-1.414l5.657-5.657Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="play" viewBox="0 0 16 16">
        <g class="play">
          <path
            d="M3 2.741a1 1 0 0 1 1.504-.864l9.015 5.26a1 1 0 0 1 0 1.727l-9.015 5.259A1 1 0 0 1 3 13.259V2.741Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="align-left" viewBox="0 0 16 16">
        <g class="align-left">
          <path d="M2 2h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M2 6h8" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M2 10h6" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M2 14h10" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="align-centre" viewBox="0 0 16 16">
        <g class="align-centre">
          <path d="M2 2h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M2 14h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M4 6h8" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M4 10h8" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="align-right" viewBox="0 0 16 16">
        <g class="align-right">
          <path d="M2 2h12" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M6 6h8" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M8 10h6" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M4 14h10" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="type" viewBox="0 0 16 16">
        <g class="type">
          <path d="M4 3h8" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M8 3v9" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M3 4h2" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M13 4h-2" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M7 13h2" class="fill-none stroke-current stroke-2 sl-s" />
        </g>
      </symbol>
      <symbol id="pen" viewBox="0 0 16 16">
        <g class="pen">
          <path
            d="M11 15H5c0-3-3-6-3-6l6-8 6 8s-3 3-3 6Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M8 2v7" class="fill-none stroke-current stroke-2 sl-r" />
          <circle
            cx="8"
            cy="9"
            r="1"
            class="fill-current stroke-current stroke-1 sl-r"
          />
          <path d="M4 15h8" class="fill-none stroke-current stroke-2 sl-s" />
        </g>
      </symbol>
      <symbol id="home" viewBox="0 0 16 16">
        <g class="home">
          <path d="M15 7 8 1 1 7h1v8h4V9h4v6h4V7h1Z" class="fill-white" />
          <path
            d="m1 7 7-6 7 6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M10 9H6v5h4V9Z" class="fill-white" />
          <path
            d="M2 6.33V15h4V9h4v6h4V6.33"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M6 14h4" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="copy" viewBox="0 0 16 16">
        <g class="copy">
          <path
            d="M3 2h10v12H3z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M7 2h2v1H7z"
            class="fill-none stroke-current stroke-2 sl-s"
          />
        </g>
      </symbol>
      <symbol id="copy-success" viewBox="0 0 16 16">
        <g class="copy-success">
          <path d="M3 2h10v12H3z" class="fill-success" />
          <path
            d="M7 2h2v1H7z"
            class="fill-none stroke-current stroke-2 sl-s"
          />
          <path
            d="m6 9 1 1 3-3"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="external" viewBox="0 0 16 16">
        <g class="external">
          <path d="m7 9 7-7" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M9 2h5v5" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="M6 5H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="cursor" viewBox="0 0 16 16">
        <g class="cursor">
          <path
            d="m3.606 1.988 10.404 6.07-6.069.866-3.468 5.202-.867-12.138Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="rectangle" viewBox="0 0 16 16">
        <g class="rectangle">
          <rect width="10" height="10" x="3" y="3" class="Rectangle 6" rx="1" />
        </g>
      </symbol>
      <symbol id="component" viewBox="0 0 16 16">
        <g class="component">
          <path
            d="m5 5 3-3 3 3-3 3z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m2 8 3-3 3 3-3 3z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m5 11 3-3 3 3-3 3z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m8 8 3-3 3 3-3 3z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="move" viewBox="0 0 16 16">
        <g class="move">
          <path
            d="m6 12 2 2 2-2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M10 4 8 2 6 4"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M4 6 2 8l2 2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M10 8h3" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M3 8h3" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M8 3v3" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M8 10v3" class="fill-none stroke-current stroke-2 sl-r" />
          <path
            d="m12 10 2-2-2-2"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="comment" viewBox="0 0 16 16">
        <g class="comment">
          <path
            d="M11 2H5a3 3 0 0 0-3 3v8a1 1 0 0 0 1.6.8l1.333-1a4 4 0 0 1 2.4-.8H11a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="plus" viewBox="0 0 16 16">
        <g class="plus">
          <path d="M3 8h10" class="fill-none stroke-current stroke-2 sl-r" />
          <path d="M8 3v10" class="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="copy-alternate" viewBox="0 0 16 16">
        <g class="copy-alternate">
          <path
            d="M5 6H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <rect
            width="8"
            height="8"
            x="6"
            y="2"
            class="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="angle-right" viewBox="0 0 16 16">
        <g class="angle-right">
          <path
            d="m6 2 6 6-6 6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-left" viewBox="0 0 16 16">
        <g class="angle-left">
          <path
            d="M10 2 4 8l6 6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-down" viewBox="0 0 16 16">
        <g class="angle-down">
          <path
            d="m2 5 6 6 6-6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-up" viewBox="0 0 16 16">
        <g class="angle-up">
          <path
            d="m2 11 6-6 6 6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="type" viewBox="0 0 16 16">
        <g class="type">
          <path d="m8 3 1 1v6H5l3-7Z" class="fill-white" />
          <g class="mask-type-16">
            <mask
              id="a"
              width="8"
              height="14"
              x="1"
              y="1"
              class="a"
              maskUnits="userSpaceOnUse"
              style="mask-type:alpha"
            >
              <path d="M1 1h8v14H1z" class="mask" />
            </mask>
            <g mask="url(#a)">
              <path
                d="M4 11h5"
                class="fill-none stroke-current stroke-2 sl-r"
              />
              <path
                d="M2 16 7.76 2 14 16"
                class="fill-none stroke-current stroke-2 sl-r"
              />
            </g>
          </g>
          <path
            d="M11 2h1v12h-1"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M13 2h-1v12h1"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="palette" viewBox="0 0 16 16">
        <g class="palette">
          <path
            d="M2 8a6 6 0 0 1 6-6 6 6 0 0 1 6 6v1.547c0 .25-.203.453-.453.453h-2.214c-.736 0-1.333.597-1.333 1.333v2.214c0 .25-.203.453-.453.453H8a6 6 0 0 1-6-6Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <circle cx="8" cy="5" r="1" class="fill-current" />
          <circle cx="7" cy="10" r="1" class="fill-current" />
          <circle cx="5" cy="7" r="1" class="fill-current" />
        </g>
      </symbol>
      <symbol id="bolt" viewBox="0 0 16 16">
        <g class="bolt">
          <path
            d="M9 6 8 1l-5 9h4l1 5 5-9H9Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="vector-square" viewBox="0 0 16 16">
        <g class="vector-square">
          <path
            d="M4 13a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8c0 .552-.444 1-.996 1H4Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M4 2H2v2h2V2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M4 12H2v2h2v-2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M14 2h-2v2h2V2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M14 12h-2v2h2v-2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="puzzle" viewBox="0 0 16 16">
        <g class="puzzle">
          <path
            d="M2 2.5a.5.5 0 0 1 .5-.5h8.889a.5.5 0 0 1 .5.5v2.645c0 .382.424.642.793.544C13.604 5.444 15 5.489 15 8c0 2.512-1.396 2.556-2.318 2.311-.37-.098-.793.162-.793.544V13.5a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1-.5-.5v-2.732c0-.362.38-.618.734-.55.92.177 2.377.092 2.377-2.218S3.654 5.605 2.734 5.782C2.38 5.85 2 5.594 2 5.232V2.5Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="css" viewBox="0 0 16 16">
        <g class="css">
          <path d="M4 2h8v4l2 2-2 2v4H4v-4L2 8l2-2V2Z" class="fill-white" />
          <path
            d="M6 2h-.5A1.5 1.5 0 0 0 4 3.5v2.293a.5.5 0 0 1-.146.353l-1.5 1.5a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 0 1 .146.353V12.5A1.5 1.5 0 0 0 5.5 14H6"
            class="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M10 2h.5A1.5 1.5 0 0 1 12 3.5v2.293a.5.5 0 0 0 .146.353l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 0-.146.353V12.5a1.5 1.5 0 0 1-1.5 1.5H10"
            class="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="close" viewBox="0 0 16 16">
        <g class="close">
          <path d="M12 12 4 4" class="stroke-current stroke-2 sl-r" />
          <path d="m12 4-8 8" class="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="navigation" viewBox="0 0 16 16">
        <g class="navigation">
          <path d="M13 4H3" class="stroke-current stroke-2 sl-r" />
          <path d="M13 12H3" class="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="box" viewBox="0 0 16 16">
        <g class="box">
          <path
            d="M4 13a1 1 0 0 1-1-1V7h10v5a1 1 0 0 1-1 1H4Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M2 7V3h12v4H2Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="collections" viewBox="0 0 16 16">
        <g class="collections">
          <circle
            cx="5.5"
            cy="10.5"
            r="2.5"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <circle
            cx="10.5"
            cy="5.5"
            r="2.5"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M8 3H3v5h5V3Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M13 8H8v5h5V8Z"
            class="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="note" viewBox="0 0 16 16">
        <g class="note">
          <g class="fill-white stroke-current stroke-2 sl-r">
            <path d="M3.5 14a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H12a1 1 0 0 1 1 1v6l-5 5H3.5Z" />
            <path d="M8 14v-4a1 1 0 0 1 1-1h4m-5 5H3.5a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H12a1 1 0 0 1 1 1v6m-5 5 5-5" />
          </g>
          <path d="M10 6H6" class="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
    </defs>
  </svg>
)

export default Sprite16
