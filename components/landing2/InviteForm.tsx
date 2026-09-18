"use client";

import { Button } from "@/components/Button";

/**
 * The two details the invite asks for, and the button that sends them.
 *
 * A real form rather than loose inputs, so Enter submits from either field and
 * a browser can fill and remember the pair. There is nowhere to send it yet —
 * `onSubmit` only stops the browser navigating away with the values in the
 * query string, which is what an actionless form would otherwise do. Wire the
 * submit to the real endpoint when there is one.
 */
export function InviteForm(props: React.HTMLAttributes<HTMLFormElement>) {
  return (
    <form
      {...props}
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full max-w-[440px] flex-col items-stretch gap-3"
    >
      <Field
        name="contact"
        label="Email or phone"
        inputMode="email"
        autoComplete="email"
      />
      <Field
        name="profile"
        label="LinkedIn or website"
        inputMode="url"
        autoComplete="url"
      />

      {/* The system button. On the night scope `strong` flips to
          white-on-night by the same polarity rule it follows in dark theme, so
          the footer variant comes free rather than being a fifth hand-roll
          (§14.5). */}
      <Button type="submit" variant="strong" size="md" className="mt-1">
        Request an invite
      </Button>
    </form>
  );
}

/**
 * The label is the placeholder to the eye and a real label to a screen reader:
 * a placeholder alone leaves the input unnamed, and it disappears the moment
 * someone starts typing.
 */
function Field({
  name,
  label,
  inputMode,
  autoComplete,
}: {
  name: string;
  label: string;
  inputMode: "email" | "url";
  autoComplete: string;
}) {
  return (
    <>
      <label htmlFor={`invite-${name}`} className="sr-only">
        {label}
      </label>
      <input
        id={`invite-${name}`}
        name={name}
        type="text"
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={label}
        className="l-footer-type h-[46px] rounded-[8px] border border-[var(--l-line-night)] bg-[var(--tt-neutral-900)] px-4 text-[15px] text-[var(--tt-neutral-200)] transition-colors duration-150 ease-standard outline-none placeholder:text-[var(--tt-neutral-500)] hover:border-[var(--tt-neutral-700)] focus-visible:border-[var(--tt-neutral-500)]"
      />
    </>
  );
}
