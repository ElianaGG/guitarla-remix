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
  return (
    <Document>
      <Outlet />
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