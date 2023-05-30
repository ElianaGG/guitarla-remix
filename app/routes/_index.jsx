import { useLoaderData } from "@remix-run/react";

import Curso from "~/components/curso";
import ListadoGuitarras from "~/components/listado-guitarras";
import ListadoPosts from "~/components/listado-posts";

import { getCurso } from "~/models/curso.server";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";

import stylesPosts from "~/styles/blog.css"
import stylesCurso from "~/styles/curso.css"
import stylesGuitarras from "~/styles/guitarras.css"

export function links() {
  return [
    { rel: "stylesheet", href: stylesPosts },
    { rel: "stylesheet", href: stylesCurso },
    { rel: "stylesheet", href: stylesGuitarras }
];
}

export async function loader() {
  const [ guitarras, posts, curso ] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso()
  ])

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}

 function Index() {
  const {guitarras, posts, curso} = useLoaderData()

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras 
        guitarras={guitarras}
        />
     </main>
     <section>
        <Curso 
        curso={curso.attributes}
        />
     </section>
     <section className="contenedor">
        <ListadoPosts 
        posts={posts}
        />
     </section>
    </>
  )
}
export default Index