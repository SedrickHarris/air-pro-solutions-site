import { audienceServicePages } from '@/content/matrix';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return audienceServicePages.filter((p) => p.audience === 'commercial-hvac').map((p) => ({ service: p.service }));
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const p = await params;
  // TODO(copy): commercial-hvac + service page. Copy this folder under other non-residential audiences only when needed.
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
