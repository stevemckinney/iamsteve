export default function Button(theme = 'dandelion', ...props) {
  return (
    <button
      className="button-dandelion font-ui text-base/snug lowercase text-dandelion-800 text-center bg-dandelion-300 rounded-sm transition duration-200 shadow-placed hover:shadow-picked px-8 py-3 flex-auto [--ui-border-color:theme(colors.dandelion.600)]"
      {...props}
    >
      {children}
    </button>
  )
}
