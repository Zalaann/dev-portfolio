import { memo, useState } from "react";
import AppsLoader from "components/system/Apps/AppsLoader";
import Desktop from "components/system/Desktop";
import Taskbar from "components/system/Taskbar";
import useGlobalErrorHandler from "hooks/useGlobalErrorHandler";
import useGlobalKeyboardShortcuts from "hooks/useGlobalKeyboardShortcuts";
import useIFrameFocuser from "hooks/useIFrameFocuser";
import useUrlLoader from "hooks/useUrlLoader";

const Index = (): React.ReactElement => {
  useIFrameFocuser();
  useUrlLoader();
  useGlobalKeyboardShortcuts();
  useGlobalErrorHandler();
  const [showMaintenance, setShowMaintenance] = useState(true);

  return (
    <Desktop>
      <Taskbar />
      <AppsLoader />
      {showMaintenance && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site update notice"
          style={{
            position: "fixed",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.85))",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "24px",
          }}
        >
          <div
            style={{
              width: "min(720px, 92vw)",
              textAlign: "center",
              background: "rgba(20,20,20,0.8)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "28px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
            }}
          >
            <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.2 }}>
              Updating the theme — we’ll be back soon
            </h1>
            <p style={{ margin: "12px 0 20px", opacity: 0.9 }}>
              We’re refreshing the portfolio experience. In the meantime you can
              still access a few items below.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                alignItems: "center",
              }}
            >
              <a
                href="/Users/Public/Desktop/Muhammad%20Ibrahim%20Tariq%20%20CV%20.pdf"
                download
                style={{
                  display: "inline-block",
                  padding: "12px 18px",
                  borderRadius: 8,
                  background: "#ffffff",
                  color: "#111",
                  textDecoration: "none",
                  fontWeight: 600,
                  width: "min(360px, 92%)",
                }}
              >
                Download CV (PDF)
              </a>
              <button
                type="button"
                onClick={() => setShowMaintenance(false)}
                style={{
                  padding: "12px 18px",
                  borderRadius: 8,
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.35)",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "min(360px, 92%)",
                }}
              >
                Enter Desktop OS (still underway)
              </button>
            </div>
          </div>
        </div>
      )}
    </Desktop>
  );
};

export default memo(Index);
