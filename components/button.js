const Button = (theme = 'dandelion', props, forwardedRef) => {
  return (
    <button
      {...props}
      className="button-dandelion font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 active:bg-dandelion-400 rounded-sm transition duration-200 shadow-placed hover:shadow-picked active:shadow-reduced px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)] [--ui-border-color-hover:theme(colors.dandelion.700)]"
      ref={forwardedRef}
    >
      {props.children}
    </button>
  )
}

export default Button
