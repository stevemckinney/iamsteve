export default function PropsTable({ props }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-reduced">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-02 text-left">
            <th className="px-4 py-2 font-display font-variation-bold text-heading lowercase">
              Prop
            </th>
            <th className="px-4 py-2 font-display font-variation-bold text-heading lowercase">
              Type
            </th>
            <th className="px-4 py-2 font-display font-variation-bold text-heading lowercase">
              Default
            </th>
            <th className="px-4 py-2 font-display font-variation-bold text-heading lowercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-02'}
            >
              <td className="px-4 py-2 font-mono text-code-text whitespace-nowrap">
                {prop.name}
              </td>
              <td className="px-4 py-2 font-mono text-body-80 whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-4 py-2 font-mono text-body-60 whitespace-nowrap">
                {prop.default || '\u2014'}
              </td>
              <td className="px-4 py-2 text-body-80">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
