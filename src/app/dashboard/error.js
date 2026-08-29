"use client";

export default function DashboardError({ error, reset }) {
  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6 dot-grid">
      <div className="max-w-md w-full p-8 rounded-2xl bg-panel border border-crimson-accent/30 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-xl bg-crimson-accent/15 border border-crimson-accent/30 flex items-center justify-center text-2xl">
          ⚠️
        </div>
        <h2 className="text-xl font-bold text-crimson-accent">
          Dashboard Error
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed">
          {error?.message || "Something went wrong while loading the dashboard."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary btn-primary-md w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
