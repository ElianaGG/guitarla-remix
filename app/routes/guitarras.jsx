import { useLoaderData } from "@remix-run/react"
import {getGuitarras} from "~/models/guitarras.server"
import Guitarra from "~/components/guitarra"
import styles from "~/styles/guitarras.css"

export function meta({ matches }) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.viewport);

  return [
    charset,
    { title: "GuitarLA - Tienda de guitarras" },
    viewport,
    { name: "description", content: "Nuestra colección de guitarras" },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const guitarras = await getGuitarras()
  return guitarras.data
}

function Guitarras() {
  const guitarras = useLoaderData() 

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra colección</h2>

      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map( guitarra =>(
            <Guitarra
            key={guitarra?.id}
            guitarra={guitarra?.attributes}
            />
          ) )}
        </div>
      )}
    </main>
  )
}

export default Guitarras
