const FAQS = [
  {
    q: "Will my twin replace me?",
    a: "No. It extends you. Your twin turns one-way content into a two-way conversation, so learners get more of your thinking and your live time feels even more premium.",
  },
  {
    q: "Is my IP safe?",
    a: "Yes. Your twin answers only from the material you add, within the guardrails you set. We also sign an NDA to protect your content.",
  },
  {
    q: "Can it earn me more?",
    a: "Yes. Learners who enjoy talking to your twin can buy extra minutes. It’s hassle-free, and the earnings come to you.",
  },
  {
    q: "Do I have to manage it all?",
    a: "No. Our team supports you end to end, and you get a dedicated platform admin. If a learner reports an issue after you share your twin, we step in.",
  },
];

/**
 * The homepage FAQ. Native <details>, grouped by `name` so opening one closes the
 * others — no state, and the browser owns the keyboard and screen-reader
 * behaviour.
 */
export function Faq() {
  return (
    <section id="faq" className="sec sec--line home-faq" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="head" data-reveal>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-h">Questions, answered.</h2>
        </div>

        <div className="home-faq-list" data-reveal data-reveal-delay="100">
          {FAQS.map((item, i) => (
            <details key={item.q} name="faq" open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <span className="home-faq-mark" aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
