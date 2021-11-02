import './Table.css'

function Table({ countries }) {
  return (
    <div>
      {countries?.length > 0 && (
        <div className="table">
          {countries.map(({ country, cases }) => (
            <tr>
              <td>{country}</td>
              <td><strong>{cases}</strong></td>
            </tr>
          ))}
        </div>
      )}
    </div>
  )
}

export default Table
