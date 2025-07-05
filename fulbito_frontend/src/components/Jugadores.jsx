// src/components/Jugadores.jsx
import { useEffect, useState } from "react"

function Jugadores() {
  const [nombre, setNombre] = useState("")
  const [posicion, setPosicion] = useState("")
  const [equipo, setEquipo] = useState("")
  const [equipos, setEquipos] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch("http://127.0.0.1:8000/api/jugadores/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, posicion, equipo })
    })
    setNombre("")
    setPosicion("")
    setEquipo("")
    alert("Jugador agregado")
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/equipos/")
      .then((res) => res.json())
      .then((data) => setEquipos(data))
  }, [])

  return (
    <div>
      <h2>Crear Jugador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Posición"
          value={posicion}
          onChange={(e) => setPosicion(e.target.value)}
        />
        <select value={equipo} onChange={(e) => setEquipo(e.target.value)}>
          <option value="">Seleccione equipo</option>
          {equipos.map((eq) => (
            <option key={eq.id} value={eq.id}>{eq.nombre}</option>
          ))}
        </select>
        <button type="submit">Agregar</button>
      </form>
    </div>
  )
}

export default Jugadores
