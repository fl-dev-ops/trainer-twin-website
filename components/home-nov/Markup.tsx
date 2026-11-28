/* Generated from the November homepage mock (TrainerTwin November Homepage artifact).
   The Spotlight and ReadyDate pieces are React components; the rest is static markup
   that behaviors.ts wires up. */
import { ReadyDate } from "./ReadyDate";
import { Spotlight } from "./Spotlight";

export function Markup() {
  return (
    <>
<section className="hero" id="twin">
  <div className="wrap">
    <header className="top">
      <div className="brand"><img src="/home-nov/tt-mark.png" alt="" width="18" height="18" />TrainerTwin</div>
      <nav aria-label="Sections">
        <a href="#partners" data-go="partners">Who&apos;s exploring</a>
        <a href="#uses" data-go="uses">Use cases</a>
        <a href="#build" data-go="build">Build your twin</a>
        <a href="#team" data-go="team">Team</a>
      </nav>
      <a className="top-cta" href="#build" data-go="build">Build my demo</a>
    </header>

    <div className="hero-main">
    <div className="lead">
      <p className="eyebrow">For coaches, trainers and professors</p>
      <h1>Meet your <span className="hl">AI twin</span> in 7&nbsp;days.</h1>
      <div className="pitch">
        <p>We build your demo from your public courses, videos, books or posts.</p>
        <a className="cta" href="#build" data-go="build">Build my free demo</a>
        <ul className="assure"><li><svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3L13 4.5" /></svg>No private content needed</li><li><svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5l3.2 3L13 4.5" /></svg>Your IP stays yours</li></ul>
      </div>
      <div className="logos">
        <b>Part of</b>
        <span className="mark"><img src="/home-nov/partners/microsoft.png" alt="" width="53" height="52" />Microsoft for Startups</span>
        <i className="bar" aria-hidden="true"></i>
        <span className="mark"><img src="/home-nov/partners/aws.png" alt="" width="62" height="38" />AWS Activate</span>
        <i className="bar" aria-hidden="true"></i>
        <span className="mark"><img src="/home-nov/partners/nvidia.png" alt="" width="108" height="72" />NVIDIA Inception</span>
        <i className="bar" aria-hidden="true"></i>
        <span className="mark"><img className="word" src="/home-nov/partners/startup-india.png" alt="Startup India" width="322" height="72" /></span>
      </div>
    </div>

    <div className="stage">
      <figure className="solo">
        <div className="screen-slot" id="screen-slot"><div className="screen has-video" id="screen"><button type="button" className="pin-x" id="pin-x" aria-label="Put the video back" hidden><svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"><path d="M3 3l6 6M9 3l-6 6"/></svg></button>
          <video id="tt-video" src="/home-nov/trainertwin-video.mp4" poster="/home-nov/trainertwin-video-poster.jpg" controls playsInline preload="metadata" width="1280" height="720"></video>
          <button type="button" className="cover warm" id="tt-cover" aria-label="Play: see how TrainerTwin works, 2 minutes">
            <span className="cover-brand"><img src="/home-nov/tt-mark.png" alt="" width="240" height="238" />TrainerTwin</span>
            <span className="cover-big-play" aria-hidden="true"><svg className="play-caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336m-5.293 4.953a1 1 0 0 0 -1.707 .707v6c0 .217 .07 .433 .21 .613l.083 .094a1 1 0 0 0 1.414 0l3 -3a1 1 0 0 0 0 -1.414z" /></svg><svg className="play-tri" viewBox="0 0 24 24" width="34" height="34"><path d="M8 5v14l11-7z" fill="currentColor"></path></svg></span>
            <span className="cover-title">See how TrainerTwin works</span>
            <span className="cover-chapters"><span>Build</span><i></i><span>Calibrate</span><i></i><span>Deploy</span><i></i><span>Real coaches</span></span>
            <span className="cover-len">2 min</span>
            <span className="cover-mini"><b>How TrainerTwin works</b><small><span className="live-dot" aria-hidden="true"></span>2 min · Tap to watch</small></span>
          </button>
        </div></div>
      </figure>
    </div>
    </div>
  </div>
</section>

<div className="pop" id="pop" hidden role="dialog" aria-modal="true" aria-label="See how TrainerTwin works">
  <div className="pop-box">
    <button type="button" className="pop-x" id="pop-x" aria-label="Close the video"><svg viewBox="0 0 12 12" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 3l6 6M9 3l-6 6"/></svg></button>
    <div className="pop-slot" id="pop-slot"></div>
  </div>
</div>

<section className="coaches" id="partners">
  <div className="wrap">
    <h2>Coaches around the world are exploring their twins.</h2>
  </div>

  <div className="wrap">
    <Spotlight />
  </div>

  <div className="wrap told">
    <h3>What they&apos;ve told us</h3>
    <div className="notes">
      <figure className="note">
        <div className="shot pic-shot"><img src="/home-nov/notes/olga-whatsapp.jpg" alt="WhatsApp message from Olga: I finished 2 sessions. Feels good enough to be honest." width="876" height="260" /></div>
        <figcaption><div className="av" aria-hidden="true"><img src="/home-nov/coaches/olga-sinenko.jpg" alt="" /></div><div><b>Olga Sinenko</b><small>Real-estate sales coach · Dubai, calibrating her twin</small></div></figcaption>
      </figure>
      <figure className="note">
        <div className="shot pic-shot"><div className="wa"><p className="wa-msg">The analysis is very good.<span className="wa-time">5:26 pm</span></p></div></div>
        <figcaption><div className="av" aria-hidden="true"><img src="/home-nov/notes/prathosh-avatar.jpg" alt="" /></div><div><b>Prathosh A P</b><small>Assoc. Prof., IISc / IITD, on our coaching method</small></div></figcaption>
      </figure>
      <figure className="note">
        <div className="shot pic-shot"><div className="wa"><p className="wa-msg">You have created an interesting product…<span className="wa-time">8:22 PM</span></p></div></div>
        <figcaption><div className="av" aria-hidden="true"><img src="/home-nov/notes/gopal-avatar.jpg" alt="" /></div><div><b>Gopal RajGuru</b><small>Sales, leadership &amp; negotiation coach</small></div></figcaption>
      </figure>
      <figure className="note">
        <blockquote className="shot said">“So I usually work with a twin… just send a screenshot of the chat with the buyer, and then the twin is replying what should be next.”</blockquote>
        <figcaption><div className="av" aria-hidden="true">E</div><div><b>E.</b><small>Learner using Olga&apos;s twin</small></div></figcaption>
      </figure>
    </div>
  </div>
</section>

<section className="uses" id="uses">
  <div className="wrap">
    <h2>What coaches are exploring with their twins</h2>
    <p className="uses-sub">These are the ways coaches, trainers and professors are exploring their twins with us.</p>
    <div className="usecase">
      <div className="uc-list" id="uc-list" role="tablist" aria-label="Ways coaches use their twins"></div>
      <p className="uc-lead" id="uc-lead"></p>
      <div className="uc-stage" id="uc-stage" aria-live="polite"></div>
    </div>
    <div className="idea">
      <span className="idea-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 13a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z" /><path d="M15 13a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z" /><path d="M4 15v-3a8 8 0 0 1 16 0v3" /></svg></span>
      <div className="idea-text"><b>Have a different idea for your twin?</b><span>We’d be happy to explore it with you.</span></div>
      <a className="cta idea-go" href="#build" data-go="build">Tell us your idea</a>
    </div>
  </div>
</section>

<section className="build" id="build">
  <div className="wrap">
    <div className="build-row">
      <div className="build-lead">
        <h2>What would you want your twin to handle?</h2>
        <p>We&apos;ll build it and get it to you by <ReadyDate />.</p>
      </div>
      <div className="panel">
        <form id="form" noValidate>
          <div className="hp" aria-hidden="true"><label htmlFor="tt-company">Leave this empty</label><input id="tt-company" name="company_website" type="text" tabIndex={-1} autoComplete="off" /></div>
          <div className="q">
            <span className="lab-row"><span className="label">Who is your twin for?</span><span className="ib-wrap"><button type="button" className="ib" aria-expanded="false" aria-controls="info-1" aria-label="Why we ask">i</button><p className="ib-tip" id="info-1" hidden>We shape your twin’s tone and examples around the people it will talk to.</p></span></span>
            <div className="jobs" id="who"></div>
          </div>
          <div className="q">
            <span className="lab-row"><span className="label">What should they be able to do with it?</span><span className="ib-wrap"><button type="button" className="ib" aria-expanded="false" aria-controls="info-2" aria-label="Why we ask">i</button><p className="ib-tip" id="info-2" hidden>This tells us what to set up in your demo: answering questions, role-play, feedback or support between sessions.</p></span></span>
            <div className="jobs" id="jobs"></div>
          </div>
          <div className="q">
            <span className="lab-row"><label htmlFor="tt-link">To build your twin, where can we find your work?</label><span className="ib-wrap"><button type="button" className="ib" aria-expanded="false" aria-controls="info-4" aria-label="Why we ask">i</button><p className="ib-tip" id="info-4" hidden>Your twin learns from what you’ve already shared in public, such as your website, LinkedIn, YouTube, podcast or course. For the demo we only use public material, and your IP stays yours.</p></span></span>
            <input id="tt-link" type="url" placeholder="Website, LinkedIn, YouTube, podcast or course" />
            <div className="hint">One link is enough to begin.</div>
          </div>
          <div className="q">
            <span className="lab-row"><label htmlFor="tt-contact">Where should we send your demo?</label><span className="ib-wrap"><button type="button" className="ib" aria-expanded="false" aria-controls="info-5" aria-label="Why we ask">i</button><p className="ib-tip" id="info-5" hidden>We only use these to send you your demo and book your walkthrough. No newsletters, no sharing.</p></span></span>
            <input id="tt-contact" type="text" autoComplete="email" placeholder="Email or WhatsApp" aria-label="Email or WhatsApp" />
          </div>
          <div className="send">
            <button className="cta" type="submit">Build my free demo</button>
            <p>We&apos;ll build it and get it to you by <ReadyDate />.</p>
          </div>
          <p className="form-error" id="form-error" role="alert" hidden></p>
          <p className="consent">By sending this, you agree to our <a href="/privacy">privacy policy</a>.</p>
        </form>
        <div className="done" id="done" hidden>
          <button type="button" className="back" id="back-form"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>Back to my answers</button>
          <div className="done-head">
            <h3>Your twin is on its way.</h3>
            <p>It will be ready on <ReadyDate />. Pick a time that day or a few days after, and we&apos;ll show it to you.</p>
          </div>
          <ol className="strip" id="strip" aria-label="The next 7 days"></ol>
          <div className="calendly-embed" id="calendly-embed" hidden></div>
          <div className="slots-wrap" id="slots-wrap">
            <div className="daypick" id="daypick" role="group" aria-label="Pick a day"></div>
            <div className="slots-head">
              <p className="slots-label">Times on <b id="slots-day"><ReadyDate /></b></p>
              <label className="tz-pick"><span>Time zone</span><select id="tz-select"></select></label>
            </div>
            <div className="slots" id="slots"></div>
            <button type="button" className="cta book" id="book" disabled>Book this time</button>
            <p className="form-error" id="book-error" role="alert" hidden></p>
          </div>
          <div className="booked" id="booked" hidden>
            <p className="booked-line">Booked: <b id="booked-when"></b>. We&apos;ll show you your twin then.</p>
            <button type="button" className="back" id="back-time"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>Change the time</button>
            <a className="cal-add" id="cal-add" href="https://calendar.google.com/calendar/render?action=TEMPLATE" target="_blank" rel="noopener"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5" /></svg>Add it to Google Calendar</a>
          </div>
        </div>
      </div>
    </div>
    <form className="doubts" id="doubts" noValidate>
      <div className="doubts-head"><span className="doubts-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" /><path d="M12 19l0 .01" /></svg></span><p className="doubts-title">Still having doubts?</p></div>
      <p className="doubts-sub">Share your email or WhatsApp. We&apos;ll get back within 24&nbsp;hrs.</p>
      <div className="doubts-row" id="doubts-row">
        <input id="tt-doubt" type="text" placeholder="Email or WhatsApp" aria-label="Your email or WhatsApp" />
        <button type="submit" className="doubts-send">Send</button>
      </div>
      <p className="doubts-thanks" id="doubts-thanks" hidden>Thanks. We&apos;ll get back within 24&nbsp;hrs.</p>
    </form>
    </div>
</section>

<section className="team" id="team">
  <div className="wrap">
    <h2>The team behind TrainerTwin.</h2>
  </div>
  <div className="cf" id="cf" aria-roledescription="carousel" aria-label="The TrainerTwin team">
    <div className="cf-stage" id="cf-stage">
      <a className="cf-card" href="https://www.linkedin.com/in/shyamanandaraman/" target="_blank" rel="noopener" data-i="0" aria-label="Shanmuga Anandaraman"><img src="/home-nov/team/shyam-anandaraman.jpg" alt="" draggable={false} /><span className="cf-tag">Co-founder &amp; CEO</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/harini-shekar/" target="_blank" rel="noopener" data-i="1" aria-label="Harini Shekar"><img src="/home-nov/team/harini-shekar.jpg" alt="" draggable={false} /><span className="cf-tag">Co-founder &amp; CTO</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/dharshini-jenefer-b8445398/" target="_blank" rel="noopener" data-i="2" aria-label="Dharshini Jenefer"><img src="/home-nov/team/dharshini-jenefer.jpg" alt="" draggable={false} /><span className="cf-tag">Head of Partnerships</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/catherine-nivedha-7a27811b0/" target="_blank" rel="noopener" data-i="3" aria-label="Catherine Nivedha"><img src="/home-nov/team/catherine-nivedha.jpg" alt="" draggable={false} /><span className="cf-tag">Growth &amp; Product</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/lalithlogs/" target="_blank" rel="noopener" data-i="4" aria-label="Lalith Kumar"><img src="/home-nov/team/lalith-kumar.jpg" alt="" draggable={false} /><span className="cf-tag">GTM Engineer</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/suryaumapathy2812/" target="_blank" rel="noopener" data-i="5" aria-label="Surya Umapathy"><img src="/home-nov/team/surya-umapathy.jpg" alt="" draggable={false} /><span className="cf-tag">Founding AI Engineer</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/in/bhuvanui/" target="_blank" rel="noopener" data-i="6" aria-label="Bhuvan T"><img src="/home-nov/team/bhuvan-t.jpg" alt="" draggable={false} /><span className="cf-tag">Founding Designer</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
      <a className="cf-card" href="https://www.linkedin.com/company/trainertwin-by-forever-learning/" target="_blank" rel="noopener" data-i="7" aria-label="Sandhya Shanmuga Sundaram"><img src="/home-nov/team/sandhya.jpg" alt="" draggable={false} /><span className="cf-tag">Admin &amp; HR</span><span className="cf-in" aria-hidden="true"><span>in</span>LinkedIn</span></a>
    </div>
    <button type="button" className="cf-arrow" id="cf-prev" aria-label="Previous person"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button><button type="button" className="cf-arrow" id="cf-next" aria-label="Next person"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>
    <div className="cf-cap" aria-live="polite">
      <b id="cf-name"></b>
      <span id="cf-role"></span>
      <a id="cf-li" className="cf-li" href="#" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.13V21h-4v-5c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.64V21h-4z"/></svg></a>
    </div>
  </div>
</section>

<section className="vision" id="vision">
  <div className="wrap">
    <p className="vision-kicker">Our vision</p>
    <p className="vision-line">Imagine every great coach and every great trainer in the world, accessible to <span>every learner who needs them.</span></p>
  </div>
</section>

<footer className="end">
  <div className="wrap foot">
    <span>© 2026 TrainerTwin.com</span>
    <span className="foot-links"><a href="https://wa.me/919500181597" target="_blank" rel="noopener">WhatsApp us</a><a href="/privacy">Privacy policy</a></span>
  </div>
</footer>


    </>
  );
}
