import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PageFooter } from "@/components/home/PageFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | TrainerTwin",
  description:
    "How TrainerTwin and Forever Learning handle personal information, training recordings, AI inference, and learner data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-line bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" aria-label="TrainerTwin home">
            <Logo size={22} />
          </Link>
          <a
            href="mailto:support@trainertwin.com"
            className="font-ui text-sm text-ink-secondary transition-colors hover:text-ink"
          >
            Contact Privacy Team
          </a>
        </div>
      </header>

      <main id="top" className="flex-1 bg-canvas">
        <article className="mx-auto max-w-3xl px-6 py-14 font-ui text-ink-secondary md:py-20">
          <header className="border-b border-line pb-8">
            <h1 className="font-display text-[40px] leading-tight font-semibold tracking-[-0.02em] text-ink md:text-[52px]">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-ink-tertiary">
              Effective Date: 29 September 2026 &bull; Version 2.0
            </p>
          </header>

          <div className="mt-10 flex flex-col gap-10 text-[15px] leading-7">
            <section aria-labelledby="introduction">
              <h2 id="introduction" className="mb-3 font-display text-2xl font-semibold text-ink">
                1. Overview and Scope
              </h2>
              <p>
                TrainerTwin (&ldquo;TrainerTwin&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
                is operated by Forever Learning. TrainerTwin provides an interactive AI coaching,
                simulation, and mock practice platform that allows educators, bootcamps, placement
                academies, and sales organizations (&ldquo;Trainers&rdquo; or &ldquo;Organizations&rdquo;)
                to build customized AI digital twins and assign interactive practice sessions to their learners
                (&ldquo;Learners&rdquo;).
              </p>
              <p className="mt-3">
                This Privacy Policy explains how we collect, use, disclose, and safeguard personal information
                across our primary website (<code>trainertwin.com</code>), user dashboards (<code>dash.trainertwin.com</code>),
                authentication portals (<code>auth.trainertwin.com</code>), and dedicated organization learner portals.
              </p>
              <div className="mt-4 rounded-lg border border-line bg-surface-raised p-4 text-sm text-ink">
                <p className="font-semibold text-ink">Roles Under Data Protection Laws:</p>
                <p className="mt-1 text-ink-secondary">
                  &bull; <strong>When you visit our website or manage an account:</strong> TrainerTwin is the <em>Data Controller</em> of your information.
                </p>
                <p className="mt-1 text-ink-secondary">
                  &bull; <strong>When a Learner participates in an assigned session:</strong> The Trainer or Organization that assigned the session is the <em>Data Controller</em>, and TrainerTwin acts as the <em>Data Processor</em> (or Service Provider) operating under their instructions.
                </p>
              </div>
            </section>

            <section aria-labelledby="collection">
              <h2 id="collection" className="mb-3 font-display text-2xl font-semibold text-ink">
                2. Information We Collect
              </h2>
              <p>We collect information in several ways depending on your interaction with the platform:</p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong className="text-ink">Account &amp; Profile Data:</strong> Full name, email address, password,
                  organization affiliation, and billing contact details when you register as a Trainer, request a demo,
                  or accept an invitation.
                </li>
                <li>
                  <strong className="text-ink">Google Single Sign-On (OAuth):</strong> If you authenticate using Google,
                  we access your basic Google account profile information (specifically your name, verified email address,
                  and public profile picture) through Google Identity services. We use this data solely to authenticate your
                  identity and verify your authorization to access assigned practice sessions. <em>We do not request, read,
                  or access your private Google Drive files, Gmail messages, contacts, or other Google workspace data.</em>
                </li>
                <li>
                  <strong className="text-ink">Trainer Knowledge &amp; Training DNA:</strong> Curriculum materials, syllabus
                  documents, technical guides, interview questions, rubrics, and video transcripts uploaded by Trainers to
                  ground and instruct their AI twin.
                </li>
                <li>
                  <strong className="text-ink">Practice Session Audio, Video &amp; Transcripts:</strong> When Learners engage
                  in live practice sessions, we process audio streams, video frames, real-time speech recognition transcripts,
                  code submissions, text messages, and rubric evaluations.
                </li>
                <li>
                  <strong className="text-ink">Technical &amp; Telemetry Data:</strong> IP address, browser type and version,
                  operating system, network connection diagnostics (round-trip latency, jitter, packet loss for WebRTC streaming),
                  referring URLs, and system interaction logs.
                </li>
                <li>
                  <strong className="text-ink">Cookies &amp; Local Storage:</strong> We use secure, cross-subdomain HTTP cookies
                  and local storage to maintain session authentication, remember preferences, and analyze website usage via
                  privacy-respecting analytics tools (PostHog and Google Analytics).
                </li>
              </ul>
            </section>

            <section aria-labelledby="ai-processing">
              <h2 id="ai-processing" className="mb-3 font-display text-2xl font-semibold text-ink">
                3. AI Processing and Model Training Commitment
              </h2>
              <p>
                We believe trust and privacy are paramount when building AI-powered training twins. We operate under strict
                principles regarding how your data interacts with artificial intelligence models:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-ink">No Public Model Training:</strong> We do <em>not</em> sell your personal data.
                  We do <em>not</em> use your private practice session recordings, video/audio streams, resumes, evaluation transcripts,
                  or proprietary trainer knowledge base materials to train or fine-tune generalized, publicly accessible AI models
                  without your explicit, opt-in written consent.
                </li>
                <li>
                  <strong className="text-ink">Enterprise Inference Isolation:</strong> AI reasoning and speech generation during
                  practice turns are performed via enterprise API agreements with foundational model providers. These enterprise
                  arrangements include strict contractual data protection terms, data isolation, and zero-retention / ephemeral
                  processing terms where available.
                </li>
                <li>
                  <strong className="text-ink">Deterministic Grounding:</strong> TrainerTwin operates using knowledge-grounded
                  runtime architectures. Your trainer materials are stored in secure, tenant-isolated vector and relational databases
                  to verify facts during role-play, not to expose content to public web crawlers.
                </li>
              </ul>
            </section>

            <section aria-labelledby="use-of-info">
              <h2 id="use-of-info" className="mb-3 font-display text-2xl font-semibold text-ink">
                4. How We Use Your Information
              </h2>
              <p>We process personal data for legitimate business and educational purposes, including:</p>
              <ul className="mt-3 list-disc space-y-2 pl-6">
                <li>Delivering low-latency, real-time voice and video role-play coaching sessions.</li>
                <li>Generating accurate speech-to-text transcripts, qualitative feedback, and quantitative performance scoring.</li>
                <li>Providing Trainers and Organizations with learner cohort analytics, assessment reports, and completion statuses.</li>
                <li>Authenticating users, preventing link piracy, and enforcing organization-specific access restrictions.</li>
                <li>Monitoring system health, network latency, media stream reliability, and security integrity.</li>
                <li>Responding to support tickets and communicating critical product updates.</li>
              </ul>
            </section>

            <section aria-labelledby="sharing-disclosure">
              <h2 id="sharing-disclosure" className="mb-3 font-display text-2xl font-semibold text-ink">
                5. How We Share and Disclose Information
              </h2>
              <p>We do not sell, rent, or trade your personal information. Information is shared only with:</p>
              <ul className="mt-3 list-disc space-y-3 pl-6">
                <li>
                  <strong className="text-ink">Your Trainer or Organization:</strong> Because practice sessions are assigned
                  by an educational institution or employer, your assigned instructor and authorized workspace administrators
                  have direct access to your session recordings, transcripts, rubrics, and feedback reports.
                </li>
                <li>
                  <strong className="text-ink">Authorized Infrastructure Sub-processors:</strong> We work with trusted third-party
                  vendors who provide essential services subject to rigorous data confidentiality agreements:
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>Vercel:</strong> Edge hosting, serverless compute, routing
                    </span>
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>Amazon Web Services (AWS):</strong> Encrypted cloud storage (S3) &amp; databases
                    </span>
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>LiveKit:</strong> Real-time WebRTC voice &amp; video transport
                    </span>
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>ChromaDB / PostgreSQL:</strong> Encrypted vector &amp; relational data
                    </span>
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>Resend:</strong> Transactional email &amp; session notifications
                    </span>
                    <span className="rounded border border-line bg-surface p-2 text-xs">
                      <strong>PostHog &amp; Google Analytics:</strong> Telemetry &amp; product performance
                    </span>
                  </div>
                </li>
                <li>
                  <strong className="text-ink">Legal and Regulatory Requirements:</strong> We may disclose information if required
                  by a valid legal process, court order, or governmental regulation, or when necessary to protect the security, safety,
                  and rights of TrainerTwin, our users, or the public.
                </li>
                <li>
                  <strong className="text-ink">Business Transfers:</strong> In the event of a merger, acquisition, restructuring,
                  or sale of company assets, customer information may be transferred as a business asset, subject to the terms of this
                  Privacy Policy.
                </li>
              </ul>
            </section>

            <section aria-labelledby="data-retention">
              <h2 id="data-retention" className="mb-3 font-display text-2xl font-semibold text-ink">
                6. Data Retention and Deletion
              </h2>
              <p>
                We retain personal information for as long as necessary to fulfill the purposes outlined in this policy or as
                mandated by your organization&apos;s agreement.
              </p>
              <p className="mt-2">
                When an account is closed or a Trainer deletes a cohort workspace, associated session recordings, audio logs,
                and transcripts are queued for permanent deletion from our active systems and production databases in accordance
                with standard data retention schedules. You may submit an account deletion request at any time by contacting
                support@trainertwin.com.
              </p>
            </section>

            <section aria-labelledby="security">
              <h2 id="security" className="mb-3 font-display text-2xl font-semibold text-ink">
                7. Information Security
              </h2>
              <p>
                We implement industry-standard administrative, physical, and technical safeguards designed to protect personal
                data from unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-6">
                <li>End-to-end transport layer encryption (HTTPS / TLS 1.3) for all web and API traffic.</li>
                <li>AES-256 encryption for data at rest, including database backups and media storage.</li>
                <li>Role-based access controls (RBAC) and least-privilege administrative access policies.</li>
                <li>Cryptographically signed session cookies and multi-tenant organization isolation.</li>
              </ul>
            </section>

            <section aria-labelledby="global-rights">
              <h2 id="global-rights" className="mb-3 font-display text-2xl font-semibold text-ink">
                8. Your Global Privacy Rights (GDPR &amp; Global Standards)
              </h2>
              <p>
                Depending on your location (including the European Economic Area, United Kingdom, and Switzerland), you may
                hold statutory rights regarding your personal data:
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-6">
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
                <li><strong>Right to Erasure:</strong> Request the deletion of your personal data (&ldquo;Right to be Forgotten&rdquo;).</li>
                <li><strong>Right to Restrict or Object:</strong> Restrict or object to the processing of your data under certain conditions.</li>
                <li><strong>Right to Data Portability:</strong> Receive your personal data in a structured, commonly used machine-readable format.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please email{" "}
                <a className="text-ink underline underline-offset-4 hover:text-primary" href="mailto:support@trainertwin.com">
                  support@trainertwin.com
                </a>. If you are a Learner whose access is governed by an Organization, we may direct your inquiry to your
                institution&apos;s administrator.
              </p>
            </section>

            <section aria-labelledby="us-state-rights">
              <h2 id="us-state-rights" className="mb-3 font-display text-2xl font-semibold text-ink">
                9. United States State Privacy Rights (CCPA / CPRA)
              </h2>
              <p>
                Residents of California, Virginia, Colorado, and other US states with comprehensive privacy legislation hold
                additional rights regarding their personal information:
              </p>
              <p className="mt-2">
                <strong>Notice of Non-Sale:</strong> TrainerTwin does not sell your personal information, nor do we share or
                disclose personal information for cross-context behavioral advertising. We do not use or disclose sensitive
                personal information for purposes other than providing the requested services.
              </p>
            </section>

            <section aria-labelledby="children">
              <h2 id="children" className="mb-3 font-display text-2xl font-semibold text-ink">
                10. Children&apos;s Privacy
              </h2>
              <p>
                TrainerTwin is designed for adult learners, university students, job candidates, and industry professionals.
                Our services are not directed to children under 13 years of age (or under 16 in certain jurisdictions), and we do
                not knowingly collect personal information from children. If we learn that we have inadvertently collected
                information from a child under the minimum legal age, we will take immediate steps to delete such data.
              </p>
            </section>

            <section aria-labelledby="updates">
              <h2 id="updates" className="mb-3 font-display text-2xl font-semibold text-ink">
                11. Updates to this Policy
              </h2>
              <p>
                We may periodically update this Privacy Policy to reflect enhancements to our service, changes in legal obligations,
                or updates to our infrastructure. When material updates occur, we will revise the &ldquo;Effective Date&rdquo; at the
                top of this page and provide notice through our platform or via email where appropriate.
              </p>
            </section>

            <section aria-labelledby="contact" className="border-t border-line pt-8">
              <h2 id="contact" className="mb-3 font-display text-2xl font-semibold text-ink">
                12. Contact Information
              </h2>
              <p>
                If you have questions, feedback, or data privacy requests regarding this policy or our data practices, please reach out to:
              </p>
              <div className="mt-3 text-sm text-ink-secondary">
                <p className="font-semibold text-ink">Forever Learning / TrainerTwin Data Protection</p>
                <p className="mt-1">
                  Email:{" "}
                  <a className="text-ink underline underline-offset-4 hover:text-primary" href="mailto:support@trainertwin.com">
                    support@trainertwin.com
                  </a>
                </p>
                <p>Website: https://www.trainertwin.com</p>
              </div>
            </section>
          </div>
        </article>
      </main>

      <PageFooter hideCta layout="v3" />
    </>
  );
}
