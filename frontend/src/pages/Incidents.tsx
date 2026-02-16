import React from 'react';

export default function Incidents() {
  return (
    <div className="p-6 min-h-screen bg-[#020204]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🚨</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Incidents
          </h1>
          <p className="text-lg text-slate-400 mb-6">
            Coming soon
          </p>
          <div className="text-left max-w-2xl mx-auto space-y-4 text-slate-300">
            <p>
              This page will track and manage incidents, correlating them with cost anomalies and releases.
            </p>
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-white">Planned Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-400">
                <li>Incident timeline and tracking</li>
                <li>Correlation with cost spikes</li>
                <li>Integration with PagerDuty/Opsgenie</li>
                <li>Root cause analysis</li>
                <li>Post-mortem documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
