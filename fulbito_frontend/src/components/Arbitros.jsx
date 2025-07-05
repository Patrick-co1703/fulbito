import { useEffect, useState } from 'react'
import axios from 'axios'

function Arbitros() {
  const [arbitros, setArbitros] = useState([])
  const [nombre, setNombre] = useState('')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    obtenerArbitros()
  }, [])

  const obtenerArbitros = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/arbitros/')
    setArbitros(res.data)
  }

  const crearArbitro = async () => {
    if (!nombre) return
    await axios.post('http://127.0.0.1:8000/api/arbitros/', { nombre })
    setNombre('')
    obtenerArbitros()
  }

  const eliminarArbitro = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/arbitros/${id}/`)
    obtenerArbitros()
  }

  const seleccionarEditar = (arbitro) => {
    setEditando(arbitro.id)
    setNombre(arbitro.nombre)
  }

  const actualizarArbitro = async () => {
    if (!nombre || !editando) return
    await axios.put(`http://127.0.0.1:8000/api/arbitros/${editando}/`, { nombre })
    setEditando(null)
    setNombre('')
    obtenerArbitros()
  }

  return (
    <div>
      <h2>Árbitros</h2>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del árbitro"
      />
      {editando ? (
        <button onClick={actualizarArbitro}>Actualizar</button>
      ) : (
        <button onClick={crearArbitro}>Crear</button>
      )}
      <ul>
        {arbitros.map((a) => (
          <li key={a.id}>
            {a.nombre}
            <button onClick={() => seleccionarEditar(a)}>Editar</button>
            <button onClick={() => eliminarArbitro(a.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Arbitros
