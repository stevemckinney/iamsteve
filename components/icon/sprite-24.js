/**
 * Sprite24
 * - Uses SVG export plugin in Figma to export layer names to class names
 * - Used in icon component to select correct size icon
 * - Each icon ID has a size suffix (eg: logo-32, type-16, or type-24)
 * - Tailwind for styling and some custom for stroke properties (eg: sl-r)
 */
const Sprite24 = ({ ...props }) => (
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
      <symbol id="search-24" viewBox="0 0 24 24">
        <g className="search">
          <path d="m19 19 1 1" className="stroke-current stroke-4 sl-r" />
          <path d="m17 17 1 1" className="stroke-current stroke-4 sl-s" />
          <path
            d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
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
            d="M4 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M20 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M4 8h16" className="stroke-current stroke-2 sl-r" />
          <path
            d="M10 8a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M6 6H2v4h4V6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M22 6h-4v4h4V6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="code-24" viewBox="0 0 24 24">
        <g className="code">
          <path
            d="M3.993 20A.994.994 0 0 1 3 19V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v14c0 .552-.442 1-.995 1H3.993Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="m7 12 2 2-2 2" className="stroke-current stroke-2 sl-r" />
          <path d="M12 16h3" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="pen-24" viewBox="0 0 24 24">
        <g className="pen">
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7Z"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M12 2v12" className="stroke-current stroke-2 sl-r" />
          <circle
            cx="12"
            cy="14"
            r="1"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M7 22h10" className="stroke-current stroke-2 sl-s" />
        </g>
      </symbol>
      <symbol id="clipboard-24" viewBox="0 0 24 24">
        <g className="clipboard">
          <rect
            width="16"
            height="18"
            x="4"
            y="4"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            rx="1"
          />
          <path
            d="M8 4h8v3H8z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <circle
            cx="12"
            cy="3"
            r="2"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="envelope-24" viewBox="0 0 24 24">
        <g className="envelope">
          <path
            d="m12 2-9 8v11h18V10l-9-8Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M5 4h14v6h2l-9 6-9-6h2V4Z"
            className={`fill-(--icon-fill)`}
          />
          <path
            d="m3 10 9 6 9-6"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M19 11V4H5v7"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="person-24" viewBox="0 0 24 24">
        <g className="person">
          <path
            d="M14.478 14.186V13.8c1.215-.926 2.012-1.813 2.012-3.6V7.5c0-1.556 0-2.777-.905-3.639C14.84 3.151 13.79 3 12.898 3c-.81 0-.898.836-2.215.836-1.833 0-3.186 1.864-3.186 3.625V10.2c0 1.787.796 2.687 2.012 3.6v.373c-.122 1.556-1.256 1.556-2.823 2.018a18.32 18.32 0 0 0-2.106.759C3.62 17.374 3 18.287 3 19.29V21h18v-1.697c0-1.003-.608-1.916-1.58-2.34a19.11 19.11 0 0 0-2.106-.759c-1.567-.463-2.715-.463-2.836-2.018Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="home-24" viewBox="0 0 24 24">
        <g className="home fill-none">
          <path
            d="m12 3-8 7v11h5v-8h6v8h5V10l-8-7Z"
            className={`fill-(--icon-fill)`}
          />
          <path d="m2 12 10-9 10 9" className="stroke-current stroke-2 sl-s" />
          <path d="M15 13H9v7h6v-7Z" className="stroke-current stroke-2 sl-r" />
          <path
            d="M4 11v10h5v-7.93h6V21h5V11"
            className="stroke-current stroke-2 sl-r"
          />
          <path d="M9 20h6" className="stroke-current stroke-2 sl-s" />
        </g>
      </symbol>
      <symbol id="airplane-24" viewBox="0 0 24 24">
        <g className="airplane">
          <path d="M22 12 8 21v-6l4-3-4-3V3l14 9Z" className="fill-current" />
          <path
            d="M22 12 8 21v-6l4-3-4-3V3l14 9Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M21 12h-9" className="stroke-current stroke-2 sl-r" />
          <path d="M3 8h1" className="stroke-current stroke-2 sl-r" />
          <path d="M3 16h1" className="stroke-current stroke-2 sl-r" />
          <path d="M2 12h4" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="timer-24" viewBox="0 0 24 24">
        <g className="timer">
          <path
            d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M12 9v3l3 3" className="stroke-current stroke-2 sl-r" />
          <g className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}>
            <path
              fillRule="evenodd"
              d="M8.199 4.959a8.023 8.023 0 0 0-3.81 4.572 3 3 0 1 1 3.81-4.572Z"
              clipRule="evenodd"
            />
            <path d="m8.199 4.959.476.88a1 1 0 0 0 .257-1.56l-.733.68Zm-3.81 4.572-.539.843a1 1 0 0 0 1.49-.535l-.952-.308Zm3.334-5.452a9.023 9.023 0 0 0-4.286 5.143l1.903.617a7.023 7.023 0 0 1 3.335-4l-.952-1.76Zm-2.797 4.61A1.998 1.998 0 0 1 4 7H2c0 1.42.74 2.665 1.85 3.374l1.076-1.686ZM4 7a2 2 0 0 1 2-2V3a4 4 0 0 0-4 4h2Zm2-2c.58 0 1.1.245 1.466.64l1.466-1.361A3.992 3.992 0 0 0 6 3v2Z" />
          </g>
          <g className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}>
            <path
              fillRule="evenodd"
              d="M15.801 4.959a8.023 8.023 0 0 1 3.81 4.572 3 3 0 1 0-3.81-4.572Z"
              clipRule="evenodd"
            />
            <path d="m15.801 4.959-.476.88a1 1 0 0 1-.256-1.56l.732.68Zm3.81 4.572.539.843a1 1 0 0 1-1.49-.535l.952-.308Zm-3.334-5.452a9.023 9.023 0 0 1 4.286 5.143l-1.903.617a7.023 7.023 0 0 0-3.335-4l.952-1.76Zm2.797 4.609A2 2 0 0 0 20 7h2c0 1.42-.74 2.665-1.85 3.374l-1.076-1.686ZM20 7a2 2 0 0 0-2-2V3a4 4 0 0 1 4 4h-2Zm-2-2c-.58 0-1.1.245-1.466.64l-1.465-1.361A3.992 3.992 0 0 1 18 3v2Z" />
          </g>
          <path d="M6 17.5 5 21" className="stroke-current stroke-2 sl-r" />
          <path d="m18 17.5 1 3.5" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="bee-24" viewBox="0 0 24 24">
        <g className="bee">
          <path
            d="M10 6c0-3-1-4-4-4"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M14 6c0-3 1-4 4-4"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            className="fill-dandelion-100 dark:fill-fern-900 stroke-current stroke-2 sl-r"
          />
          <path d="M7 12c3.871 1.341 6.058 1.325 10 0" className="path" />
          <path
            d="M7 16c3.871 1.341 6.058 1.325 10 0"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M22 17.667A8.667 8.667 0 0 0 13.333 9H12v1.333A8.667 8.667 0 0 0 20.667 19c.736 0 1.333-.597 1.333-1.333Z"
            className="fill-dandelion-0 dark:fill-fern-900 stroke-current stroke-2 sl-r"
          />
          <path
            d="M2 17.667A8.667 8.667 0 0 1 10.667 9H12v1.333A8.667 8.667 0 0 1 3.333 19 1.333 1.333 0 0 1 2 17.667Z"
            className="fill-dandelion-0 dark:fill-fern-900 stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="folder-24" viewBox="0 0 24 24">
        <g className="folder">
          <path
            d="M21 19.003A.997.997 0 0 1 20 20H4a1 1 0 0 1-1-1V5.5A1.5 1.5 0 0 1 4.5 4H7l1 1h11.5c.828 0 1.5.67 1.5 1.498v12.505Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M4.5 20A1.5 1.5 0 0 1 3 18.5v-8A1.5 1.5 0 0 1 4.5 9h15a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="arrow-left-24" viewBox="0 0 24 24">
        <g className="arrow-left">
          <path d="M2 12h20" className="stroke-current stroke-2 sl-r" />
          <path d="m8 6-6 6 6 6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-right-24" viewBox="0 0 24 24">
        <g className="arrow-right">
          <path d="M22 12H2" className="stroke-current stroke-2 sl-r" />
          <path d="m16 18 6-6-6-6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-up-24" viewBox="0 0 24 24">
        <g className="arrow-up">
          <path d="M12 2v20" className="stroke-current stroke-2 sl-r" />
          <path d="m18 8-6-6-6 6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-down-24" viewBox="0 0 24 24">
        <g className="arrow-down">
          <path d="M12 22V2" className="stroke-current stroke-2 sl-r" />
          <path d="m6 16 6 6 6-6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="settings-24" viewBox="0 0 24 24">
        <g className="settings">
          <path d="M8 9v12" className="stroke-current stroke-2 sl-r" />
          <circle
            cx="8"
            cy="6"
            r="3"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M16 3v12" className="stroke-current stroke-2 sl-r" />
          <circle
            cx="16"
            cy="18"
            r="3"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="external-24" viewBox="0 0 24 24">
        <g className="external">
          <path d="M9 15 21 3" className="stroke-current stroke-2 sl-r" />
          <path d="M15 3h6v6" className="stroke-current stroke-2 sl-r" />
          <path
            d="M9.222 7H4.5A1.5 1.5 0 0 0 3 8.5v11A1.5 1.5 0 0 0 4.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-4.722"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="navigation-24" viewBox="0 0 24 24">
        <g className="navigation">
          <path d="M21 5H3" className="stroke-current stroke-2 sl-r" />
          <path d="M19 12H5" className="stroke-current stroke-2 sl-r" />
          <path d="M21 19H3" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="note-24" viewBox="0 0 24 24">
        <g className="note fill-none">
          <path
            d="M5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v11l-6 6H5Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M14 20v-5h5" className="stroke-current stroke-2 sl-r" />
          <path d="M8 7h8" className="stroke-current stroke-2 sl-r" />
          <path d="M8 11h8" className="stroke-current stroke-2 sl-r" />
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
          <path d="M6 6h12v12H6z" className={`fill-(--icon-fill)`} />
          <path d="M3 6h18" className="stroke-current stroke-2 sl-r" />
          <path d="M6 3v18" className="stroke-current stroke-2 sl-r" />
          <path d="M18 3v18" className="stroke-current stroke-2 sl-r" />
          <path d="M3 18h18" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="cursor-24" viewBox="0 0 24 24">
        <g className="cursor">
          <path
            d="m4 4 18 6-9 3-3 9L4 4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="calendar-24" viewBox="0 0 24 24">
        <g className="calendar">
          <rect
            width="20"
            height="16"
            x="2"
            y="4"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            rx="1"
          />
          <rect
            width="18"
            height="12"
            x="3"
            y="7"
            className={`fill-(--icon-fill)`}
            rx=".5"
          />
          <rect
            width="2"
            height="2"
            x="5"
            y="15"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="5"
            y="12"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="8"
            y="15"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="8"
            y="12"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="8"
            y="9"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="11"
            y="15"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="14"
            y="15"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="11"
            y="12"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="11"
            y="9"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="14"
            y="12"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="17"
            y="12"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="14"
            y="9"
            className="fill-current"
            rx="1"
          />
          <rect
            width="2"
            height="2"
            x="17"
            y="9"
            className="fill-current"
            rx="1"
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
            width="13"
            height="12"
            x="8"
            y="3"
            className="stroke-current stroke-2 sl-r"
            rx="1.5"
          />
        </g>
      </symbol>
      <symbol id="angle-right-24" viewBox="0 0 24 24">
        <g className="angle-right">
          <path
            d="m8 4 8 8-8 8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-down-24" viewBox="0 0 24 24">
        <g className="angle-down">
          <path
            d="m4 8 8 8 8-8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-left-24" viewBox="0 0 24 24">
        <g className="angle-left">
          <path
            d="m16 4-8 8 8 8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="angle-up-24" viewBox="0 0 24 24">
        <g className="angle-up">
          <path
            d="m4 16 8-8 8 8"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="bolt-24" viewBox="0 0 24 24">
        <g className="bolt">
          <path
            d="m13 10-1-8-6 12h5l1 8 6-12h-5Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="component-24" viewBox="0 0 24 24">
        <g className="component">
          <path
            d="m14.632 12 3.684-3.684L22 12l-3.684 3.684z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M8.316 18.316 12 14.632l3.684 3.684L12 22z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M8.316 5.684 12 2l3.684 3.684L12 9.368z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="m2 12 3.684-3.684L9.368 12l-3.684 3.684z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="play-24" viewBox="0 0 24 24">
        <g className="play">
          <path
            d="M5 3.7a1 1 0 0 1 1.486-.875l14.94 8.3a1 1 0 0 1 0 1.75l-14.94 8.3A1 1 0 0 1 5 20.3V3.7Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="type-24" viewBox="0 0 24 24">
        <g className="type">
          <path d="m12 3 3 6.5V16H6l6-13Z" className={`fill-(--icon-fill)`} />
          <g className="type-24">
            <mask
              id="a-24"
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
            <g mask="url(#a)">
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
      <symbol id="vector-square-24" viewBox="0 0 24 24">
        <g className="vector-square">
          <path
            d="M6 19a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12c0 .552-.442 1-.994 1H6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M7 3H3v4h4V3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M7 17H3v4h4v-4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M21 3h-4v4h4V3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M21 17h-4v4h4v-4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="palette-24" viewBox="0 0 24 24">
        <g className="palette">
          <path
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10v1.32a.68.68 0 0 1-.68.68h-4.653A2.667 2.667 0 0 0 14 16.667v4.654a.68.68 0 0 1-.68.679H12C6.477 22 2 17.523 2 12Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <circle
            cx="12"
            cy="6"
            r="1"
            className="fill-current stroke-current stroke-1"
          />
          <circle
            cx="8"
            cy="8"
            r="1"
            className="fill-current stroke-current stroke-1"
          />
          <circle
            cx="6"
            cy="12"
            r="1"
            className="fill-current stroke-current stroke-1"
          />
          <circle
            cx="8"
            cy="16"
            r="1"
            className="fill-current stroke-current stroke-1"
          />
        </g>
      </symbol>
      <symbol id="puzzle-24" viewBox="0 0 24 24">
        <g className="puzzle">
          <path
            d="M4 5.5A1.5 1.5 0 0 1 5.5 4h11A1.5 1.5 0 0 1 18 5.5V9s4-2 4 3-4 3-4 3v3.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5V15s4 1.5 4-3-4-3-4-3V5.5Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="css-24" viewBox="0 0 24 24">
        <g className="css">
          <path
            d="M6 2h12v6.667L21 12l-3 3.333V22H6v-6.667L3 12l3-3.333V2Z"
            className={`fill-(--icon-fill)`}
          />
          <path
            d="M9 2H7.417a1.5 1.5 0 0 0-1.5 1.5v4.979a.5.5 0 0 1-.124.33L3.288 11.67a.5.5 0 0 0 0 .658l2.505 2.863a.5.5 0 0 1 .124.33V20.5a1.5 1.5 0 0 0 1.5 1.5H9"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M15 2h1.583a1.5 1.5 0 0 1 1.5 1.5v4.979a.5.5 0 0 0 .124.33l2.505 2.862a.5.5 0 0 1 0 .658l-2.505 2.863a.5.5 0 0 0-.124.33V20.5a1.5 1.5 0 0 1-1.5 1.5H15"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="vector-square-24" viewBox="0 0 24 24">
        <g className="vector-square">
          <path
            d="M6 19a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12c0 .552-.442 1-.994 1H6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M7 3H3v4h4V3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M7 17H3v4h4v-4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M21 3h-4v4h4V3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M21 17h-4v4h4v-4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="views-24" viewBox="0 0 24 24">
        <g className="views">
          <g className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}>
            <path
              d="M4 9h4v12H4z"
              className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            />
            <path
              d="M8 5h4v16H8z"
              className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            />
            <path
              d="M12 9h4v12h-4z"
              className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            />
            <path
              d="M16 3h4v18h-4z"
              className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
            />
          </g>
        </g>
      </symbol>
      <symbol id="box-24" viewBox="0 0 24 24">
        <g className="box">
          <path
            d="M5.5 20A1.5 1.5 0 0 1 4 18.5V9h16v9.5a1.5 1.5 0 0 1-1.5 1.5h-13Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M3 9V6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5V9H3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M9 13h6" className="stroke-current stroke-2" />
        </g>
      </symbol>
      <symbol id="square-info-24" viewBox="0 0 24 24">
        <g className="square-info">
          <path
            d="M3.993 21A.994.994 0 0 1 3 20V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16c0 .552-.442 1-.995 1H3.993Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M10 11h2v6" className="stroke-current stroke-2 sl-r" />
          <path d="M10 17h4" className="stroke-current stroke-2 sl-r" />
          <circle
            cx="11.5"
            cy="7.5"
            r=".5"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="close-24" viewBox="0 0 24 24">
        <g className="close">
          <path d="M19 19 5 5" className="stroke-current stroke-2 sl-r" />
          <path d="M19 5 5 19" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <svg id="collections-24" viewBox="0 0 24 24">
        <g className="collections">
          <path
            d="M8 6H3v15h5V6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="m17.812 4.005-4.83 1.294 4.209 15.706 4.83-1.294-4.21-15.706Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M13 3H8v18h5V3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </svg>
      <symbol id="shapes-24" viewBox="0 0 24 24">
        <g className="shapes">
          <circle
            cx="17.5"
            cy="17.5"
            r="3.5"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M10 14H3v7h7v-7Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M8 10h8l-4-7-4 7Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="foundry-24" viewBox="0 0 24 24">
        <g className="foundry">
          <path
            d="M3.993 21A.994.994 0 0 1 3 20V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16c0 .552-.442 1-.995 1H3.993Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M8 9V7h8v2"
            className="fill-none stroke-current stroke-2 slj-r"
          />
          <path
            d="M12 7v9"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M11 17h2"
            className="fill-none stroke-current stroke-2 sl-s"
          />
        </g>
      </symbol>
      <symbol id="bookmark-24" viewBox="0 0 24 24">
        <g className="bookmark">
          <path
            d="M4.5 20A1.5 1.5 0 0 1 3 18.5v-13A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M4 9h10" className="stroke-current stroke-2 sl-r" />
          <path d="M18 9h3" className="stroke-current stroke-2 sl-r" />
          <path
            d="M14 4h4v12l-2-2-2 2V4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="website-24" viewBox="0 0 24 24">
        <g className="website">
          <path
            d="M4.5 20A1.5 1.5 0 0 1 3 18.5v-13A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M4 8h16" className="stroke-current stroke-2 sl-r" />
          <path d="M11 12h6" className="stroke-current stroke-2 sl-r" />
          <path d="M11 15h4" className="stroke-current stroke-2 sl-r" />
          <path
            d="M8 8v11"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="star-square-24" viewBox="0 0 24 24">
        <g className="star-square">
          <path
            d="M4.5 21A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M11.784 6.618a.25.25 0 0 1 .432 0l1.676 2.858a.25.25 0 0 0 .162.118l3.236.71a.25.25 0 0 1 .133.41l-2.2 2.478a.25.25 0 0 0-.062.19l.324 3.298a.25.25 0 0 1-.349.253L12.1 15.606a.25.25 0 0 0-.2 0l-3.036 1.327a.25.25 0 0 1-.349-.253l.324-3.298a.25.25 0 0 0-.062-.19l-2.2-2.477a.25.25 0 0 1 .133-.41l3.236-.711a.25.25 0 0 0 .162-.118l1.676-2.858Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="star-24" viewBox="0 0 24 24">
        <g className="star">
          <path
            d="M11.11 3.231a1 1 0 0 1 1.78 0l2.19 4.263a1 1 0 0 0 .73.53l4.73.766a1 1 0 0 1 .55 1.692l-3.378 3.4a1 1 0 0 0-.278.858l.734 4.736a1 1 0 0 1-1.44 1.045l-4.277-2.161a1 1 0 0 0-.902 0l-4.277 2.16a1 1 0 0 1-1.44-1.045l.734-4.736a1 1 0 0 0-.278-.858l-3.378-3.4a1 1 0 0 1 .55-1.692l4.73-.766a1 1 0 0 0 .73-.53l2.19-4.263Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="clock-reverse-24" viewBox="0 0 24 24">
        <g className="clock-reverse">
          <path
            d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
            className={`fill-(--icon-fill)`}
          />
          <path
            d="M3 9s1.988-2.32 2.727-3.192c.176-.208.382-.436.587-.615C9.1 2.753 13.09 2.237 16.5 4.206a9 9 0 0 1-9 15.588"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path d="m15 15-3-3V8" className="stroke-current stroke-2 sl-r" />
          <path d="M3 5v4h4" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="bulb-24" viewBox="0 0 24 24">
        <g className="bulb">
          <path
            d="M12 2C9 2 6 4 6 8s3 4 3 8v2h6v-2c0-4 3-4 3-8s-3-6-6-6Z"
            className={`fill-(--icon-fill) stroke-current stroke-2`}
          />
          <path d="M9 15h6" className="stroke-current stroke-2" />
          <path
            d="M15 19a3 3 0 1 1-6 0v-1h6v1Z"
            className="fill-none stroke-current stroke-2"
          />
        </g>
      </symbol>
      <symbol id="accessibility-24" viewBox="0 0 24 24">
        <g className="accessibility">
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M12 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
            className="fill-current stroke-current stroke-1 sl-r"
          />
          <path
            d="M16 10s-2.318 1-4 1-4-1-4-1"
            className="stroke-current stroke-2 sl-r"
          />
          <path
            d="M13 11h-2v4h2v-4Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="m11 15-1 3"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="m13 15 1 3"
            className="fill-none stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="publication-24" viewBox="0 0 24 24">
        <g className="publication">
          <path
            d="M4.5 21A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3h15A1.5 1.5 0 0 1 21 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-15Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path
            d="M13.5 12a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
          <path d="M6 8h4" className="stroke-current stroke-2" />
          <path d="M6 12h4" className="stroke-current stroke-2" />
          <path d="M6 16h12" className="stroke-current stroke-2" />
        </g>
      </symbol>
      <symbol id="caret-right-24" viewBox="0 0 24 24">
        <g className="caret-right">
          <path
            d="m17 15-5-8-5 8h10Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="caret-up-24" viewBox="0 0 24 24">
        <g className="caret-up">
          <path
            d="m17 15-5-8-5 8h10Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="caret-left-24" viewBox="0 0 24 24">
        <g className="caret-left">
          <path
            d="m15 7-8 5 8 5V7Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
      <symbol id="caret-down-24" viewBox="0 0 24 24">
        <g className="caret-down">
          <path
            d="m17 9-5 8-5-8h10Z"
            className={`fill-(--icon-fill) stroke-current stroke-2 sl-r`}
          />
        </g>
      </symbol>
    </defs>
  </svg>
)

export default Sprite24
