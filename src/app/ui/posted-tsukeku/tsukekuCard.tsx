import React from "react";

export default function TsukekuCard({
  yonku,
  goku,
  description,
}: {
  yonku: string;
  goku: string;
  description: string | null;
}) {
  return (
    <div>
      <p>{yonku}</p>
      <p>{goku}</p>
      <p>{description}</p>
    </div>
  );
}
