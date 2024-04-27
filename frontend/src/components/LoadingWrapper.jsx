import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingWrapper = ({
  children,
  loading = false,
  loadingText = "Please Wait...",
}) => {
  return (
    <div
      style={{
        flexGrow: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 6,
      }}
    >
      {children}

      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#000",
            backdropFilter: "blur('10px')",
            opacity: 0.3,
          }}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={80} color="primary" thickness={2} />

            <div
              style={{
                color: "#fff",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              {loadingText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingWrapper;
