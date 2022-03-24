import { json, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";

import { getPost } from "~/post";

// Instead of creating a route for every single one of our posts, we can use a "dynamic segment" in the url.
// Remix will parse and pass to us so we can look up the post dynamically.
// The part of the filename attached to the $ becomes a named key on the params object that comes into your loader.
// This is how we'll look up our blog post.
export const loader: LoaderFunction = async ({ params }) => {
  // Quick note on this invariant.
  // Because params comes from the URL, we can't be totally sure that params.slug will be defined --
  // maybe you change the name of the file to $postId.ts!
  // It's good practice to validate that stuff with invariant, and it makes TypeScript happy too.
  invariant(params.slug, "expected params.slug");

  return json(await getPost(params.slug));
};

export default function PostSlug() {
  const post = useLoaderData();

  return <main dangerouslySetInnerHTML={{ __html: post.html }} />;
}
