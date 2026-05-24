import { useEffect, useState } from "react";

function AuditPanel() {
  const [logs, setLogs] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/audit-log");
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
      
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Audit Logs
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            Recent Activity
          </h2>
        </div>

        <span className="text-3xl text-slate-400">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Expandable Panel */}
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
                No audit events recorded yet.
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log._id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {log.event_type}
                    </span>

                    <span className="text-sm text-slate-500">
                      {log.actor}
                    </span>
                  </div>

                  <div className="grid gap-2 text-sm text-slate-700">
                    <p>
                      <strong>Agent:</strong> {log.agent_name}
                    </p>

                    <p>
                      <strong>Reason:</strong> {log.reason}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditPanel;