import { useLoaderData } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server";
import styles from "~/styles/guitarras.css"

export async function loader({ params }) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if(guitarra.data.length === 0){
    throw new Response("", {
      status: 404,
      statusText: "Guitarra no encontrada"
    })
  }
  return guitarra;
}

export function meta({ matches, data }) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.viewport);

  return [
    charset,
    { title: `GuitarLA - ${data.data[0].attributes.nombre} `},
    viewport,
    { name: "description", content: `Guitarras, ventas de guitarras, guitarra ${data.data[0].attributes.nombre}` },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Guitarra() {
  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;

  return (
  <main className="contenedor guitarra">
    <img className="imagen" src={imagen.data.attributes.url} alt="{`Imagen de la guitarra ${nombre}`}" />
    <div className="contenido">
      <h3>{nombre}</h3>
      <p className="texto">{descripcion}</p>
      <p className="precio">${precio}</p>
    </div>
  </main>)
}

export default Guitarra;