"use client";

import dynamic from "next/dynamic";

// Dynamically import ReferralHandler with SSR disabled
const ReferralHandler = dynamic(() => import("./ReferralHandler"), {
  ssr: false,
});

export default function ReferralHandlerWrapper() {
  return <ReferralHandler />;
}
