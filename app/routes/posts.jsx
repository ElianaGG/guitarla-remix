import { useLoaderData } from "@remix-run/react"
import Post from "~/components/post"
import { getPosts } from "~/models/posts.server"
import styles from "~/styles/blog.css"

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

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const posts = await getPosts()
  return posts.data
}

function Posts() {
  const posts = useLoaderData()

  return (
    <main className="contenedor">
      <h2 className="heading">Blog</h2>
      <div className="blog">
        {posts.map(post =>(
          <Post
            key={post.id}
            post={post.attributes}
          />
        ))}
      </div>
    </main>
  )
}

export default Posts