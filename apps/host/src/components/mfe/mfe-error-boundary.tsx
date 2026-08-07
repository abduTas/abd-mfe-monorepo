"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage: string | null;
};

export class MfeErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Microfrontend failed to load:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="card border-rose-900/50 bg-rose-950/30 p-4 text-sm text-rose-200">
            <p className="font-semibold">Remote microfrontend failed to load.</p>
            {this.state.errorMessage ? (
              <p className="mt-2 font-mono text-xs text-rose-100">{this.state.errorMessage}</p>
            ) : null}
            <p className="mt-2 text-rose-300/80">
              Ensure abd-mfe-shell is running on port 3001 and abd-mfe-state on port 3002, then
              restart the shell after code changes (
              <code className="text-rose-100">npm run dev</code>
              ).
            </p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
