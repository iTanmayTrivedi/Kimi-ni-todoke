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

function isErrorReporter(candidate: unknown): candidate is ErrorReporter {
  return (
    typeof candidate === "object" &&
    candidate !== null &&
    "captureException" in candidate &&
    typeof candidate.captureException === "function"
  );
}

export function reportApplicationError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const reporter = Object.values(Object.getOwnPropertyDescriptors(window))
    .map(({ value }) => value as unknown)
    .find(isErrorReporter);
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
