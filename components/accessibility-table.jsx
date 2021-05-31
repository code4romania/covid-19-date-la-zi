/// Renders the data in a tabular format, for screen reader consumption.
export const AccessibilityTable = (props) => {
  const columnNames = props.columns.map((c) => c.name)
  const dataLength = props.columns[0].data.length
  // Truncate results to last 14 days
  const numRows = Math.min(14, dataLength)
  // If the data is stale, we do not want to show today's info
  const firstIndex = props.isStale ? 1 : 0
  let rows = []

  for (let rowIndex = firstIndex; rowIndex < numRows; ++rowIndex) {
    const cells = columnNames.map((_, columnIndex) => (
      <td key={columnIndex}>
        {props.columns[columnIndex].data[dataLength - rowIndex - 1]}
      </td>
    ))
    const row = <tr key={rowIndex}>{cells}</tr>
    rows.push(row)
  }

  return (
    <table className="is-sr-only">
      <thead>
        <tr>
          {columnNames.map((name) => (
            <th key={name}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}
