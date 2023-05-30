import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import { formatDate } from "~/utils/helpers";

export function meta({ matches, data }) {
    let rootMeta = matches[0].meta;
    let charset = rootMeta.find((m) => m.charset);
    let viewport = rootMeta.find((m) => m.viewport);
  
    return [
      charset,
      { title: `GuitarLA - ${data.data[0].attributes.titulo} `},
      viewport,
      { name: "description", content: `GuitarLA, Blog de música y venta de guitarras ${data.data[0].attributes.titulo}` },
    ];
  }

export async function loader({ params }) {
  const { postUrl } = params;
  const post = await getPost(postUrl);

  if (post.data.length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Post no encontrado",
    });
  }
  return post;
}

function Posts() {
  const post = useLoaderData();

  const { titulo, contenido, imagen, publishedAt } = post.data[0].attributes;

  return (
    <article className="post mt-3">
      <img
        className="imagen"
        src={imagen.data.attributes.url}
        alt={`imagen blog ${titulo}`}
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formatDate(publishedAt)}</p>
        <p className="texto">{contenido}</p>
      </div>
    </article>
  );
}

export default Posts;
