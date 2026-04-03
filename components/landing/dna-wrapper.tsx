"use client";

import dynamic from "next/dynamic";

const DNAScene = dynamic(
  () => import("./dna-model").then((mod) => mod.DNAScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-background/5 animate-pulse" /> }
);

export function DNAWrapper() {
  return <DNAScene />;
}
