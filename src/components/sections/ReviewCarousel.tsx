'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Review } from '@/content/reviews';
import { ReviewCard } from '@/components/sections/ReviewCard';

const AUTOPLAY_MS = 6000;

export function ReviewCarousel({
  reviews,
  heading,
  autoplay = false,
  label = 'Customer reviews',
}: {
  reviews: Review[];
  heading?: string;
  autoplay?: boolean;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const scrolling = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false });
  const total = reviews.length;

  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Distance between the start of one card and the start of the next (card width plus the flex gap).
  const stepOf = useCallback(() => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!track || !first) return 0;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  }, []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepOf() || 1;
    const atStart = track.scrollLeft <= 1;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const index = atEnd ? total - 1 : Math.min(total - 1, Math.round(track.scrollLeft / step));
    setState((s) => (s.index === index && s.atStart === atStart && s.atEnd === atEnd ? s : { index, atStart, atEnd }));
  }, [stepOf, total]);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const onScroll = () => {
    update();
    // Pause autoplay while the user is scrolling or swiping.
    paused.current = true;
    if (scrolling.current) clearTimeout(scrolling.current);
    scrolling.current = setTimeout(() => { paused.current = false; }, 1500);
  };

  const go = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * stepOf(), behavior: reduced() ? 'auto' : 'smooth' });
  }, [stepOf]);

  useEffect(() => {
    if (!autoplay || reduced()) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || paused.current) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else go(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, go]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };

  const pause = (v: boolean) => () => { paused.current = v; };

  return (
    <section
      className="review-carousel"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={pause(true)}
      onMouseLeave={pause(false)}
      onFocus={pause(true)}
      onBlur={pause(false)}
    >
      {heading && <h2 className="review-carousel-heading">{heading}</h2>}
      <div className="review-track-wrap">
        <div
          className="review-track"
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label={`${label}, scrollable. Use the left and right arrow keys to move between reviews.`}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
        >
          {reviews.map((r, i) => (
            <ReviewCard key={r.id} review={r} clamp group={{ index: i + 1, total }} />
          ))}
        </div>
      </div>
      <div className="review-controls">
        <p className="review-position" aria-live="off">{state.index + 1} of {total}</p>
        <div className="review-buttons">
          <button type="button" className="review-btn" onClick={() => go(-1)} disabled={state.atStart} aria-label="Previous review">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="review-btn" onClick={() => go(1)} disabled={state.atEnd} aria-label="Next review">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
