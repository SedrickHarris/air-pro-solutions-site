// Direct-answer callout: a bold lead phrase followed by explanatory body copy.
export function AnswerBlock({ lead, body, eyebrow = 'Quick answer' }: { lead: string; body: string; eyebrow?: string }) {
  return (
    <section>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <p className="answer-block">
          <strong>{lead}</strong>
          {body}
        </p>
      </div>
    </section>
  );
}
