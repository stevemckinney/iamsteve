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
      <symbol id="search" viewBox="0 0 24 24">
        <g className="search">
          <path d="m19 19 1 1" className="stroke-current stroke-4 sl-r" />
          <path d="m17 17 1 1" className="stroke-current stroke-4 sl-s" />
          <path
            d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="design" viewBox="0 0 24 24">
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
      <symbol id="code" viewBox="0 0 24 24">
        <g className="code">
          <path
            d="M3.993 20A.994.994 0 0 1 3 19V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v14c0 .552-.442 1-.995 1H3.993Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="m7 12 2 2-2 2m5 0h3" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="pen" viewBox="0 0 24 24">
        <g className="pen">
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7Z"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7ZM12 2v12"
            className="fill-none stroke-current stroke-2 sl-r"
          />
          <circle cx={12} cy={14} r={1} className="fill-current stroke-current stroke-2 sl-r" />
          <path d="M7 22h10" className="fill-none stroke-current stroke-2 sl-s" />
        </g>
      </symbol>
      <symbol id="clipboard" viewBox="0 0 24 24">
        <g className="clipboard">
          <rect
            width={16}
            height={18}
            x={4}
            y={4}
            className="fill-white stroke-current stroke-2 sl-r"
            rx={1}
          />
          <path d="M8 4h8v3H8z" className="fill-current stroke-current stroke-2 sl-r" />
          <circle cx={12} cy={3} r={2} className="stroke-current stroke-2 sl-r fill-white" />
        </g>
      </symbol>
      <symbol id="clipboard-success" viewBox="0 0 24 24">
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
            <path d="M8 4h8v3H8z" className="fill-current stroke-current sw-2 sl-r" />
            <path d="m7 14 3 3 7-7" className="fill-fern-300" />
            <circle cx={12} cy={3} r={2} className="stroke-current stroke-2 sl-r fill-white" />
          </g>
        </g>
      </symbol>
      <symbol id="envelope" viewBox="0 0 24 24">
        <g className="envelope">
          <path d="m12 2-9 8v11h18V10l-9-8Z" className="fill-white stroke-current stroke-2 sl-r" />
          <path d="M5 4h14v6h2l-9 6-9-6h2V4Z" className="fill-white" />
          <path d="m3 10 9 6 9-6" className="stroke-current stroke-2 sl-r" />
          <path d="M19 11V4H5v7" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="person" viewBox="0 0 24 24">
        <g className="person">
          <path
            d="M14.478 14.186V13.8c1.215-.926 2.012-1.813 2.012-3.6V7.5c0-1.556 0-2.777-.905-3.639C14.84 3.151 13.79 3 12.898 3c-.81 0-.898.836-2.215.836-1.833 0-3.186 1.864-3.186 3.625V10.2c0 1.787.796 2.687 2.012 3.6v.373c-.122 1.556-1.256 1.556-2.823 2.018a18.32 18.32 0 0 0-2.106.759C3.62 17.374 3 18.287 3 19.29V21h18v-1.697c0-1.003-.608-1.916-1.58-2.34a19.11 19.11 0 0 0-2.106-.759c-1.567-.463-2.715-.463-2.836-2.018Z"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="home" viewBox="0 0 24 24">
        <g className="home">
          <path d="m2 12 10-9 10 9m-7 1H9v8h6v-8Z" className="path" />
          <path d="M4 11v10h5.333v-7.93h5.334V21H20V11m-10 9h4" className="path" />
        </g>
      </symbol>
      <symbol id="airplane" viewBox="0 0 24 24">
        <g className="airplane">
          <path d="M22 12 8 21v-6l4-3-4-3V3l14 9Z" className="fill-current" />
          <path
            d="M22 12 8 21v-6l4-3-4-3V3l14 9Zm-1 0h-9"
            className="stroke-current stroke-2 sl-r"
          />
          <rect width={3} height={2} x={2} y={7} className="stroke-current stroke-2 sl-r" rx={1} />
          <rect width={6} height={2} x={1} y={11} className="stroke-current stroke-2 sl-r" rx={1} />
          <rect width={3} height={2} x={2} y={15} className="stroke-current stroke-2 sl-r" rx={1} />
          <path d="M3 8h1m-1 8h1m-2-4h4" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="timer" viewBox="0 0 24 24">
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
          <path d="M6 17.5 5 21m13-3.5 1 3.5" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="bee" viewBox="0 0 24 24">
        <g className="bee">
          <path d="M10 6c0-3-1-4-4-4m8 4c0-3 1-4 4-4" className="stroke-current stroke-2 sl-r" />
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            className="fill-current stroke-current stroke-2 sl-r"
          />
          <path
            d="M12 21a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            className="fill-dandelion-100 stroke-current stroke-2 sl-r"
          />
          <path d="M7 12c3.871 1.341 6.058 1.325 10 0" className="path" />
          <path d="M7 16c3.871 1.341 6.058 1.325 10 0" className="stroke-current stroke-2 sl-r" />
          <path
            d="M22 17.667A8.667 8.667 0 0 0 13.333 9H12v1.333A8.667 8.667 0 0 0 20.667 19c.736 0 1.333-.597 1.333-1.333Zm-20 0A8.667 8.667 0 0 1 10.667 9H12v1.333A8.667 8.667 0 0 1 3.333 19 1.333 1.333 0 0 1 2 17.667Z"
            className="fill-dandelion-0 stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="folder" viewBox="0 0 24 24">
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
      <symbol id="arrow-left" viewBox="0 0 24 24">
        <g className="arrow / left">
          <path d="M2 12h20M8 6l-6 6 6 6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 24 24">
        <g className="arrow / right">
          <path d="M22 12H2m14 6 6-6-6-6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-up" viewBox="0 0 24 24">
        <g className="arrow / up">
          <path d="M12 2v20m6-14-6-6-6 6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-down" viewBox="0 0 24 24">
        <g className="arrow / down">
          <path d="M12 22V2M6 16l6 6 6-6" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="settings" viewBox="0 0 24 24">
        <g className="settings">
          <path d="M8 9v12" className="stroke-current stroke-2 sl-r" />
          <circle cx={8} cy={6} r={3} className="fill-white stroke-current stroke-2 sl-r" />
          <path d="M16 3v12" className="stroke-current stroke-2 sl-r" />
          <circle cx={16} cy={18} r={3} className="fill-white stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="external" viewBox="0 0 24 24">
        <g className="external">
          <path
            d="M9 15 21 3m-6 0h6v6M9 3H4.5A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V15"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="navigation" viewBox="0 0 24 24">
        <g className="navigation">
          <path d="M21 5H3m18 14H3" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="note" viewBox="0 0 24 24">
        <g className="note">
          <path
            d="M5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10.52a1 1 0 0 1 .78.375l3.48 4.351a1 1 0 0 1 .22.625V19a2 2 0 0 1-2 2H5Z"
            className="fill-white stroke-current stroke-2 sl-r"
          />
          <path d="M15 3v5h5M8 13h8m-8 4h8" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="link" viewBox="0 0 24 24">
        <g className="link">
          <path
            d="m18.364 13.207 1.768-1.768a5 5 0 1 0-7.071-7.07l-2.829 2.828a5 5 0 0 0 0 7.07 6.81 6.81 0 0 0 1.633 1.197m-6.229-3.671L3.868 13.56a5 5 0 0 0 7.071 7.07l2.829-2.828a5 5 0 0 0 0-7.07 6.796 6.796 0 0 0-1.633-1.197"
            className="stroke-current stroke-2 sl-r"
          />
        </g>
      </symbol>
      <symbol id="frame" viewBox="0 0 24 24">
        <g className="frame">
          <path d="M6 6h12v12H6z" className="fill-white" />
          <path d="M3 6h18M6 3v18M18 3v18M3 18h18" className="stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="cursor" viewBox="0 0 24 24">
        <g className="cursor">
          <path d="m4 4 18 6-9 3-3 9L4 4Z" className="fill-white stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="calendar" viewBox="0 0 24 24">
        <g className="calendar">
          <rect
            width={20}
            height={16}
            x={2}
            y={4}
            className="fill-current stroke-current stroke-2 sl-r"
            rx={1}
          />
          <rect width={18} height={12} x={3} y={7} className="fill-white" rx={0.5} />
          <rect width={2} height={2} x={5} y={15} className="fill-current" rx={1} />
          <rect width={2} height={2} x={5} y={12} className="fill-current" rx={1} />
          <rect width={2} height={2} x={8} y={15} className="fill-current" rx={1} />
          <rect width={2} height={2} x={8} y={12} className="fill-current" rx={1} />
          <rect width={2} height={2} x={8} y={9} className="fill-current" rx={1} />
          <rect width={2} height={2} x={11} y={15} className="fill-current" rx={1} />
          <rect width={2} height={2} x={14} y={15} className="fill-current" rx={1} />
          <rect width={2} height={2} x={11} y={12} className="fill-current" rx={1} />
          <rect width={2} height={2} x={11} y={9} className="fill-current" rx={1} />
          <rect width={2} height={2} x={14} y={12} className="fill-current" rx={1} />
          <rect width={2} height={2} x={17} y={12} className="fill-current" rx={1} />
          <rect width={2} height={2} x={14} y={9} className="fill-current" rx={1} />
          <rect width={2} height={2} x={17} y={9} className="fill-current" rx={1} />
        </g>
      </symbol>
      <symbol id="copy" viewBox="0 0 24 24">
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
    </defs>
  </svg>
)

export default Sprite
