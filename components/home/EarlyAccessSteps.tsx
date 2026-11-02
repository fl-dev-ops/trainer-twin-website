"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { MultiSelect } from "@/components/MultiSelect";

/**
 * Invite CTA for the v3 footer: one flat form, Linear-style fields.
 * Home / v1 do not mount this.
 */
const ROLES = [
  { value: "coach", label: "1:1 Coach / Mentor" },
  { value: "cohort", label: "Cohort / Course Trainer" },
  { value: "corporate", label: "Corporate Trainer" },
  { value: "educator", label: "Educator / Teacher" },
  { value: "creator", label: "Creator / YouTuber" },
  { value: "consultant", label: "Consultant / Subject-matter Expert" },
  { value: "sales", label: "Sales Leader / Sales Trainer" },
  { value: "other", label: "Other" },
] as const;

const GOALS = [
  {
    value: "teach",
    label: "Teach my courses / lessons without recording every time",
  },
  {
    value: "videos",
    label: "Create short videos / explainers in my teaching style",
  },
  { value: "answer", label: "Answer learner questions using my knowledge" },
  { value: "coach", label: "Coach / mentor people 1:1 when I’m unavailable" },
  { value: "practice", label: "Let learners practice / roleplay with me" },
  { value: "feedback", label: "Give personalised feedback to learners" },
  { value: "community", label: "Talk with my followers / community" },
  { value: "sell", label: "Help prospects understand my offering / sell" },
  { value: "team", label: "Train my team / employees" },
  { value: "other", label: "Other" },
] as const;

const EARNINGS = [
  { value: "one-to-one", label: "Paid 1:1 sessions" },
  { value: "cohorts", label: "Paid cohorts / workshops" },
  { value: "courses", label: "Course sales" },
  { value: "consulting", label: "Consulting" },
  { value: "corporate", label: "Corporate contracts" },
  { value: "sponsorship", label: "Sponsorships / creator revenue" },
  { value: "subscription", label: "Subscription / community" },
  { value: "commissions", label: "Sales commissions / revenue" },
  { value: "not-yet", label: "I don’t currently monetise it" },
  { value: "private", label: "Prefer not to say" },
] as const;

/** "Choose up to three" — the cap the counter under the list reports against. */
const GOAL_MAX = 3;

export function EarlyAccessSteps() {
  const [roles, setRoles] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [earnings, setEarnings] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData(event.currentTarget);
    // Ensure MultiSelect values are appended if not already present
    if (!formData.has("role")) roles.forEach((r) => formData.append("role", r));
    if (!formData.has("earnings")) earnings.forEach((earn) => formData.append("earnings", earn));
    if (!formData.has("goals")) goals.forEach((g) => formData.append("goals", g));

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't submit your details. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="ea" style={{ textAlign: "center", padding: "var(--tt-space-12) var(--tt-space-6)" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: "999px",
            background: "var(--tt-success-subtle)",
            color: "var(--tt-success)",
            margin: "0 auto var(--tt-space-4)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.5 8.5l3 3 6-7" />
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--tt-font-display)",
            fontSize: 24,
            lineHeight: 1.2,
            margin: "0 0 var(--tt-space-2)",
            color: "var(--tt-text-primary)",
          }}
        >
          Request received!
        </h3>
        <p
          style={{
            fontFamily: "var(--tt-font-ui)",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--tt-text-secondary)",
            maxWidth: "42ch",
            margin: "0 auto",
          }}
        >
          Thanks for sharing your details. We’ll follow up with a founding brief and demo slot within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="ea-form"
      aria-labelledby="early-access-step-title"
    >
      <div className="ea">
        <p id="early-access-step-title" className="ea-kicker">
          We&rsquo;d love to know more!
        </p>

        <div className="ea-fields">
          <Input
            name="name"
            label="Your name"
            required
            autoComplete="name"
            placeholder="Aditi Sharma"
          />

          <fieldset className="ea-group">
            <legend className="sr-only">How can we reach you?</legend>
            <div className="ea-row">
              <Input
                name="email"
                label="Your email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
              <Input
                name="mobile"
                label="Mobile"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98400 12345"
              />
            </div>
          </fieldset>

          <Input
            name="links"
            label="Links: website, LinkedIn or YouTube"
            type="text"
            autoComplete="url"
            placeholder="yoursite.com, linkedin.com/in/…, youtube.com/@…"
          />

          <MultiSelect
            name="role"
            label="Which best describes you?"
            options={ROLES}
            value={roles}
            onChange={setRoles}
            placeholder="Choose all that apply"
          />

          <MultiSelect
            name="earnings"
            label="How do you earn from your expertise today?"
            options={EARNINGS}
            value={earnings}
            onChange={setEarnings}
            placeholder="Choose all that apply"
          />

          <MultiSelect
            name="goals"
            label="What would you want your Twin to do?"
            options={GOALS}
            value={goals}
            onChange={setGoals}
            max={GOAL_MAX}
            placeholder="Choose up to three"
          />
        </div>

        <div className="ea-actions" style={{ flexDirection: "column", alignItems: "stretch", gap: "var(--tt-space-3)" }}>
          {submitError ? (
            <p role="alert" className="font-ui text-[13px] text-danger text-center">
              {submitError}
            </p>
          ) : null}
          <Button
            variant="strong"
            size="xl"
            type="submit"
            disabled={submitting}
            className="ea-go"
          >
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}
