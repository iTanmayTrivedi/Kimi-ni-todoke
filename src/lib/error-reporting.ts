type ErrorReportOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type ErrorReporter = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: ErrorReportOptions,
  ) => void;
};

export function reportApplicationError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const reporter = Object.values(window).find(
    (candidate): candidate is ErrorReporter =>
      typeof candidate === "object" &&
      candidate !== null &&
      "captureException" in candidate &&
      typeof (candidate as ErrorReporter).captureException === "function",
  );
  reporter?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
