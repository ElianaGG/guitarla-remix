import { useState, useEffect } from "react";
import { Meta, Links, Outlet, Scripts, LiveReload, useRouteError, isRouteErrorResponse, Link } from "@remix-run/react";
import Footer from "~/components/footer";
import Header from "~/components/header";
import styles from "~/styles/index.css";

export function meta() {
  return [
    { charset: "uft-8" },
    { title: "GuitarLA - Remix" },
    { viewport: "width=device-width, initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function App() {
  const carritoLS = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('carrito')) || []
  const [ carrito, setCarrito ] = useState(carritoLS)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }
  }, [carrito])

  const agregarCarrito = (guitarra) => {
    if(carrito.some(guitarraState => guitarraState.id === guitarra.id )) {
       const carritoActualizado = carrito.map(guitarraState => {
        if(guitarraState.id === guitarra.id){
          guitarraState.cantidad = guitarra.cantidad
        }
          return guitarraState
       })
       setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, guitarra])
    }
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if(guitarraState.id === guitarra.id){
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }

  return (
    <Document>
      <Outlet 
      context={{ 
        carrito,
        agregarCarrito,
        actualizarCantidad,
        eliminarGuitarra
         }}
      />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts/>
        <LiveReload/>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError()
  if(isRouteErrorResponse(error)){
    return ( 
      <Document>
        <h3 className="error">{error.status} {error.statusText}</h3>
        <Link className="error-enlace" to="/">Volver a página principal</Link>
      </Document>
    )
  }
}