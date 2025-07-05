import { useEffect, useState } from 'react'

function Canchas() {
  const [canchas, setCanchas] = useState([])
  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    obtenerCanchas()
  }, [])

  const obtenerCanchas = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/canchas/')
    const data = await res.json()
    setCanchas(data)
  }

  const guardarCancha = async (e) => {
    e.preventDefault()

    const cancha = {
      nombre,
      direccion,
    }

    if (editId) {
      await fetch(`http://127.0.0.1:8000/api/canchas/${editId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cancha),
      })
      setEditId(null)
    } else {
      await fetch('http://127.0.0.1:8000/api/canchas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cancha),
      })
    }

    setNombre('')
    setDireccion('')
    obtenerCanchas()
  }

  const editarCancha = (cancha) => {
    setEditId(cancha.id)
    setNombre(cancha.nombre)
    setDireccion(cancha.direccion)
  }

  const eliminarCancha = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/canchas/${id}/`, {
      method: 'DELETE',
    })
    obtenerCanchas()
  }

  return (
    <div>
      <h2>Canchas</h2>
      <form onSubmit={guardarCancha}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <ul>
        {canchas.map((cancha) => (
          <li key={cancha.id}>
            {cancha.nombre} - {cancha.direccion}
            <button onClick={() => editarCancha(cancha)}>Editar</button>
            <button onClick={() => eliminarCancha(cancha.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Canchas
