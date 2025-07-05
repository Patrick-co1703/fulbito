import { useEffect, useState } from 'react'
import axios from 'axios'

function Etapas() {
  const [etapas, setEtapas] = useState([])
  const [nombre, setNombre] = useState('')
  const [torneoId, setTorneoId] = useState('')
  const [torneos, setTorneos] = useState([])

  useEffect(() => {
    obtenerEtapas()
    obtenerTorneos()
  }, [])

  const obtenerEtapas = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/etapas/')
    setEtapas(res.data)
  }

  const obtenerTorneos = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/torneos/')
    setTorneos(res.data)
  }

  const crearEtapa = async () => {
    await axios.post('http://127.0.0.1:8000/api/etapas/', {
      nombre,
      torneo: torneoId,
    })
    setNombre('')
    setTorneoId('')
    obtenerEtapas()
  }

  const eliminarEtapa = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/etapas/${id}/`)
    obtenerEtapas()
  }

  return (
    <div>
      <h2>Gestión de Etapas</h2>
      <input
        type="text"
        placeholder="Nombre de la etapa"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select value={torneoId} onChange={(e) => setTorneoId(e.target.value)}>
        <option value="">Selecciona torneo</option>
        {torneos.map((torneo) => (
          <option key={torneo.id} value={torneo.id}>
            {torneo.nombre}
          </option>
        ))}
      </select>
      <button onClick={crearEtapa}>Crear Etapa</button>

      <ul>
        {etapas.map((etapa) => (
          <li key={etapa.id}>
            {etapa.nombre} - Torneo ID: {etapa.torneo}
            <button onClick={() => eliminarEtapa(etapa.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Etapas
