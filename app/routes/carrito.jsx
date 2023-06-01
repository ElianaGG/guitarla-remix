import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import { useOutletContext } from "@remix-run/react";
import styles from "~/styles/carrito.css";
import imagen from "../../public/img/eliminar.png"

export function meta({ matches, data }) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.viewport);

  return [
    charset,
    { title: `GuitarLA - Carrito de compra` },
    viewport,
    {
      name: "description",
      content: "Guitarras, ventas de guitarras, carrito de compra",
    },
  ];
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

function Carrito() {
  const [total, setTotal] = useState(0);
  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad * producto.precio,
      0
    );
    setTotal(calculoTotal);
  }, [carrito]);

  return (
    <ClientOnly fallback={"cargando.."}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {carrito?.length === 0
                ? "Carrito vacío"
                : carrito.map((producto) => (
                    <div key={producto.id} className="producto">
                      <div>
                        <img
                          src={producto.imagen}
                          alt={`Imagen de la guitarra ${producto.nombre}`}
                        />
                      </div>
                      <div>
                        <p className="nombre">{producto.nombre}</p>
                        <p className="precio">
                          Precio: <span>${producto.precio}</span>
                        </p>
                        <p className="cantidad">
                          Cantidad:
                          <select
                            className="select"
                            value={producto.cantidad}
                            onChange={(e) =>
                              actualizarCantidad({
                                cantidad: +e.target.value,
                                id: producto.id,
                              })
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </p>
                        <p className="subtotal">
                          Subtotal:{" "}
                          <span>${producto.cantidad * producto.precio}</span>
                        </p>
                      </div>
                      <button
                        className="btn-eliminar"
                        type="button"
                        onClick={() => eliminarGuitarra(producto.id)}
                      >
                        <img src={imagen} alt="eliminar" />
                      </button>
                    </div>
                  ))}
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;
