import { cities } from '@/content/cities';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const p = await params;
  // TODO(copy): city page at /service-areas/[city]-ca/
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
