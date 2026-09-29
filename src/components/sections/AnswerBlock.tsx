import Image from 'next/image';
import Link from 'next/link';
import type { ServiceImage } from '@/content/services';

export type AnswerBlockCtas = {
  primaryLabel: string;
  primaryHref: string;
  phoneLabel: string;
  phoneHref: string;
};

// Direct-answer callout: a bold lead phrase followed by explanatory body copy. When `ctas` and/or
// `image` are supplied, renders as a two-column layout (copy + buttons left, image right); with
// neither, renders as the original single-column text block, unchanged for every other caller.
export function AnswerBlock({
  lead,
  body,
  eyebrow = 'Quick answer',
  dark = false,
  ctas,
  image,
}: {
  lead: string;
  body: string;
  eyebrow?: string;
  dark?: boolean;
  ctas?: AnswerBlockCtas;
  image?: ServiceImage;
}) {
  const copy = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <p className="answer-block">
        <strong>{lead}</strong>
        {body}
      </p>
      {ctas && (
        <div className="cta-row">
          <Link className="btn btn-primary" href={ctas.primaryHref}>{ctas.primaryLabel}</Link>
          <a className={dark ? 'btn btn-ghost' : 'btn btn-outline'} href={ctas.phoneHref}>{ctas.phoneLabel}</a>
        </div>
      )}
    </>
  );

  if (!image) {
    return (
      <section className={dark ? 'answer-block-dark' : undefined}>
        <div className="wrap">{copy}</div>
      </section>
    );
  }

  return (
    <section className={dark ? 'answer-block-dark' : undefined}>
      <div className="wrap answer-grid">
        <div>{copy}</div>
        <div className="answer-block-img">
          <Image src={image.src} alt={image.alt} width={800} height={600} sizes="(max-width: 920px) 100vw, 40vw" />
        </div>
      </div>
    </section>
  );
}
