import { useEffect, useState } from 'react'

function Calendario() {
  const [partidos, setPartidos] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/public/calendario/1/')
      .then((res) => res.json())
      .then((data) => setPartidos(data))
  }, [])

  return (
    <div>
      <h2>Calendario de Partidos</h2>
      {partidos.length === 0 ? (
        <p>No hay partidos disponibles.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Equipo Local</th>
              <th>Equipo Visitante</th>
              <th>Cancha</th>
              <th>Árbitro</th>
              <th>Goles Local</th>
              <th>Goles Visitante</th>
            </tr>
          </thead>
          <tbody>
            {partidos.map((partido) => (
              <tr key={partido.id}>
                <td>{new Date(partido.datetime).toLocaleString()}</td>
                <td>{partido.equipo_local_nombre}</td>
                <td>{partido.equipo_visitante_nombre}</td>
                <td>{partido.cancha_nombre}</td>
                <td>{partido.arbitro_nombre}</td>
                <td>{partido.goles_local}</td>
                <td>{partido.goles_visitante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Calendario
