import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sanket Matroja — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
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
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            SM
          </span>
          <span style={{ fontSize: "36px", fontWeight: 700, color: "#3b82f6" }}>
            .
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#60a5fa",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            AI Engineer
          </span>

          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            I build AI that ships.
          </span>

          <span
            style={{
              fontSize: "20px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Fraud detection. Recommendation engines. NLP pipelines. LLM-powered
            tools. 14 projects. 5 AI platforms.
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
