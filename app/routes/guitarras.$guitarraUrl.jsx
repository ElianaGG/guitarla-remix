import { useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { getGuitarra } from "~/models/guitarras.server";

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

function Guitarras() {
  const { agregarCarrito } = useOutletContext()
  const [ cantidad, setCantidad ] = useState(0)
  const guitarra = useLoaderData();
  
  const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes;
  
  const handleSubmit = e=> {
    e.preventDefault();
    if(cantidad < 1){
      alert("Debes seleccionar una cantidad")
      return
    }
    const guitarrasSeleccionadas = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }
    agregarCarrito(guitarrasSeleccionadas)
  }

  return (
  <div className="guitarra">
    <img 
    className="imagen" 
    src={imagen.data.attributes.url} 
    alt={`Imagen de la guitarra ${nombre}`} 
    />
    <div className="contenido">
      <h3>{nombre}</h3>
      <p className="texto">{descripcion}</p>
      <p className="precio">${precio}</p>

      <form onSubmit={handleSubmit} className="formulario">
        <select 
          onChange={ e => setCantidad(+e.target.value)}
          id="cantidad">
          <option value="0">-- Seleccionar cantidad --</option>
          <option value="1">1</option> 
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>    
        </select>
        <input 
        type="submit"
        value="Agregar al carrito"
        />
      </form>
    </div>
  </div>)
}

export default Guitarras;
