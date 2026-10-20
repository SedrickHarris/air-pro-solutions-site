import Image from 'next/image';
import type { ServiceImage } from '@/content/services';
import { Icon } from '@/components/ui/Icon';

// 4:3 media tile placed beside a text-only block (see `.split-media` in globals.css). With `image` it
// renders the real photo; without it, the standard "Photo pending" placeholder tile. The pending tile
// is decorative, so it is hidden from assistive tech and has no alt text.
export function MediaTile({ icon, image, sizes = '(max-width: 920px) 100vw, 40vw' }: { icon: string; image?: ServiceImage; sizes?: string }) {
  if (image) {
    return (
      <div className="split-media-tile">
        <Image src={image.src} alt={image.alt} width={1200} height={900} sizes={sizes} />
      </div>
    );
  }
  return (
    <div className="photo-pending split-media-tile" aria-hidden="true">
      <Icon name={icon} size={32} />
      <span className="photo-tag">Photo pending</span>
    </div>
  );
}
