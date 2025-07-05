import { Navigate } from "react-router-dom"

function RutasPrivadas({ children }) {
  const token = localStorage.getItem("access")
  return token ? children : <Navigate to="/login" />
}

export default RutasPrivadas
