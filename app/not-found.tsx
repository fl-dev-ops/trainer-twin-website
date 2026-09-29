"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/" />
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center font-ui text-ink-secondary">
        <p className="text-base text-ink">Redirecting to home…</p>
        <Link
          href="/"
          className="mt-4 text-sm underline underline-offset-4 text-ink hover:text-primary"
        >
          Click here if you are not redirected automatically
        </Link>
      </div>
    </>
  );
}
