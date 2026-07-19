import React, { Component } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an active runtime error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[500px] w-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-xl max-w-lg mx-auto mt-12">
          <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-6">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-200 mb-2">Something Went Wrong</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-sm">
            We encountered a culinary glitch preparing this view. Please try reloading the page.
          </p>
          {this.state.error && (
            <pre className="text-left bg-slate-950 p-4 rounded border border-slate-800 text-xs font-mono text-red-400 w-full overflow-x-auto mb-6 max-h-40">
              {this.state.error.toString()}
            </pre>
          )}
          <button
            onClick={this.handleReset}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw size={16} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
