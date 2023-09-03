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
      <symbol id="logo" viewBox="0 0 32 32" fill="none">
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
          <path d="m7 12 2 2-2 2m5 0h3" className="stroke-current stroke-2 fill-none sl-r" />
        </g>
      </symbol>
      <symbol id="pen" viewBox="0 0 24 24">
        <g className="pen">
          <path
            d="M16 22H8c0-3-4-7-4-7l8-13 8 13s-4 4-4 7Z"
            className="fill-white stroke-current stroke-2 sl-r"
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
          <path d="m3 10 9 6 9-6" className="fill-white stroke-current stroke-2 sl-r" />
          <path d="M19 11V4H5v7" className="fill-white stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="person" viewBox="0 0 24 24">
        <g className="person">
          <path
            d="M14.478 14.186V13.8c1.215-.926 2.012-1.813 2.012-3.6V7.5c0-1.556 0-2.777-.905-3.639C14.84 3.151 13.79 3 12.898 3c-.81 0-.898.836-2.215.836-1.833 0-3.186 1.864-3.186 3.625V10.2c0 1.787.796 2.687 2.012 3.6v.373c-.122 1.556-1.256 1.556-2.823 2.018a18.32 18.32 0 0 0-2.106.759C3.62 17.374 3 18.287 3 19.29V21h18v-1.697c0-1.003-.608-1.916-1.58-2.34a19.11 19.11 0 0 0-2.106-.759c-1.567-.463-2.715-.463-2.836-2.018Z"
            className="fill-white stroke-current stroke-2 sl-r"
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
          <path className="fill-white" d="M22 12 8 21v-6l4-3-4-3V3l14 9Z" />
          <path
            className="stroke-current fill-white stroke-2 sl-r"
            d="M22 12 8 21v-6l4-3-4-3V3l14 9Z"
          />
          <path className="stroke-current stroke-2 sl-r" d="M21 12h-9" />
          <rect width="3" height="2" x="2" y="7" className="fill-current" rx="1" />
          <rect width="6" height="2" x="1" y="11" className="fill-current" rx="1" />
          <rect width="3" height="2" x="2" y="15" className="fill-current" rx="1" />
          <path className="stroke-current stroke-2 sl-r" d="M3 8h1M3 16h1M2 12h4" />
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
        <g className="arrow-left">
          <path d="M2 12h20M8 6l-6 6 6 6" className="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 24 24">
        <g className="arrow-right">
          <path d="M22 12H2m14 6 6-6-6-6" className="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-up" viewBox="0 0 24 24">
        <g className="arrow-up">
          <path d="M12 2v20m6-14-6-6-6 6" className="fill-none stroke-current stroke-2 sl-r" />
        </g>
      </symbol>
      <symbol id="arrow-down" viewBox="0 0 24 24">
        <g className="arrow-down">
          <path d="M12 22V2M6 16l6 6 6-6" className="fill-none stroke-current stroke-2 sl-r" />
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
      <symbol id="bmc" viewBox="0 0 24 24" fill="none">
        <g clipPath="url(#a)">
          <path fill="#0D0C22" d="m18.319 6.118-.016-.01-.037-.01a.09.09 0 0 0 .053.02Z" />
          <path fill="#0D0C22" d="m18.326 6.115-.007-.001v.004a.014.014 0 0 0 .007-.003Z" />
          <path
            fill="#0D0C22"
            d="M18.319 6.118h.003v-.002l-.003.002ZM18.536 7.686l.027-.014.01-.005.009-.01a.154.154 0 0 0-.046.03ZM18.365 6.152l-.026-.024-.018-.009c.01.016.025.028.044.033ZM11.783 21.403a.135.135 0 0 0-.053.04l.016-.01.037-.03ZM15.605 20.689c0-.023-.011-.018-.009.061 0-.006.003-.013.004-.019l.005-.042ZM15.209 21.403a.136.136 0 0 0-.053.04l.016-.01.037-.03ZM9.091 21.573a.117.117 0 0 0-.056-.025l.045.022.011.003ZM8.486 21.022a.164.164 0 0 0-.022-.066.53.53 0 0 1 .021.065v.001Z"
          />
          <path
            fill="#FD0"
            d="M12.554 11.163c-.831.338-1.775.722-2.998.722-.512-.001-1.02-.068-1.514-.199l.846 8.253c.03.345.196.667.464.901.267.235.618.365.983.365 0 0 1.199.06 1.6.06.43 0 1.721-.06 1.721-.06.364 0 .715-.13.983-.365.268-.234.433-.556.463-.9l.906-9.12a4.034 4.034 0 0 0-1.274-.22c-.796 0-1.438.261-2.18.563Z"
          />
          <path fill="#0D0C22" d="m5.424 7.642.015.013.009.005a.143.143 0 0 0-.024-.018Z" />
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
    </defs>
  </svg>
)

export default Sprite
