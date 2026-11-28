"use client";

import { useRef, useState } from "react";
import {
  BriefcaseBusinessIcon,
  type BriefcaseBusinessIconHandle,
} from "@/components/icons/briefcase-icon";
import { XIcon, type XIconHandle } from "@/components/icons/x-icon";
import { YoutubeIcon } from "@/components/icons/youtube-icon";

export default function SiteFooter({ className = "" }: { className?: string }) {
  const [youtubeHovered, setYoutubeHovered] = useState(false);
  const xIconRef = useRef<XIconHandle>(null);
  const briefcaseRef = useRef<BriefcaseBusinessIconHandle>(null);

  return (
    <footer
      className={`py-10 ${className}`}
      style={{
        paddingLeft: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        paddingRight: "clamp(1.5rem, 1rem + 2vw, 2.5rem)",
        marginTop: "auto",
      }}
    >
      <div className="max-w-170 mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-withname.svg"
            alt="TrainerTwin"
            className="h-5 w-auto"
          />
          <a
            href="/careers"
            className="ml-4 flex items-center gap-1.5 text-[13px] text-muted hover:text-brand transition-colors no-underline!"
            onMouseEnter={() => briefcaseRef.current?.startAnimation()}
            onMouseLeave={() => briefcaseRef.current?.stopAnimation()}
            onFocus={() => briefcaseRef.current?.startAnimation()}
            onBlur={() => briefcaseRef.current?.stopAnimation()}
          >
            <BriefcaseBusinessIcon ref={briefcaseRef} size={16} aria-hidden />
            Careers
          </a>
        </div>

        <div className="flex items-center gap-6 text-[13px] text-muted">
          <a
            href="https://www.youtube.com/@TrainerTwin"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 hover:text-brand transition-colors no-underline!"
            onMouseEnter={() => setYoutubeHovered(true)}
            onMouseLeave={() => setYoutubeHovered(false)}
          >
            <YoutubeIcon size={16} isHovered={youtubeHovered} />
            YouTube
          </a>
          <a
            href="https://x.com/trainertwin_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 hover:text-brand transition-colors no-underline!"
            onMouseEnter={() => xIconRef.current?.startAnimation()}
            onMouseLeave={() => xIconRef.current?.stopAnimation()}
            onFocus={() => xIconRef.current?.startAnimation()}
            onBlur={() => xIconRef.current?.stopAnimation()}
          >
            <XIcon ref={xIconRef} size={16} aria-hidden />
            Twitter
          </a>
          <a
            href="https://wa.me/919840717917"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors no-underline!"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
