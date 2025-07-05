// src/components/JugadorList.jsx
import { useEffect, useState } from "react"

function JugadorList() {
  const [jugadores, setJugadores] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/jugadores/")
      .then((res) => res.json())
      .then((data) => setJugadores(data))
  }, [])

  return (
    <div>
      <h2>Jugadores</h2>
      <ul>
        {jugadores.map((j) => (
          <li key={j.id}>
            {j.nombre} - {j.posicion} - Equipo ID: {j.equipo}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JugadorList
