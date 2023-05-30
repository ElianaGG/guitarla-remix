import { useLoaderData } from "@remix-run/react"
import ListadoPosts from "~/components/listado-posts";
import { getPosts } from "~/models/posts.server"

export function meta({ matches }) {
  let rootMeta = matches[0].meta;
  let charset = rootMeta.find((m) => m.charset);
  let viewport = rootMeta.find((m) => m.viewport);

  return [
    charset,
    { title: "GuitarLA - Blog" },
    viewport,
    { name: "description", content: "GuitarLA, Blog de música y venta de guitarras" },
  ];
}

export async function loader() {
  const posts = await getPosts()
  return posts.data
}

function Posts() {
  const posts = useLoaderData()

  return (
      <ListadoPosts
        posts={posts}
      />
  )
}

export default Posts