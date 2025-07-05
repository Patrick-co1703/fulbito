import { useEffect, useState } from "react"
import axios from "axios"

function Equipos() {
  const [equipos, setEquipos] = useState([])
  const [nombre, setNombre] = useState("")
  const [grupo, setGrupo] = useState(1) // ID de grupo de ejemplo
  const [torneo, setTorneo] = useState(1) // ID de torneo de ejemplo

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/equipos/")
      .then(res => setEquipos(res.data))
  }, [])

  const crearEquipo = () => {
    axios.post("http://127.0.0.1:8000/api/equipos/", {
      nombre, grupo, torneo
    }).then(res => {
      setEquipos([...equipos, res.data])
      setNombre("")
    })
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
        {equipos.map(equipo => (
          <li key={equipo.id}>{equipo.nombre}</li>
        ))}
      </ul>
    </div>
  )
}

export default Equipos

