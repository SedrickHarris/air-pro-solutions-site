import { matrixPages } from '@/content/matrix';

// Static export: only these params are generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return matrixPages;
}

export default async function Page({ params }: { params: Promise<{ service: string; city: string }> }) {
  const p = await params;
  // TODO(copy): service + city matrix page at /[service]/[city]-ca/ (must pass the quality gate in content/matrix.ts)
  return <div>{/* TODO: {JSON.stringify(p)} */}</div>;
}
