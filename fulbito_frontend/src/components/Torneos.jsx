import { useEffect, useState } from "react"

function Torneos() {
  const [torneos, setTorneos] = useState([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchTorneos()
  }, [])

  const fetchTorneos = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/torneos/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    })
    const data = await res.json()
    setTorneos(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({ nombre, descripcion })
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    }

    if (editingId) {
      await fetch(`http://127.0.0.1:8000/api/torneos/${editingId}/`, {
        method: "PUT",
        headers,
        body,
      })
    } else {
      await fetch("http://127.0.0.1:8000/api/torneos/", {
        method: "POST",
        headers,
        body,
      })
    }

    setNombre("")
    setDescripcion("")
    setEditingId(null)
    fetchTorneos()
  }

  const handleEdit = (torneo) => {
    setNombre(torneo.nombre)
    setDescripcion(torneo.descripcion)
    setEditingId(torneo.id)
  }

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/torneos/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    })
    fetchTorneos()
  }

  return (
    <div>
      <h2>CRUD de Torneos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del torneo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">{editingId ? "Actualizar" : "Crear"}</button>
      </form>

      <ul>
        {torneos.map((torneo) => (
          <li key={torneo.id}>
            {torneo.nombre} - {torneo.descripcion}
            <button onClick={() => handleEdit(torneo)}>Editar</button>
            <button onClick={() => handleDelete(torneo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Torneos
