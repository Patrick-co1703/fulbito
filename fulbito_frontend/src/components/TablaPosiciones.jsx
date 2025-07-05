import { useEffect, useState } from 'react'

function TablaPosiciones() {
  const [tabla, setTabla] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/public/tabla-posiciones/1/')
      .then((res) => res.json())
      .then((data) => setTabla(data))
  }, [])

  return (
    <div>
      <h2>Tabla de Posiciones</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Puntos</th>
            <th>DG</th>
            <th>PJ</th>
            <th>PG</th>
            <th>PE</th>
            <th>PP</th>
            <th>GF</th>
            <th>GC</th>
          </tr>
        </thead>
        <tbody>
          {tabla.map((fila) => (
            <tr key={fila.id}>
              <td>{fila.equipo_nombre}</td>
              <td>{fila.puntos}</td>
              <td>{fila.dg}</td>
              <td>{fila.pj}</td>
              <td>{fila.pg}</td>
              <td>{fila.pe}</td>
              <td>{fila.pp}</td>
              <td>{fila.gf}</td>
              <td>{fila.gc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaPosiciones
