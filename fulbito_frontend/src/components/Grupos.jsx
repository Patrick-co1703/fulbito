import { useEffect, useState } from "react"
import axios from "axios"

function Grupos() {
  const [grupos, setGrupos] = useState([])
  const [nombre, setNombre] = useState("")
  const [etapaId, setEtapaId] = useState("")
  const [etapas, setEtapas] = useState([])

  useEffect(() => {
    fetchGrupos()
    fetchEtapas()
  }, [])

  const fetchGrupos = async () => {
    const res = await axios.get("http://localhost:8000/api/grupos/")
    setGrupos(res.data)
  }

  const fetchEtapas = async () => {
    const res = await axios.get("http://localhost:8000/api/etapas/")
    setEtapas(res.data)
  }

  const crearGrupo = async () => {
    await axios.post("http://localhost:8000/api/grupos/", {
      nombre,
      etapa: etapaId,
    })
    setNombre("")
    setEtapaId("")
    fetchGrupos()
  }

  const eliminarGrupo = async (id) => {
    await axios.delete(`http://localhost:8000/api/grupos/${id}/`)
    fetchGrupos()
  }

  return (
    <div>
      <h2>Grupos</h2>
      <input
        type="text"
        placeholder="Nombre del grupo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select
        value={etapaId}
        onChange={(e) => setEtapaId(e.target.value)}
      >
        <option value="">Selecciona una etapa</option>
        {etapas.map((etapa) => (
          <option key={etapa.id} value={etapa.id}>{etapa.nombre}</option>
        ))}
      </select>
      <button onClick={crearGrupo}>Crear</button>

      <ul>
        {grupos.map((grupo) => (
          <li key={grupo.id}>
            {grupo.nombre} - Etapa ID: {grupo.etapa}
            <button onClick={() => eliminarGrupo(grupo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Grupos
