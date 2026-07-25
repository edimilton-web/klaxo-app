// components/welcome-splash.tsx
//
// Klaxo — post-login welcome splash.
// Server component. No state, no timers, no animation library.
// Visibility is driven entirely by the `data-klx-welcome` attribute that the
// inline bootstrap script sets on <html> before first paint (see INTEGRATION.md).
//
// Because the attribute is set pre-paint, there is no hydration flash and the
// animation starts on the very first frame the browser renders.

type WelcomeSplashProps = {
  /** Full name from the session. Only the first name is shown. */
  name?: string | null;
  /**
   * Optional context line, e.g. "3 renewals coming up this month".
   * Leave undefined to render nothing — never render a placeholder.
   */
  subtitle?: string | null;
};

export default function WelcomeSplash({ name, subtitle }: WelcomeSplashProps) {
  const firstName = name?.trim().split(/\s+/)[0];

  return (
    // aria-hidden: this is a decorative transition. The dashboard underneath is
    // already the accessible source of truth, and it is never covered for input
    // (pointer-events: none), so nothing is trapped behind it.
    <div className="klx-splash" aria-hidden="true">
      <div className="klx-splash__inner">
        <div className="klx-splash__mark">
          <span className="klx-splash__ring" />
          <span className="klx-splash__ring klx-splash__ring--delayed" />
          <span className="klx-splash__tile">
            <span className="klx-splash__letter">K</span>
            <span className="klx-splash__sheen" />
          </span>
        </div>

        <p className="klx-splash__title">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </p>

        {subtitle ? <p className="klx-splash__sub">{subtitle}</p> : null}
      </div>
    </div>
  );
}
