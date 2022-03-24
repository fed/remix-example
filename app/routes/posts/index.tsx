// If your background is with MVC web frameworks like Rails,
// you can think of your Remix routes as backend views using React for templating,
// but then they know how to seamlessly hydrate in the browser to add some flair
// instead of writing detached jQuery code to dress up the user interactions.
// It's progressive enhancement realized in its fullest.
// Additionally, your routes are their own controller.

import { json, Link, useLoaderData } from "remix";

import { getPosts } from "~/post";
import type { Post } from "~/post";

export type Post = {
  slug: string;
  title: string;
};

// Loaders are the backend "API" for their component and it's already wired up for you through useLoaderData.
export const loader = async () => json(await getPosts());

export default function Posts() {
  const posts = useLoaderData<Post[]>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
