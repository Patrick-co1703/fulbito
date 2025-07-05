import { useEffect, useState } from 'react'

function EquipoList() {
  const [equipos, setEquipos] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/equipos/')
      .then((res) => res.json())
      .then((data) => setEquipos(data))
  }, [])

  return (
    <div>
      <h2>Listado de Equipos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Grupo</th>
          </tr>
        </thead>
        <tbody>
          {equipos.map((equipo) => (
            <tr key={equipo.id}>
              <td>{equipo.nombre}</td>
              <td>{equipo.grupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EquipoList
