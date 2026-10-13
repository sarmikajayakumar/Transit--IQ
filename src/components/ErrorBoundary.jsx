import React from 'react';

/**
 * High-visibility Editorial Error Boundary for TransitIQ.
 * Prevents white screen crashes and renders an actionable diagnostic panel.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TransitIQ System Error Caught by Boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetStorage = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'Unknown runtime error';

      return (
        <div className="min-h-screen bg-[#F6F3EC] text-[#0A0A0A] flex flex-col justify-center items-center p-4 sm:p-8 font-sans selection:bg-[#0A0A0A] selection:text-[#F6F3EC]">
          <div className="max-w-2xl w-full bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] p-6 sm:p-10 space-y-6">
            
            {/* Top Tactical Label */}
            <div className="flex items-center justify-between border-b border-[#0A0A0A] pb-3 flex-wrap gap-2">
              <span className="font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase bg-[#0A0A0A] text-[#F6F3EC] px-2 py-0.5">
                SYS.DIAGNOSTIC // RUNTIME INTERCEPT
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[#DC2626] font-bold uppercase tracking-wider">
                ● RECOVERY ACTIVE
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0A0A0A]">
                TransitIQ Application Diagnostic
              </h1>
              <p className="text-sm text-[#6E6B65] leading-relaxed">
                The application encountered an unexpected runtime error instead of rendering. TransitIQ has safely intercepted the crash to prevent a blank screen.
              </p>
              <p className="text-xs text-[#6E6B65] font-tamil leading-relaxed">
                பயன்பாட்டில் எதிர்பாராத பிழை ஏற்பட்டுள்ளது. வெள்ளைத்திரை வராமல் தடுக்க கணினி இந்த எச்சரிக்கையைக் காண்பிக்கிறது.
              </p>
            </div>

            {/* Error Message Box */}
            <div className="border border-[#0A0A0A] bg-[#FAF8F5] p-4 font-mono text-xs space-y-1">
              <div className="text-[#6E6B65] text-[10px] uppercase tracking-wider font-semibold">
                Detected Error Message:
              </div>
              <div className="text-[#DC2626] font-bold break-words">
                {errorMsg}
              </div>
            </div>

            {/* Diagnostics Advice */}
            <div className="font-mono text-xs text-[#6E6B65] space-y-2 border-l-2 border-[#0A0A0A] pl-3 py-1">
              <div className="font-bold text-[#0A0A0A] uppercase tracking-wider">
                Common Remedies:
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>If deploying on GitHub Pages, verify asset base path: <code className="bg-[#E2DBD0] px-1 py-0.5 text-[#0A0A0A]">/Transit--IQ/</code></li>
                <li>Verify that Supabase public URL and publishable Anon key are reachable.</li>
                <li>Clear local browser cache or restart the dev server.</li>
              </ul>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="px-4 py-2 bg-[#0A0A0A] text-[#F6F3EC] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#FFFFFF] hover:text-[#0A0A0A] border-2 border-[#0A0A0A] transition-all cursor-pointer shadow-[3px_3px_0px_#0A0A0A]"
              >
                ↻ Reload Application
              </button>
              <button
                onClick={this.handleResetStorage}
                className="px-4 py-2 bg-transparent text-[#0A0A0A] font-mono text-xs uppercase font-semibold tracking-wider hover:bg-[#E2DBD0] border border-[#0A0A0A] transition-colors cursor-pointer"
              >
                Clear Cache & Reload
              </button>
              <button
                onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                className="px-3 py-2 text-[#6E6B65] font-mono text-xs underline hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                {this.state.showDetails ? 'Hide Stack Trace' : 'View Stack Trace'}
              </button>
            </div>

            {/* Detailed Stack Trace (Collapsible) */}
            {this.state.showDetails && this.state.errorInfo && (
              <pre className="mt-4 p-3 bg-[#0A0A0A] text-[#F6F3EC] font-mono text-[10px] overflow-x-auto max-h-48 border border-[#0A0A0A] whitespace-pre-wrap leading-tight">
                {this.state.error?.stack}
                {'\n\nComponent Stack:\n'}
                {this.state.errorInfo.componentStack}
              </pre>
            )}

          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
