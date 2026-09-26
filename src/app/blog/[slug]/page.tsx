// TODO(data): PLACEHOLDER slug so the export has one param. Replace with real posts.
const posts = [{ slug: 'placeholder-post' }];

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return posts;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  // TODO(copy): blog post
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
