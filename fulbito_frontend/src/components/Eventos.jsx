// src/components/Eventos.jsx
import { useEffect, useState } from "react"

function Eventos() {
  const [eventos, setEventos] = useState([])
  const [nuevoEvento, setNuevoEvento] = useState({
    partido: "",
    tipo_evento: "",
    minuto: "",
    jugador: "",
  })

  const fetchEventos = () => {
    fetch("http://127.0.0.1:8000/api/eventos/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEventos(data))
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  const handleChange = (e) => {
    setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("http://127.0.0.1:8000/api/eventos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify(nuevoEvento),
    })
      .then((res) => res.json())
      .then(() => {
        setNuevoEvento({ partido: "", tipo_evento: "", minuto: "", jugador: "" })
        fetchEventos()
      })
  }

  return (
    <div>
      <h2>Eventos del Partido</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="partido"
          value={nuevoEvento.partido}
          onChange={handleChange}
          placeholder="ID del Partido"
        />
        <input
          name="jugador"
          value={nuevoEvento.jugador}
          onChange={handleChange}
          placeholder="ID del Jugador"
        />
        <input
          name="tipo_evento"
          value={nuevoEvento.tipo_evento}
          onChange={handleChange}
          placeholder="Tipo de Evento (gol, amarilla, etc.)"
        />
        <input
          name="minuto"
          value={nuevoEvento.minuto}
          onChange={handleChange}
          placeholder="Minuto"
        />
        <button type="submit">Agregar Evento</button>
      </form>

      <ul>
        {eventos.map((evento) => (
          <li key={evento.id}>
            Partido {evento.partido} - Jugador {evento.jugador} - {evento.tipo_evento} ({evento.minuto}')
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Eventos
