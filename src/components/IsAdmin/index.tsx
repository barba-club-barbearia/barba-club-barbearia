"use client";

export default function IsAdmin() {
  if (typeof window === "undefined") return;
  const isAdmin = window.location.search.includes("admin");

  console.log("isAdmin", isAdmin);

  const manifestPath = isAdmin ? "/manifest-admin.json" : "/manifest.json";

  console.log("manifestPath", manifestPath);

  return <link rel="manifest" href={manifestPath} />;
}
