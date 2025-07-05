import { BrowserRouter, Routes, Route } from "react-router-dom"
import TablaPosiciones from "./components/TablaPosiciones"
import Calendario from "./components/Calendario"
import Equipos from "./components/Equipos"
import Jugadores from "./components/Jugadores"
import JugadorList from "./components/JugadorList"
import Partidos from "./components/Partidos"
import Arbitros from "./components/Arbitros"
import Canchas from "./components/Canchas"
import Grupos from "./components/Grupos"
import Etapas from "./components/Etapas"
import Login from "./components/Login"
import Torneos from "./components/Torneos"
import Eventos from "./components/Eventos"
import RutasPrivadas from "./components/RutasPrivadas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<RutasPrivadas />}>
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/lista-jugadores" element={<JugadorList />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/tabla" element={<TablaPosiciones />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/arbitros" element={<Arbitros />} />
          <Route path="/canchas" element={<Canchas />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/etapas" element={<Etapas />} />
          <Route path="/torneos" element={<Torneos />} />
          <Route path="/eventos" element={<Eventos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
