import { Card, CardBody } from "@/components/Card";
import { CtaLink } from "@/components/home/CtaLink";
import { CAREERS_APPLY_HREF, type Role } from "@/data/careers";

export function RoleCard({ role }: { role: Role }) {
  return (
    <Card>
      <CardBody className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-[24px] leading-[30px] font-semibold text-ink">
              {role.title}
            </h2>
            <p className="mt-2 font-ui text-[13px] leading-5 text-ink-tertiary">
              {role.meta}
            </p>
          </div>
          <CtaLink
            size="md"
            href={CAREERS_APPLY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start"
          >
            Apply Now
          </CtaLink>
        </div>

        <p className="max-w-[65ch] font-ui text-[16px] leading-[26px] text-ink-secondary">
          {role.summary}
        </p>

        <details className="group">
          <summary className="flex min-h-6 cursor-pointer list-none items-center font-ui text-[14px] leading-5 font-semibold text-primary-ink underline decoration-1 underline-offset-[3px] hover:decoration-2 [&::-webkit-details-marker]:hidden">
            Learn more
          </summary>
          <div className="mt-5 flex flex-col gap-5">
            {role.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h3 className="font-ui text-[17px] leading-6 font-semibold text-ink">
                  {section.heading}
                </h3>
                <ul className="flex list-disc flex-col gap-2 pl-5 font-ui text-[16px] leading-[26px] text-ink-secondary">
                  {section.items.map((item) => (
                    <li key={item} className="max-w-[65ch] pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {role.note ? (
              <p className="max-w-[65ch] font-ui text-[16px] leading-[26px] text-ink-secondary">
                {role.note}
              </p>
            ) : null}
          </div>
        </details>
      </CardBody>
    </Card>
  );
}
