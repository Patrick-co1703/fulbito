import { useEffect, useState } from 'react'

function Partidos() {
  const [partidos, setPartidos] = useState([])
  const [formulario, setFormulario] = useState({
    equipo_local: '',
    equipo_visitante: '',
    cancha: '',
    etapa: '',
    fecha_hora: '',
  })

  const obtenerPartidos = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/partidos/')
    const data = await res.json()
    setPartidos(data)
  }

  useEffect(() => {
    obtenerPartidos()
  }, [])

  const crearPartido = async () => {
    await fetch('http://127.0.0.1:8000/api/partidos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
    setFormulario({
      equipo_local: '',
      equipo_visitante: '',
      cancha: '',
      etapa: '',
      fecha_hora: '',
    })
    obtenerPartidos()
  }

  return (
    <div>
      <h2>Partidos</h2>

      <input
        type="text"
        placeholder="Equipo local"
        value={formulario.equipo_local}
        onChange={(e) => setFormulario({ ...formulario, equipo_local: e.target.value })}
      />
      <input
        type="text"
        placeholder="Equipo visitante"
        value={formulario.equipo_visitante}
        onChange={(e) => setFormulario({ ...formulario, equipo_visitante: e.target.value })}
      />
      <input
        type="text"
        placeholder="Cancha"
        value={formulario.cancha}
        onChange={(e) => setFormulario({ ...formulario, cancha: e.target.value })}
      />
      <input
        type="text"
        placeholder="Etapa"
        value={formulario.etapa}
        onChange={(e) => setFormulario({ ...formulario, etapa: e.target.value })}
      />
      <input
        type="datetime-local"
        value={formulario.fecha_hora}
        onChange={(e) => setFormulario({ ...formulario, fecha_hora: e.target.value })}
      />

      <button onClick={crearPartido}>Crear Partido</button>

      <ul>
        {partidos.map((partido) => (
          <li key={partido.id}>
            {partido.equipo_local} vs {partido.equipo_visitante} - {partido.fecha_hora}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Partidos
