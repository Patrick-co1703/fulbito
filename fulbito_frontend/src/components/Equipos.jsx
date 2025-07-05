import { useEffect, useState } from "react"
import axios from "axios"

function Equipos() {
  const [equipos, setEquipos] = useState([])
  const [nombre, setNombre] = useState("")
  const [grupo, setGrupo] = useState(1) // Puedes cargar dinámicamente si ya tienes endpoint
  const [torneo, setTorneo] = useState(1) // Puedes cargar dinámicamente si ya tienes endpoint

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/equipos/`)
      .then(res => setEquipos(res.data))
      .catch(err => console.error("Error al cargar equipos:", err))
  }, [])

  const crearEquipo = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/equipos/`, {
      nombre,
      grupo,
      torneo,
    })
    .then(res => {
      setEquipos([...equipos, res.data])
      setNombre("")
    })
    .catch(err => console.error("Error al crear equipo:", err))
  }

  return (
    <div>
      <h2>Equipos</h2>

      <input
        type="text"
        placeholder="Nombre del equipo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button onClick={crearEquipo}>Crear</button>

      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>{equipo.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

export default Equipos


