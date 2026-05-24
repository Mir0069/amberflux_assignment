import AgentPanel from "./components/AgentPanel";
import UsagePanel from "./components/UsagePanel";
import AuditPanel from "./components/AuditPanel";
import SuggestionsPanel from "./components/SuggestionsPanel";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className=" bg-white/90 px-6 py-8 shadow-xl ring-1 ring-slate-200">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Governance Suite
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 sm:text-5xl">
              AI Agent Governance Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600">
              Review agents, monitor usage, track audit logs, and collect improvement suggestions in one clean workspace.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <AgentPanel />

          <div className="grid gap-6">
            <UsagePanel />
            <AuditPanel />
            <SuggestionsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;