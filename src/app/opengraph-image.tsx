import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.nameEn} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ fontSize: 32, color: "#94a3b8", marginBottom: 16 }}>
          {profile.nameEn}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 40, color: "#cbd5e1", marginTop: 32 }}>
          {profile.tagline}
        </div>
        <div style={{ fontSize: 28, color: "#64748b", marginTop: 40 }}>
          {`${profile.role} · ${profile.location}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
