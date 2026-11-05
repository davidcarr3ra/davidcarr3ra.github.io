import { useEffect, useRef, useState } from 'react';
import { VIEWS, blockLength, viewLength } from './content.js';

/* Typed view transitions, after unfoldlabs.xyz's router: on a view change the
 * current copy deletes itself character by character behind a caret, then the
 * new copy types in. Direct loads type the copy in too. A new target mid-way
 * interrupts and retargets from wherever the text currently is. */

const TYPE_CPS = 220; // characters/second typing in
const TYPE_CPS_FAST = 400; // quicker for long copy
const DELETE_CPS = 520; // characters/second deleting
const DELETE_CPS_FAST = 1400; // faster wipe of long copy
const LONG = 200; // characters; above this a view counts as long copy

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Drives { view, chars, caret } toward `target` (a VIEWS key, or null for empty).
export function useTypewriter(target) {
  const [state, setState] = useState({ view: null, chars: 0, caret: false });
  const current = useRef(state);
  const gen = useRef(0);

  useEffect(() => {
    const myGen = ++gen.current;
    const alive = () => myGen === gen.current;
    const set = (s) => {
      current.current = s;
      setState(s);
    };

    // animate `view`'s visible character count from `from` to `to`
    const run = (view, from, to, cps) =>
      new Promise((resolve) => {
        let start;
        const tick = (ts) => {
          if (!alive()) return resolve(false);
          start ??= ts;
          const step = Math.floor(((ts - start) / 1000) * cps);
          const chars = to >= from ? Math.min(to, from + step) : Math.max(to, from - step);
          const done = chars === to;
          set({ view, chars, caret: !done });
          if (done) return resolve(true);
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });

    (async () => {
      const { view, chars } = current.current;
      if (reducedMotion()) {
        set({ view: target, chars: viewLength(target), caret: false });
        return;
      }
      if (view && view !== target) {
        const cps = viewLength(view) > LONG ? DELETE_CPS_FAST : DELETE_CPS;
        if (!(await run(view, chars, 0, cps))) return; // superseded mid-delete
      }
      if (!target) {
        set({ view: null, chars: 0, caret: false });
        return;
      }
      const total = viewLength(target);
      const from = view === target ? chars : 0; // retargeted back mid-type: carry on
      await run(target, from, total, total > LONG ? TYPE_CPS_FAST : TYPE_CPS);
    })();

    return () => {
      gen.current++; // cancel on unmount / before the next run
    };
  }, [target]);

  return state;
}

// Type `text` in once on mount, after `delay` ms: { chars, caret }, the same
// rAF loop as the view transitions (and as Unfold's on-load typing). It waits
// while `enabled` is false, and starts over whenever an argument changes; bump
// `replay` to rerun it as is.
export function useTypeOnce(text, cps, delay = 0, replay = 0, enabled = true) {
  const [state, setState] = useState(() =>
    reducedMotion() ? { chars: text.length, caret: false } : { chars: 0, caret: false },
  );
  useEffect(() => {
    if (reducedMotion() || !enabled) return;
    setState({ chars: 0, caret: false });
    let raf;
    let start;
    const tick = (ts) => {
      start ??= ts;
      const chars = Math.min(text.length, Math.floor(((ts - start) / 1000) * cps));
      const done = chars === text.length;
      setState({ chars, caret: !done }); // caret off on the final frame
      if (!done) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => (raf = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, cps, delay, replay, enabled]);
  return state;
}

// Render the first `chars` characters of a view, with the caret at the end.
export function TypedView({ view, chars, caret }) {
  if (!view) return null;
  const out = [];
  let items = [];
  let left = chars;
  const blocks = VIEWS[view];
  const flushList = () => {
    if (items.length) out.push(<ul key={`ul-${out.length}`}>{items}</ul>);
    items = [];
  };

  for (let i = 0; i < blocks.length && (left > 0 || i === 0); i++) {
    const block = blocks[i];
    const len = blockLength(block);
    const shown = Math.min(len, Math.max(0, left));
    const caretHere = caret && left <= len;
    let budget = shown;
    const parts = block.parts.map((part, j) => {
      const text = part.text.slice(0, Math.max(0, budget));
      budget -= part.text.length;
      if (!text) return null;
      if (part.href) {
        return (
          <a key={j} href={part.href} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      }
      if (part.muted) {
        return (
          <span key={j} className="muted">
            {text}
          </span>
        );
      }
      return <span key={j}>{text}</span>;
    });
    const content = (
      <>
        {parts}
        {caretHere && <span className="caret" />}
      </>
    );
    if (block.type === 'li') {
      items.push(<li key={i}>{content}</li>);
    } else {
      flushList();
      out.push(<p key={i}>{content}</p>);
    }
    left -= len;
    if (caretHere) break;
  }
  flushList();
  return out;
}
