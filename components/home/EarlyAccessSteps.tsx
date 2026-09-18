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

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
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
            type="url"
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

        <div className="ea-actions">
          <Button variant="strong" size="xl" type="submit" className="ea-go">
            Request early access
          </Button>
        </div>
      </div>
    </form>
  );
}
