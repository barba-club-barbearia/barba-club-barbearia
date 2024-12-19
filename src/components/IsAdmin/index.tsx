"use client";

export default function IsAdmin() {
  if (typeof window === "undefined") return;
  const isAdmin = window.location.search.includes("admin");

  const manifestPath = isAdmin ? "/manifest-admin.json" : "/manifest.json";

  return <link rel="manifest" href={manifestPath} />;
}
