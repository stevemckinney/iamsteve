/**
 * Sprite
 * - Uses SVG export plugin in Figma to export layer names to class names
 * - Used in icon component to select correct size icon
 * - Each icon ID has a size suffix (eg: logo-32, type-16, or type-24)
 * - Tailwind for styling and some custom for stroke properties (eg: sl-r)
 */
const Sprite = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden',
    }}
    {...props}
  >
    <defs>
      <symbol id="logo-32" viewBox="0 0 32 32" fill="none">
        <title>iamsteve</title>
        <path
          d="M17.5 30.5C16.65 26.02 17.91 20.71 19.5 18.5C22.47 18.4 25.62 17.68 28.06 15.5C30.04 13.49 30.43 10.58 30.5 8.5L24.5 7.5L22.5 3.5L21.5 4.5L19.5 1.5L17.83 2.41C17.83 2.41 15 0.56 11.5 2.5C8.41 4.37 7 7 7.5 11.5C8 16 5.079 18.921 1.5 22.5C1.5 22.5 7 23 10 24.5C13 26 17.5 30.5 17.5 30.5Z"
          className="fill-white"
        />
        <path
          d="M17.5 30.5C16.65 26.02 17.91 20.71 19.5 18.5C22.47 18.4 25.62 17.68 28.06 15.5C30.04 13.49 30.43 10.58 30.5 8.5L24.5 7.5L22.5 3.5L21.5 4.5L19.5 1.5L17.83 2.41C17.83 2.41 15 0.56 11.5 2.5C8.40996 4.37 6.72996 7.69 7.49996 11.5C7.99996 13.95 9.75996 16.5 12.5 16.5C16.5 16.5 18.25 12.36 18.5 7.5"
          className="stroke-current stroke-2 sl-r"
        />
        <path
          d="M1.5 22.5C4.41 20.2 7.87 16.23 7.5 11.5"
          className="stroke-current stroke-2 sl-r"
        />
      </symbol>
      <symbol id="logo-24" viewBox="0 0 24 24" fill="none">
        <title>iamsteve</title>
        <path
          d="M13.1379 23C12.4931 19.6014 13.449 15.5731 14.6552 13.8966C16.9083 13.8207 19.2979 13.2745 21.149 11.6207C22.651 10.0959 22.9469 7.88828 23 6.31034L18.4483 5.55172L16.931 2.51724L16.1724 3.27586L14.6552 1L13.3883 1.69034C13.3883 1.69034 11.2414 0.286897 8.58621 1.75862C6.24207 3.17724 5.17241 5.17241 5.55173 8.58621C5.93104 12 3.7151 14.2159 1 16.931C1 16.931 5.17242 17.3103 7.44828 18.4483C9.72414 19.5862 13.1379 23 13.1379 23Z"
          className="fill-white"
        />
        <path
          d="M13.3701 23C12.7201 19.6 13.7501 15.8 14.9601 14.13C17.2101 14.05 19.2901 13.29 21.1501 11.64C22.6501 10.12 22.9501 8.37 23.0001 6.8L18.1901 5.82L16.8201 2.38L16.1301 3.07L14.7501 1.01L13.3901 1.7C13.3901 1.7 10.7301 0.610002 8.07014 2.08C5.73014 3.5 4.54014 6.34 5.13014 9.23C5.51014 11.09 7.19014 12.7 9.27014 12.7C11.8501 12.7 13.3801 9.25 13.3801 5.14"
          className="stroke-current stroke-2 sl-r"
        />
        <path
          d="M1 16.81C3.21 15.06 5.32 12.27 5.04 8.68"
          className="stroke-current stroke-2 sl-r"
        />
      </symbol>
      {/* <symbol id="logo-24" viewBox="0 0 24 24" fill="none">
        <g className="logo24" className="md:hidden">
          <path
            d="M13.1379 23C12.4931 19.6014 13.449 15.5731 14.6552 13.8966C16.9083 13.8207 19.2979 13.2745 21.149 11.6207C22.651 10.0959 22.9469 7.88828 23 6.31034L18.4483 5.55172L16.931 2.51724L16.1724 3.27586L14.6552 1L13.3883 1.69034C13.3883 1.69034 11.2414 0.286897 8.58621 1.75862C6.24207 3.17724 5.17241 5.17241 5.55173 8.58621C5.93104 12 3.7151 14.2159 1 16.931C1 16.931 5.17242 17.3103 7.44828 18.4483C9.72414 19.5862 13.1379 23 13.1379 23Z"
            className="fill-white"
          />
          <path
            d="M13.3701 23C12.7201 19.6 13.7501 15.8 14.9601 14.13C17.2101 14.05 19.2901 13.29 21.1501 11.64C22.6501 10.12 22.9501 8.37 23.0001 6.8L18.1901 5.82L16.8201 2.38L16.1301 3.07L14.7501 1.01L13.3901 1.7C13.3901 1.7 10.7301 0.610002 8.07014 2.08C5.73014 3.5 4.54014 6.34 5.13014 9.23C5.51014 11.09 7.19014 12.7 9.27014 12.7C11.8501 12.7 13.3801 9.25 13.3801 5.14"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M1 16.81C3.21 15.06 5.32 12.27 5.04 8.68"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
        <g className="logo32" className="max-md:hidden">
          <path
            d="M17.5 30.5C16.65 26.02 17.91 20.71 19.5 18.5C22.47 18.4 25.62 17.68 28.06 15.5C30.04 13.49 30.43 10.58 30.5 8.5L24.5 7.5L22.5 3.5L21.5 4.5L19.5 1.5L17.83 2.41C17.83 2.41 15 0.56 11.5 2.5C8.41 4.37 7 7 7.5 11.5C8 16 5.079 18.921 1.5 22.5C1.5 22.5 7 23 10 24.5C13 26 17.5 30.5 17.5 30.5Z"
            className="fill-white"
          />
          <path
            d="M17.5 30.5C16.65 26.02 17.91 20.71 19.5 18.5C22.47 18.4 25.62 17.68 28.06 15.5C30.04 13.49 30.43 10.58 30.5 8.5L24.5 7.5L22.5 3.5L21.5 4.5L19.5 1.5L17.83 2.41C17.83 2.41 15 0.56 11.5 2.5C8.40996 4.37 6.72996 7.69 7.49996 11.5C7.99996 13.95 9.75996 16.5 12.5 16.5C16.5 16.5 18.25 12.36 18.5 7.5"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M1.5 22.5C4.41 20.2 7.87 16.23 7.5 11.5"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol> */}
      <symbol id="play-24" viewBox="0 0 24 24">
        <g className="play">
          <path
            d="M5 3.7a1 1 0 0 1 1.486-.875l14.94 8.3a1 1 0 0 1 0 1.75l-14.94 8.3A1 1 0 0 1 5 20.3V3.7Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="type-24" viewBox="0 0 24 24">
        <g className="type">
          <path d="m12 3 3 6.5V16H6l6-13Z" className="fill-white" />
          <g className="type-24">
            <mask
              id="t24a"
              width="13"
              height="21"
              x="2"
              y="1"
              className="a"
              maskUnits="userSpaceOnUse"
              style={{ maskType: 'alpha' }}
            >
              <path d="M2 1h13v21H2z" className="type-24" />
            </mask>
            <g mask="url(#t24a)">
              <path
                d="m3 24 9-20 9 20"
                className="fill-none stroke-current stroke-2"
              />
              <path
                d="M6 16h12"
                className="fill-none stroke-current stroke-2"
              />
            </g>
          </g>
          <path
            d="M16 3h2v18h-2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M20 3h-2v18h2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="bolt-24" viewBox="0 0 24 24">
        <g className="bolt">
          <path
            d="m13 10-1-8-6 12h5l1 8 6-12h-5Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="css-24" viewBox="0 0 24 24">
        <g className="css">
          <path
            d="M6 2h12v6.667L21 12l-3 3.333V22H6v-6.667L3 12l3-3.333V2Z"
            className="fill-white"
          />
          <path
            d="M9 2H7.417a1.5 1.5 0 0 0-1.5 1.5v4.979a.5.5 0 0 1-.124.33L3.288 11.67a.5.5 0 0 0 0 .658l2.505 2.863a.5.5 0 0 1 .124.33V20.5a1.5 1.5 0 0 0 1.5 1.5H9m6-20h1.583a1.5 1.5 0 0 1 1.5 1.5v4.979a.5.5 0 0 0 .124.33l2.505 2.862a.5.5 0 0 1 0 .658l-2.505 2.863a.5.5 0 0 0-.124.33V20.5a1.5 1.5 0 0 1-1.5 1.5H15"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="search-24" viewBox="0 0 24 24">
        <g className="search">
          <path d="m19 19 1 1" className="stroke-current stroke-4 sl-r" />
          <path d="m17 17 1 1" className="stroke-current stroke-4 sl-s" />
          <path
            d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="design-24" viewBox="0 0 24 24">
        <g className="design">
          <path
            d="M4 16c0-4.416 3.584-8 8-8s8 3.584 8 8"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M4 8h16" className="stroke-current stroke-2 sl-r" />
          <path
            d="M10 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
            className="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M6 6H2v4h4V6Zm16 0h-4v4h4V6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="code-24" viewBox="0 0 24 24">
        <g className="code">
          <path
            d="M3.993 20A.994.994 0 0 1 3 19V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v14c0 .552-.442 1-.995 1H3.993Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m7 12 2 2-2 2m5 0h3"
            className="stroke-current stroke-2 fill-none sl-r"
          />
        </g>
      </symbol>
      <symbol id="pen-24" viewBox="0 0 24 24">
        <g className="pen">
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7ZM12 2v12"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <circle
            cx={12}
            cy={14}
            r={1}
            className="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M7 22h10"
            className="fill-none stroke-current stroke-2 sl-s"
          />
        </g>
      </symbol>
      <symbol id="clipboard-24" viewBox="0 0 24 24">
        <g className="clipboard">
          <rect
            width={16}
            height={18}
            x={4}
            y={4}
            className="fill-white stroke-current stroke-2 sl-r"
            rx={1}
          />
          <path
            d="M8 4h8v3H8z"
            className="fill-current stroke-current stroke-2 sl-r"
          />
          <circle
            cx={12}
            cy={3}
            r={2}
            className="stroke-current stroke-2 sl-r fill-white"
          />
        </g>
      </symbol>
      <symbol id="clipboard-success-24" viewBox="0 0 24 24">
        <g className="clipboard-success">
          <g className="clipboard">
            <rect
              width={16}
              height={18}
              x={4}
              y={4}
              className="fill-current stroke-current stroke-2 sl-r"
              rx={1}
            />
            <path
              d="M8 4h8v3H8z"
              className="fill-current stroke-current sw-2 sl-r"
            />
            <path d="m7 14 3 3 7-7" className="fill-fern-300" />
            <circle
              cx={12}
              cy={3}
              r={2}
              className="stroke-current stroke-2 sl-r fill-white"
            />
          </g>
        </g>
      </symbol>
      <symbol id="envelope-24" viewBox="0 0 24 24">
        <g className="envelope">
          <path
            d="m12 2-9 8v11h18V10l-9-8Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M5 4h14v6h2l-9 6-9-6h2V4Z" className="fill-white" />
          <path
            d="m3 10 9 6 9-6"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M19 11V4H5v7"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="person-24" viewBox="0 0 24 24">
        <g className="person">
          <path
            d="M14.478 14.186V13.8c1.215-.926 2.012-1.813 2.012-3.6V7.5c0-1.556 0-2.777-.905-3.639C14.84 3.151 13.79 3 12.898 3c-.81 0-.898.836-2.215.836-1.833 0-3.186 1.864-3.186 3.625V10.2c0 1.787.796 2.687 2.012 3.6v.373c-.122 1.556-1.256 1.556-2.823 2.018a18.32 18.32 0 0 0-2.106.759C3.62 17.374 3 18.287 3 19.29V21h18v-1.697c0-1.003-.608-1.916-1.58-2.34a19.11 19.11 0 0 0-2.106-.759c-1.567-.463-2.715-.463-2.836-2.018Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="home-24" viewBox="0 0 24 24">
        <g className="home">
          <path d="m2 12 10-9 10 9m-7 1H9v8h6v-8Z" className="path" />
          <path
            d="M4 11v10h5.333v-7.93h5.334V21H20V11m-10 9h4"
            className="path"
          />
        </g>
      </symbol>
      <symbol id="airplane-24" viewBox="0 0 24 24">
        <g className="airplane">
          <path className="fill-white" d="M22 12 8 21v-6l4-3-4-3V3l14 9Z" />
          <path
            className="stroke-current fill-white stroke-2 sl-r"
            d="M22 12 8 21v-6l4-3-4-3V3l14 9Z"
          />
          <path className="stroke-current stroke-2 sl-r" d="M21 12h-9" />
          <rect
            width="3"
            height="2"
            x="2"
            y="7"
            className="fill-current"
            rx="1"
          />
          <rect
            width="6"
            height="2"
            x="1"
            y="11"
            className="fill-current"
            rx="1"
          />
          <rect
            width="3"
            height="2"
            x="2"
            y="15"
            className="fill-current"
            rx="1"
          />
          <path
            className="stroke-current stroke-2 sl-r"
            d="M3 8h1M3 16h1M2 12h4"
          />
        </g>
      </symbol>
      <symbol id="timer-24" viewBox="0 0 24 24">
        <g className="timer">
          <path
            d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M12 9v3l3 3" className="stroke-current stroke-2 sl-r" />
          <g className="fill-current stroke-current stroke-2 sl-r">
            <path
              fillRule="evenodd"
              d="M8.199 4.959a8.023 8.023 0 0 0-3.81 4.572 3 3 0 1 1 3.81-4.572Z"
              clipRule="evenodd"
            />
            <path d="m8.199 4.959.476.88a1 1 0 0 0 .257-1.56l-.733.68Zm-3.81 4.572-.539.843a1 1 0 0 0 1.49-.535l-.952-.308Zm3.334-5.452a9.023 9.023 0 0 0-4.286 5.143l1.903.617a7.023 7.023 0 0 1 3.335-4l-.952-1.76Zm-2.797 4.61A1.998 1.998 0 0 1 4 7H2c0 1.42.74 2.665 1.85 3.374l1.076-1.686ZM4 7a2 2 0 0 1 2-2V3a4 4 0 0 0-4 4h2Zm2-2c.58 0 1.1.245 1.466.64l1.466-1.361A3.992 3.992 0 0 0 6 3v2Z" />
          </g>
          <g className="fill-current stroke-current stroke-2 sl-r">
            <path
              fillRule="evenodd"
              d="M15.801 4.959a8.023 8.023 0 0 1 3.81 4.572 3 3 0 1 0-3.81-4.572Z"
              clipRule="evenodd"
            />
            <path d="m15.801 4.959-.476.88a1 1 0 0 1-.256-1.56l.732.68Zm3.81 4.572.539.843a1 1 0 0 1-1.49-.535l.952-.308Zm-3.334-5.452a9.023 9.023 0 0 1 4.286 5.143l-1.903.617a7.023 7.023 0 0 0-3.335-4l.952-1.76Zm2.797 4.609A2 2 0 0 0 20 7h2c0 1.42-.74 2.665-1.85 3.374l-1.076-1.686ZM20 7a2 2 0 0 0-2-2V3a4 4 0 0 1 4 4h-2Zm-2-2c-.58 0-1.1.245-1.466.64l-1.465-1.361A3.992 3.992 0 0 1 18 3v2Z" />
          </g>
          <path
            d="M6 17.5 5 21m13-3.5 1 3.5"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="bee-24" viewBox="0 0 24 24">
        <g className="bee">
          <path
            d="M10 6c0-3-1-4-4-4m8 4c0-3 1-4 4-4"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            className="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            className="fill-dandelion-100 stroke-current stroke-2 sl-r"
          />
          <path d="M7 12c3.871 1.341 6.058 1.325 10 0" className="path" />
          <path
            d="M7 16c3.871 1.341 6.058 1.325 10 0"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M22 17.667A8.667 8.667 0 0 0 13.333 9H12v1.333A8.667 8.667 0 0 0 20.667 19c.736 0 1.333-.597 1.333-1.333Zm-20 0A8.667 8.667 0 0 1 10.667 9H12v1.333A8.667 8.667 0 0 1 3.333 19 1.333 1.333 0 0 1 2 17.667Z"
            className="fill-dandelion-0 stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="folder-24" viewBox="0 0 24 24">
        <g className="folder">
          <path
            d="M21 19.003A.997.997 0 0 1 20 20H4a1 1 0 0 1-1-1V5.5A1.5 1.5 0 0 1 4.5 4H7l1 1h11.5c.828 0 1.5.67 1.5 1.498v12.505Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M4.5 20A1.5 1.5 0 0 1 3 18.5v-8A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="palette-24" viewBox="0 0 24 24">
        <g className="palette">
          <path
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10v1.32a.68.68 0 0 1-.68.68h-4.653A2.667 2.667 0 0 0 14 16.667v4.654a.68.68 0 0 1-.68.679H12C6.477 22 2 17.523 2 12Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <circle
            cx="12"
            cy="6"
            r="1"
            className="fill-current fill-current stroke-current stroke-1"
          />
          <circle
            cx="8"
            cy="8"
            r="1"
            className="fill-current fill-current stroke-current stroke-1"
          />
          <circle
            cx="6"
            cy="12"
            r="1"
            className="fill-current fill-current stroke-current stroke-1"
          />
          <circle
            cx="8"
            cy="16"
            r="1"
            className="fill-current fill-current stroke-current stroke-1"
          />
        </g>
      </symbol>

      <symbol id="arrow-left-24" viewBox="0 0 24 24">
        <g className="arrow-left">
          <path
            d="M2 12h20M8 6l-6 6 6 6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-right-24" viewBox="0 0 24 24">
        <g className="arrow-right">
          <path
            d="M22 12H2m14 6 6-6-6-6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-up-24" viewBox="0 0 24 24">
        <g className="arrow-up">
          <path
            d="M12 2v20m6-14-6-6-6 6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-down-24" viewBox="0 0 24 24">
        <g className="arrow-down">
          <path
            d="M12 22V2M6 16l6 6 6-6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-down-24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 9L12 15L20 9"
          className="fill-none stroke-current stroke-2 sl-r"
        />
      </symbol>
      <symbol id="angle-up-24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 15L12 9L20 15"
          className="fill-none stroke-current stroke-2 sl-r"
        />
      </symbol>
      <symbol id="angle-left-24" viewBox="0 0 24 24" fill="none">
        <path
          d="M15 4L9 12L15 20"
          className="fill-none stroke-current stroke-2 sl-r"
        />
      </symbol>
      <symbol id="angle-right-24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 4L15 12L9 20"
          className="fill-none stroke-current stroke-2 sl-r"
        />
      </symbol>
      <symbol id="component-24" viewBox="0 0 24 24">
        <g className="component">
          <path
            d="m14.632 12 3.684-3.684L22 12l-3.684 3.684zm-6.316 6.316L12 14.632l3.684 3.684L12 22zm0-12.632L12 2l3.684 3.684L12 9.368zM2 12l3.684-3.684L9.368 12l-3.684 3.684z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="puzzle-24" viewBox="0 0 24 24">
        <g className="puzzle">
          <path
            d="M4 5.5A1.5 1.5 0 0 1 5.5 4h11A1.5 1.5 0 0 1 18 5.5V9s4-2 4 3-4 3-4 3v3.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5V15s4 1.5 4-3-4-3-4-3V5.5Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="settings-24" viewBox="0 0 24 24">
        <g className="settings">
          <path d="M8 9v12" className="stroke-current stroke-2 sl-r" />
          <circle
            cx={8}
            cy={6}
            r={3}
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M16 3v12" className="stroke-current stroke-2 sl-r" />
          <circle
            cx={16}
            cy={18}
            r={3}
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="external-24" viewBox="0 0 24 24">
        <g className="external">
          <path
            d="M9 15 21 3m-6 0h6v6M9 3H4.5A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V15"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="navigation-24" viewBox="0 0 24 24">
        <g className="navigation">
          <path d="M21 5H3m18 14H3" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="note-24" viewBox="0 0 24 24">
        <g className="note">
          <path
            d="M5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10.52a1 1 0 0 1 .78.375l3.48 4.351a1 1 0 0 1 .22.625V19a2 2 0 0 1-2 2H5Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M15 3v5h5M8 13h8m-8 4h8"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="link-24" viewBox="0 0 24 24">
        <g className="link">
          <path
            d="m18.364 13.207 1.768-1.768a5 5 0 1 0-7.071-7.07l-2.829 2.828a5 5 0 0 0 0 7.07 6.81 6.81 0 0 0 1.633 1.197m-6.229-3.671L3.868 13.56a5 5 0 0 0 7.071 7.07l2.829-2.828a5 5 0 0 0 0-7.07 6.796 6.796 0 0 0-1.633-1.197"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="frame-24" viewBox="0 0 24 24">
        <g className="frame">
          <path d="M6 6h12v12H6z" className="fill-white" />
          <path
            d="M3 6h18M6 3v18M18 3v18M3 18h18"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="cursor-24" viewBox="0 0 24 24">
        <g className="cursor">
          <path
            d="m4 4 18 6-9 3-3 9L4 4Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="calendar-24" viewBox="0 0 24 24">
        <g className="calendar">
          <rect
            width={20}
            height={16}
            x={2}
            y={4}
            className="fill-current stroke-current stroke-2 sl-r"
            rx={1}
          />
          <rect
            width={18}
            height={12}
            x={3}
            y={7}
            className="fill-white"
            rx={0.5}
          />
          <rect
            width={2}
            height={2}
            x={5}
            y={15}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={5}
            y={12}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={8}
            y={15}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={8}
            y={12}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={8}
            y={9}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={11}
            y={15}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={14}
            y={15}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={11}
            y={12}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={11}
            y={9}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={14}
            y={12}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={17}
            y={12}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={14}
            y={9}
            className="fill-current"
            rx={1}
          />
          <rect
            width={2}
            height={2}
            x={17}
            y={9}
            className="fill-current"
            rx={1}
          />
        </g>
      </symbol>
      <symbol id="copy-24" viewBox="0 0 24 24">
        <g className="copy">
          <path
            d="M8 9H4.5A1.5 1.5 0 0 0 3 10.5v9A1.5 1.5 0 0 0 4.5 21h10a1.5 1.5 0 0 0 1.5-1.5V15"
            className="stroke-current stroke-2 sl-r"
          />
          <rect
            width={13}
            height={12}
            x={8}
            y={3}
            className="stroke-current stroke-2 sl-r"
            rx={1.5}
          />
        </g>
      </symbol>
      <symbol id="views-24" viewBox="0 0 24 24">
        <g className="fill-white stroke-current stroke-2 sl-r">
          <path d="M4 9h4v12H4z" />
          <path d="M8 5h4v16H8z" />
          <path d="M12 9h4v12h-4z" />
          <path d="M16 3h4v18h-4z" />
        </g>
      </symbol>
      <symbol id="box-24" viewBox="0 0 24 24">
        <g className="box">
          <path
            d="M5.5 20A1.5 1.5 0 0 1 4 18.5V9h16v9.5a1.5 1.5 0 0 1-1.5 1.5h-13Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M3 9V6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9H3Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M9 13h6" className="stroke-current stroke-2" />
        </g>
      </symbol>
      <symbol id="square-info-24" width="24" height="24" viewBox="0 0 24 24">
        <g className="square-info">
          <path
            d="M3.993 21A.994.994 0 0 1 3 20V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16c0 .552-.442 1-.995 1H3.993Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M10 11h2v6" className="stroke-current stroke-2 sl-r" />
          <path d="M10 17h4" className="stroke-current stroke-2 sl-r" />
          <circle
            cx="11.5"
            cy="7.5"
            r=".5"
            className="fill-current stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="bmc-24" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#a)">
          <path
            fill="#0D0C22"
            d="m18.319 6.118-.016-.01-.037-.01a.09.09 0 0 0 .053.02Z"
          />
          <path
            fill="#0D0C22"
            d="m18.326 6.115-.007-.001v.004a.014.014 0 0 0 .007-.003Z"
          />
          <path
            fill="#0D0C22"
            d="M18.319 6.118h.003v-.002l-.003.002ZM18.536 7.686l.027-.014.01-.005.009-.01a.154.154 0 0 0-.046.03ZM18.365 6.152l-.026-.024-.018-.009c.01.016.025.028.044.033ZM11.783 21.403a.135.135 0 0 0-.053.04l.016-.01.037-.03ZM15.605 20.689c0-.023-.011-.018-.009.061 0-.006.003-.013.004-.019l.005-.042ZM15.209 21.403a.136.136 0 0 0-.053.04l.016-.01.037-.03ZM9.091 21.573a.117.117 0 0 0-.056-.025l.045.022.011.003ZM8.486 21.022a.164.164 0 0 0-.022-.066.53.53 0 0 1 .021.065v.001Z"
          />
          <path
            fill="#FD0"
            d="M12.554 11.163c-.831.338-1.775.722-2.998.722-.512-.001-1.02-.068-1.514-.199l.846 8.253c.03.345.196.667.464.901.267.235.618.365.983.365 0 0 1.199.06 1.6.06.43 0 1.721-.06 1.721-.06.364 0 .715-.13.983-.365.268-.234.433-.556.463-.9l.906-9.12a4.034 4.034 0 0 0-1.274-.22c-.796 0-1.438.261-2.18.563Z"
          />
          <path
            fill="#0D0C22"
            d="m5.424 7.642.015.013.009.005a.143.143 0 0 0-.024-.018Z"
          />
          <path
            fill="#0D0C22"
            d="m19.92 6.88-.128-.61c-.114-.548-.373-1.066-.965-1.264-.19-.063-.405-.09-.55-.222-.146-.13-.189-.334-.222-.523-.063-.347-.121-.694-.185-1.04-.055-.297-.099-.631-.242-.904-.187-.367-.575-.58-.96-.723-.198-.07-.4-.129-.604-.177-.964-.242-1.976-.33-2.967-.381a26.207 26.207 0 0 0-3.569.056c-.883.077-1.813.169-2.653.46-.306.105-.623.233-.856.458-.286.277-.38.705-.17 1.05.148.245.4.418.667.533.347.147.71.26 1.083.335 1.037.218 2.11.303 3.17.34 1.175.045 2.35.008 3.52-.11.289-.03.577-.066.865-.108.34-.05.557-.471.457-.765-.12-.35-.441-.487-.805-.434l-.16.023-.039.005-.369.042c-.254.026-.51.047-.765.064a27.06 27.06 0 0 1-3.41.006 22.59 22.59 0 0 1-1.116-.099l-.11-.013-.024-.003-.114-.016A12.615 12.615 0 0 1 8 2.742a.106.106 0 0 1-.059-.035.097.097 0 0 1 0-.125.106.106 0 0 1 .06-.035h.004a11.865 11.865 0 0 1 .807-.135h.002c.127-.008.254-.03.38-.044a25.44 25.44 0 0 1 3.304-.11 23.378 23.378 0 0 1 1.946.132l.132.016.088.012c.258.037.514.08.77.133.378.078.863.104 1.031.497.054.125.078.264.108.395l.037.167a.058.058 0 0 1 .003.01l.267 1.183a.206.206 0 0 1-.036.17.224.224 0 0 1-.156.09h-.002l-.055.008-.053.006a31.726 31.726 0 0 1-1.525.154 37.255 37.255 0 0 1-3.05.117 37.61 37.61 0 0 1-4.531-.279l-.123-.016a27.776 27.776 0 0 1-.28-.038c-.314-.045-.626-.1-.939-.148-.378-.06-.74-.03-1.082.148-.281.146-.509.37-.652.642-.148.29-.192.606-.258.917-.066.312-.168.647-.13.967.084.69.592 1.252 1.323 1.377a40.263 40.263 0 0 0 10.94.345.49.49 0 0 1 .38.126.442.442 0 0 1 .136.36l-.07.64a471003.246 471003.246 0 0 1-.981 9.08c-.04.376-.045.763-.12 1.135-.119.583-.535.942-1.141 1.073a8.34 8.34 0 0 1-1.694.188c-.632.003-1.263-.023-1.895-.02-.675.003-1.5-.056-2.022-.533-.457-.419-.52-1.075-.583-1.643l-.247-2.253-.457-4.176-.297-2.701-.014-.134c-.036-.322-.276-.638-.654-.622-.324.014-.692.276-.654.622l.22 2.003.453 4.143.388 3.532c.024.225.048.452.074.677.142 1.232 1.133 1.897 2.359 2.084.716.11 1.45.132 2.177.143.932.014 1.873.048 2.79-.112 1.357-.237 2.377-1.099 2.522-2.436l.125-1.158.413-3.831.45-4.173.207-1.913a.434.434 0 0 1 .12-.254.474.474 0 0 1 .256-.136c.389-.072.76-.195 1.036-.476.44-.447.527-1.03.372-1.618Zm-14.61.413c.007-.003-.004.045-.009.068 0-.034.001-.064.01-.068Zm.039.277c.003-.002.012.01.022.024-.015-.013-.024-.023-.023-.024Zm.037.046c.02.035.013.022 0 0Zm.074.058h.002c0 .002.003.004.005.006a.048.048 0 0 0-.007-.006Zm13.034-.086c-.14.126-.35.184-.557.214-2.33.328-4.693.495-7.048.421-1.686-.055-3.354-.232-5.022-.456-.164-.022-.34-.05-.453-.165-.212-.216-.108-.651-.053-.912.05-.24.147-.558.446-.592.468-.053 1.01.135 1.472.201.557.081 1.115.146 1.676.194 2.392.207 4.825.175 7.206-.128.435-.055.867-.12 1.298-.193.384-.066.81-.188 1.042.19.159.257.18.602.156.893a.488.488 0 0 1-.163.333Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M4 1h16v22H4z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="figma-16" fill="none" viewBox="0 0 24 24">
        <path
          className="stroke-current"
          strokeWidth="1.5"
          d="M19.935 4.518a3.74 3.74 0 0 1-3.74 3.741h-3.839V.777h3.838a3.74 3.74 0 0 1 3.741 3.741Z"
        />
        <path
          className="stroke-current"
          strokeWidth="1.5"
          d="M4.777 4.518A3.74 3.74 0 0 0 8.518 8.26h3.838V.777H8.518a3.74 3.74 0 0 0-3.74 3.741Z"
        />
        <path
          className="stroke-current"
          strokeWidth="1.5"
          d="M4.777 12a3.74 3.74 0 0 0 3.741 3.741h3.838V8.259H8.518A3.74 3.74 0 0 0 4.778 12Z"
        />
        <path
          className="stroke-current"
          strokeWidth="1.5"
          d="M4.777 19.482c0 2.066 1.7 3.74 3.765 3.74 2.093 0 3.814-1.696 3.814-3.789v-3.692H8.518a3.74 3.74 0 0 0-3.74 3.74ZM12.356 12a3.741 3.741 0 0 0 3.741 3.741h.097a3.74 3.74 0 0 0 0-7.482h-.097A3.74 3.74 0 0 0 12.357 12Z"
        />
      </symbol>
      <symbol id="github-16" fill="none" viewBox="0 0 24 24">
        <g className="fill-current" clipPath="url(#a)">
          <path
            fillRule="evenodd"
            d="M12 .5a12.043 12.043 0 0 0-7.773 2.847A11.917 11.917 0 0 0 .16 10.522a11.877 11.877 0 0 0 1.576 8.086 11.99 11.99 0 0 0 6.469 5.145c.596.11.82-.259.82-.573 0-.314-.011-1.225-.015-2.22-3.339.72-4.044-1.41-4.044-1.41-.544-1.383-1.331-1.746-1.331-1.746-1.09-.739.081-.725.081-.725 1.206.085 1.84 1.23 1.84 1.23 1.07 1.824 2.808 1.297 3.491.989.108-.773.42-1.298.763-1.597-2.666-.3-5.468-1.324-5.468-5.896a4.607 4.607 0 0 1 1.236-3.202c-.123-.3-.535-1.514.117-3.162 0 0 1.008-.32 3.3 1.223a11.453 11.453 0 0 1 6.01 0c2.29-1.543 3.296-1.223 3.296-1.223.654 1.644.243 2.857.12 3.162a4.597 4.597 0 0 1 1.238 3.206c0 4.582-2.808 5.592-5.479 5.886.43.372.813 1.097.813 2.211 0 1.597-.014 2.88-.014 3.274 0 .318.216.69.825.573a11.99 11.99 0 0 0 6.47-5.146 11.877 11.877 0 0 0 1.575-8.087 11.917 11.917 0 0 0-4.07-7.175A12.043 12.043 0 0 0 12.004.5H12Z"
            clipRule="evenodd"
          />
          <path
            className="stroke-current"
            d="M4.544 17.632c-.025.06-.12.077-.198.036a.302.302 0 0 1-.018-.011c-.065-.04-.11-.105-.093-.16a.079.079 0 0 1 .007-.017c.032-.055.121-.067.195-.028a.31.31 0 0 1 .018.01c.067.043.114.112.091.166 0 .001 0 .003-.002.004Z"
          />
          <path d="M5.031 18.171a.2.2 0 0 1-.246-.055c-.078-.083-.094-.197-.034-.249.06-.051.167-.027.244.055.078.083.096.198.036.25ZM5.504 18.857c-.073.051-.198 0-.268-.103a.197.197 0 0 1 0-.284c.074-.05.199 0 .268.1.07.101.072.236 0 .287ZM6.146 19.52c-.065.074-.199.054-.308-.045-.11-.098-.135-.233-.07-.304.066-.071.2-.051.313.046.113.096.135.233.065.304ZM7.046 19.908c-.03.093-.165.134-.3.095-.135-.04-.224-.15-.199-.245.026-.095.163-.138.3-.095.138.044.225.148.2.245ZM8.028 19.975c0 .097-.111.18-.255.182-.143.002-.26-.077-.26-.174 0-.097.111-.18.255-.182.143-.002.26.076.26.174ZM8.942 19.823c.018.097-.082.198-.225.221-.143.024-.268-.033-.286-.128-.018-.095.086-.198.225-.223.139-.026.268.033.286.13Z" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="linkedin-16" fill="none" viewBox="0 0 24 24">
        <g clipPath="url(#a)">
          <path
            className="fill-current"
            d="M22.223 0H1.772C.792 0 0 .773 0 1.73v20.536C0 23.222.792 24 1.772 24h20.451c.98 0 1.777-.778 1.777-1.73V1.73C24 .773 23.203 0 22.223 0ZM7.12 20.452H3.558V8.995H7.12v11.457ZM5.34 7.434a2.064 2.064 0 1 1 0-4.125 2.063 2.063 0 0 1 0 4.125Zm15.112 13.018h-3.558v-5.57c0-1.326-.024-3.037-1.852-3.037-1.851 0-2.133 1.449-2.133 2.944v5.663H9.356V8.995h3.413v1.566h.047c.473-.9 1.636-1.852 3.365-1.852 3.605 0 4.27 2.372 4.27 5.457v6.286Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </symbol>
      <symbol id="mastodon-16" fill="none" viewBox="0 0 24 24">
        <path
          className="fill-current"
          d="M21.5 8.395c0-4.556-2.897-5.892-2.897-5.892-2.842-1.345-10.391-1.331-13.206 0 0 0-2.897 1.336-2.897 5.892 0 5.424-.3 12.16 4.802 13.552 1.842.501 3.425.61 4.698.534 2.31-.131 3.606-.848 3.606-.848l-.077-1.73s-1.65.535-3.506.474c-1.838-.066-3.775-.207-4.075-2.532a4.952 4.952 0 0 1-.04-.651c3.892.98 7.212.426 8.126.314 2.551-.314 4.775-1.936 5.057-3.417.445-2.335.409-5.696.409-5.696Zm-3.415 5.869h-2.12V8.911c0-2.33-2.91-2.419-2.91.323v2.93H10.95v-2.93c0-2.742-2.911-2.653-2.911-.323v5.353H5.915c0-5.723-.236-6.933.837-8.203 1.178-1.355 3.63-1.444 4.72.286L12 7.26l.528-.914c1.095-1.74 3.551-1.631 4.72-.286 1.078 1.28.837 2.484.837 8.203Z"
        />
      </symbol>
      <symbol id="x-16" viewBox="0 0 24 24" fill="none">
        <path
          d="M18.244 2.25H21.552L14.325 10.51L22.827 21.75H16.17L10.956 14.933L4.99003 21.75H1.68003L9.41003 12.915L1.25403 2.25H8.08003L12.793 8.481L18.244 2.25ZM17.083 19.77H18.916L7.08403 4.126H5.11703L17.083 19.77Z"
          className="fill-current"
        />
      </symbol>

      <symbol id="search-16" viewBox="0 0 16 16">
        <g className="search">
          <path
            d="m11 11 2 2"
            className="fill-none stroke-current stroke-4 sl-r"
          />
          <circle
            cx="7"
            cy="7"
            r="5"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="shadow-16" viewBox="0 0 16 16">
        <g className="shadow">
          <circle
            cx="8"
            cy="6"
            r="4"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M3.101 12A6.977 6.977 0 0 0 8 14a6.977 6.977 0 0 0 4.899-2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="settings-16" viewBox="0 0 16 16">
        <g className="settings">
          <circle
            cx="5"
            cy="4"
            r="2"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <circle
            cx="11"
            cy="12"
            r="2"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M5 6v9m6-14v9"
            className="fill-none stroke-current stroke-2"
          />
        </g>
      </symbol>
      <symbol id="calendar-16" viewBox="0 0 16 16">
        <g className="calendar">
          <rect
            width="12"
            height="10"
            x="2"
            y="3"
            className="fill-current stroke-current stroke-2 sl-r"
            rx="1"
          />
          <path
            d="M3 5h10"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <rect
            width="10"
            height="6"
            x="3"
            y="6"
            className="fill-white"
            rx=".5"
          />
        </g>
      </symbol>
      <symbol id="timer-16" viewBox="0 0 16 16">
        <g className="timer">
          <path
            d="M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m2 3.5 2-2m10 2-2-2M8 7v2h2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="design-16" viewBox="0 0 16 16">
        <g className="design">
          <g className="fill-none stroke-current stroke-2 sl-s">
            <path d="M3 12c0-2.76 2.24-5 5-5s5 2.24 5 5" />
            <path d="M3 12c0-2.76 2.24-5 5-5s5 2.24 5 5" />
          </g>
          <path
            d="M2 7h12"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M9 6H7v2h2V6ZM2 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm12 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            className="fill-current stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="download-16" viewBox="0 0 16 16">
        <g className="download">
          <path
            d="M2 15h12"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <g className="fill-none stroke-current stroke-2 sl-r">
            <path d="m5 8 3 3 3-3" />
            <path d="m5 8 3 3 3-3" />
          </g>
          <path d="M8 1v9" className="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="code-16" viewBox="0 0 16 16">
        <g className="code">
          <rect
            width="14"
            height="12"
            x="1"
            y="2"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <path
            d="m5 6 2 2-2 2m4 0h2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="checkmark-underline-16" viewBox="0 0 16 16">
        <g className="checkmark-underline">
          <path
            d="M2 15h12M3 8l3 3 7-7"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="checkmark-checkmark-16" viewBox="0 0 16 16">
        <g className="checkmark-checkmark">
          <path
            d="m3 8 3 3 7-7"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="folder-16" viewBox="0 0 16 16">
        <g className="folder">
          <path
            d="M15 6H1V3c0-.55.45-1 1-1h5l.67 1H14c.55 0 1 .45 1 1v2ZM1 6h14v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-left-16" viewBox="0 0 16 16">
        <g className="arrow-left">
          <path
            d="M1 8h14M5 4 1 8l4 4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-right-16" viewBox="0 0 16 16">
        <g className="arrow-right">
          <path
            d="M15 8H1m10 4 4-4-4-4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-up-16" viewBox="0 0 16 16">
        <g className="arrow-up">
          <path
            d="M8 1v14m4-10L8 1 4 5"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="arrow-down-16" viewBox="0 0 16 16">
        <g className="arrow-down">
          <path
            d="M8 15V1M4 11l4 4 4-4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="airplane-16" viewBox="0 0 16 16">
        <g className="airplane">
          <path
            d="M15 8 5 14v-4l3-2-3-2V2l10 6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M2 8H1m12 0H8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <circle cx="2" cy="4" r="1" className="fill-current" />
          <circle cx="2" cy="12" r="1" className="fill-current" />
        </g>
      </symbol>
      <symbol id="envelope-16" viewBox="0 0 16 16">
        <g className="envelope">
          <g className="fill-white stroke-current stroke-2 sl-r">
            <path d="M2 5.29 1 6v9h14V6l-1-.72" />
            <path d="M2 5.29 1 6v9h14V6l-1-.72" />
          </g>
          <path d="M14 7V3H2v4H1l7 4 7-4h-1Z" className="fill-white" />
          <path
            d="m1 7 7 4 7-4m-4.2-4L8 1m0 0L5.2 3M2 7V3h12v4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="person-16" viewBox="0 0 16 16">
        <g className="person">
          <path
            d="M9.84 9.7v-.03c.9-.72 1.49-1.94 1.49-3.33v-2c0-1.21 0-2-.67-2.67C10 1 9.33 1 8.67 1c-.6 0-.66.54-1.64.65-1.37.15-2.36 1.37-2.36 2.74v1.94c0 1.39.59 2.62 1.49 3.33v.03c-.09 1.21-.93 1.21-2.09 1.57-.62.19-1.14.4-1.56.59-.71.33-1.17 1.04-1.17 1.82V14c0 .55.45 1 1 1h11.33c.55 0 1-.45 1-1v-.32c0-.78-.45-1.49-1.17-1.82-.42-.19-.95-.4-1.56-.59-1.16-.36-2.01-.36-2.1-1.57Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="frame-16" viewBox="0 0 16 16">
        <g className="frame">
          <path d="M4 4h8v8H4z" className="fill-white" />
          <path
            d="M2 4h12M4 2v12m8-12v12M2 12h12"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="autolayout-v-16" viewBox="0 0 16 16">
        <g className="autolayout-v">
          <rect
            width="12"
            height="4"
            x="2"
            y="2"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <rect
            width="12"
            height="4"
            x="2"
            y="10"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="autolayout-h-16" viewBox="0 0 16 16">
        <g className="autolayout-h">
          <rect
            width="4"
            height="12"
            x="2"
            y="2"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
          <rect
            width="4"
            height="12"
            x="10"
            y="2"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="component-instance-16" viewBox="0 0 16 16">
        <g className="component-instance">
          <path
            d="M7.293 2.707a1 1 0 0 1 1.414 0l4.586 4.586a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0L2.707 8.707a1 1 0 0 1 0-1.414l4.586-4.586Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="play-16" viewBox="0 0 16 16">
        <g className="play">
          <path
            d="M4 3.766a1 1 0 0 1 1.514-.857l7.057 4.234a1 1 0 0 1 0 1.714l-7.056 4.234A1 1 0 0 1 4 12.234V3.766Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="align-left-16" viewBox="0 0 16 16">
        <g className="align-left">
          <path
            d="M2 2h12M2 6h8m-8 4h6m-6 4h10"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="align-centre-16" viewBox="0 0 16 16">
        <g className="align-centre">
          <path
            d="M2 2h12M2 14h12M4 6h8m-8 4h8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="align-right-16" viewBox="0 0 16 16">
        <g className="align-right">
          <path
            d="M2 2h12M6 6h8m-6 4h6M4 14h10"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="pen-16" viewBox="0 0 16 16">
        <g className="pen">
          <path
            d="M11 15H5c0-3-3-6-3-6l6-8 6 8s-3 3-3 6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M8 2v7" className="fill-none stroke-current stroke-2 sl-r" />
          <circle
            cx="8"
            cy="9"
            r="1"
            className="fill-current stroke-current stroke-1 sl-r"
          />
          <path
            d="M4 15h8"
            className="fill-none stroke-current stroke-2 sl-s"
          />
        </g>
      </symbol>
      <symbol id="home-16" viewBox="0 0 16 16">
        <g className="home">
          <path d="M15 7 8 1 1 7h1v8h4V9h4v6h4V7h1Z" className="fill-white" />
          <path
            d="m1 7 7-6 7 6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="M10 9H6v5h4V9Z" className="fill-white" />
          <path
            d="M2 6.33V15h4V9h4v6h4V6.33M6 14h4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="copy-16" viewBox="0 0 16 16">
        <g className="copy">
          <path
            d="M3 2h10v12H3z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M7 2h2v1H7z"
            className="fill-none stroke-current stroke-2 sl-s"
          />
        </g>
      </symbol>
      <symbol id="copy-success-16" viewBox="0 0 16 16">
        <g className="copy-success">
          <path d="M3 2h10v12H3z" className="fill-success" />
          <path
            d="M7 2h2v1H7z"
            className="fill-none stroke-current stroke-2 sl-s"
          />
          <path
            d="m6 9 1 1 3-3"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="external-16" viewBox="0 0 16 16">
        <g className="external">
          <path
            d="m6 10 8-8M9 2h5v5M5 2H2v12h12v-3"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="cursor-16" viewBox="0 0 16 16">
        <g className="cursor">
          <path
            d="m3.606 1.988 10.404 6.07-6.069.866-3.468 5.202-.867-12.138Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="rectangle-16" viewBox="0 0 16 16">
        <g className="rectangle">
          <rect
            width="10"
            height="10"
            x="3"
            y="3"
            className="Rectangle 6"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="component-16" viewBox="0 0 16 16">
        <g className="component">
          <path
            d="m5 5 3-3 3 3-3 3z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m2 8 3-3 3 3-3 3zm3 3 3-3 3 3-3 3z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="m8 8 3-3 3 3-3 3z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="move-16" viewBox="0 0 16 16">
        <g className="move">
          <path
            d="m6 12 2 2 2-2m0-8L8 2 6 4M4 6 2 8l2 2m6-2h3M3 8h3m2-5v3m0 4v3m4-3 2-2-2-2"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="comment-16" viewBox="0 0 16 16">
        <g className="comment">
          <path
            d="M11 2H5a3 3 0 0 0-3 3v8a1 1 0 0 0 1.6.8l1.333-1a4 4 0 0 1 2.4-.8H11a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="plus-16" viewBox="0 0 16 16">
        <g className="plus">
          <path
            d="M3 8h10M8 3v10"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="copy-alternate-16" viewBox="0 0 16 16">
        <g className="copy-alternate">
          <path
            d="M5 6H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <rect
            width="8"
            height="8"
            x="6"
            y="2"
            className="fill-white stroke-current stroke-2 sl-r"
            rx="1"
          />
        </g>
      </symbol>
      <symbol id="angle-right-16" viewBox="0 0 16 16">
        <g className="angle-right">
          <path
            d="m6 3 4 5-4 5"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-left-16" viewBox="0 0 16 16">
        <g className="angle-left">
          <path
            d="M10 3 6 8l4 5"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-down-16" viewBox="0 0 16 16">
        <g className="angle-down">
          <path
            d="m3 6 5 4 5-4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-up-16" viewBox="0 0 16 16">
        <g className="angle-up">
          <path
            d="m3 10 5-4 5 4"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="external-16" viewBox="0 0 16 16">
        <g className="external">
          <path
            d="m6 10 8-8m-4 0h4v4M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3"
            className="path"
          />
        </g>
      </symbol>
      <symbol id="vector-square-24" viewBox="0 0 24 24">
        <g className="vector-square">
          <path
            d="M6 19a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12c0 .552-.442 1-.994 1H6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M7 3H3v4h4V3Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M7 17H3v4h4v-4Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M21 3h-4v4h4V3Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M21 17h-4v4h4v-4Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="vector-square-16" viewBox="0 0 16 16">
        <g className="vector-square">
          <path
            d="M4 13a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8c0 .552-.444 1-.996 1H4Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path
            d="M4 2H2v2h2V2Zm0 10H2v2h2v-2ZM14 2h-2v2h2V2Zm0 10h-2v2h2v-2Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="type-16" viewBox="0 0 16 16">
        <g className="type">
          <path d="m8 3 1 1v6H5l3-7Z" className="fill-white" />
          <g className="mask-type-16">
            <mask
              id="mask-type-16"
              width="8"
              height="14"
              x="1"
              y="1"
              className="a"
              maskUnits="userSpaceOnUse"
              style={{ maskType: 'alpha' }}
            >
              <path d="M1 1h8v14H1z" className="mask" />
            </mask>
            <g mask="url(#mask-type-16)">
              <path d="M4 11h5" className="fill-none stroke-current stroke-2" />
              <path
                d="M2 16 7.76 2 14 16"
                className="fill-none stroke-current stroke-2 sl-r"
              />
            </g>
          </g>
          <path
            d="M11 2h1v12h-1"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M13 2h-1v12h1"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="palette-16" viewBox="0 0 16 16">
        <g className="palette">
          <path
            d="M2 8a6 6 0 0 1 12 0v1.547c0 .25-.203.453-.453.453h-2.214c-.736 0-1.333.597-1.333 1.333v2.214c0 .25-.203.453-.453.453H8a6 6 0 0 1-6-6Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <circle cx="8" cy="5" r="1" className="fill-current" />
          <circle cx="7" cy="10" r="1" className="fill-current" />
          <circle cx="5" cy="7" r="1" className="fill-current" />
        </g>
      </symbol>
      <symbol id="bolt-16" viewBox="0 0 16 16">
        <g className="bolt">
          <path
            d="M9 6 8 1l-5 9h4l1 5 5-9H9Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="puzzle-16" viewBox="0 0 16 16">
        <g className="puzzle">
          <path
            d="M2 2.5a.5.5 0 0 1 .5-.5h8.889a.5.5 0 0 1 .5.5v2.645c0 .382.424.642.793.544C13.604 5.444 15 5.489 15 8c0 2.512-1.396 2.556-2.318 2.311-.37-.098-.793.162-.793.544V13.5a.5.5 0 0 1-.5.5H2.5a.5.5 0 0 1-.5-.5v-2.732c0-.362.38-.618.734-.55.92.177 2.377.092 2.377-2.218S3.654 5.605 2.734 5.782C2.38 5.85 2 5.594 2 5.232V2.5Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="css-16" viewBox="0 0 16 16">
        <g className="css">
          <path d="M4 2h8v4l2 2-2 2v4H4v-4L2 8l2-2V2Z" className="fill-white" />
          <path
            d="M6 2h-.5A1.5 1.5 0 0 0 4 3.5v2.293a.5.5 0 0 1-.146.353l-1.5 1.5a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 0 1 .146.353V12.5A1.5 1.5 0 0 0 5.5 14H6m4-12h.5A1.5 1.5 0 0 1 12 3.5v2.293a.5.5 0 0 0 .146.353l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 0-.146.353V12.5a1.5 1.5 0 0 1-1.5 1.5H10"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
    </defs>
  </svg>
)

export default Sprite
