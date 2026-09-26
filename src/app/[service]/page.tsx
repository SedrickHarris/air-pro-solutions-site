import { services } from '@/content/services';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const p = await params;
  // TODO(copy): service page at /[service]/
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
