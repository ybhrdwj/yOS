"use client"

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let posthogInstance: typeof import("posthog-js").default | null = null;

export function PostHogAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    import("posthog-js").then((posthogModule) => {
      const posthog = posthogModule.default;
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: 'https://www.yashbhardwaj.com/ingest',
        ui_host: 'https://us.posthog.com',
        capture_pageview: false,
        capture_pageleave: true,
      });
      posthogInstance = posthog;
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthogInstance) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += "?" + search;
      }
      posthogInstance.capture("$pageview", { "$current_url": url });
    }
  }, [pathname, searchParams]);

  return null;
}
