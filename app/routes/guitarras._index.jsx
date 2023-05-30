import { useLoaderData } from "@remix-run/react";
import  ListadoGuitarras  from "~/components/listado-guitarras";
import { getGuitarras } from "~/models/guitarras.server";

export function meta({ matches }) {
    let rootMeta = matches[0].meta;
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
  
    return [
      charset,
      { title: "GuitarLA - Tienda de Guitarras" },
      viewport,
      { name: "description", content: "GuitarLA - Nuestra coleccion de Guitarras" },
    ];
  }

export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras.data;
}

function Guitarras() {
  const guitarras = useLoaderData(); 

  return (
    <ListadoGuitarras 
    guitarras={guitarras}
    />
  );
};

export default Guitarras;