import { Link, useLocation } from "@remix-run/react"

function Navegation() {
    const location = useLocation()
  return (
    <nav className="navegation">
           <Link to="/" className={location.pathname === "/" ? "active" : ""}>Inicio</Link>
            <Link to="/nosotros" className={location.pathname === "/nosotros" ? "active" : ""}>Nosotros</Link>
            <Link to="/guitarras" className={location.pathname === "/guitarras" ? "active" : ""}>Tienda</Link>
            <Link to="/posts" className={location.pathname === "/posts" ? "active" : ""}>Blog</Link>
    </nav>
  )
}

export default Navegation