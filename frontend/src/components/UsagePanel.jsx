import { useEffect, useState } from "react";

function UsagePanel() {
  const [usage, setUsage] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetchUsage = async () => {
    try {
      const response = await fetch("https://amberflux-assignment-fs6x.onrender.com/usage/summary");
      const data = await response.json();
      setUsage(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch("https://amberflux-assignment-fs6x.onrender.com/agents");
      const data = await response.json();
      setAgents(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsage();
    fetchAgents(); // FIXED
  }, []);

  return (
    <div className="bg-white border border-slate-200 p-6 shadow-sm rounded-3xl">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Usage Metering
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Usage Overview
        </h2>
      </div>

      <div className="space-y-4">
        {usage.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
            No usage metrics available yet.
          </div>
        ) : (
          usage.map((item, index) => {

            // Find matching agent
            const matchedAgent = agents.find(
              (agent) => agent.name === item.name
            );

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>

                  <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                    {matchedAgent?.status || "Unknown"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                    <p className="text-slate-500">Usage Count</p>

                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {item.usage_count}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                    <p className="text-slate-500">Total Units</p>

                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {item.total_units}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 text-sm text-slate-700 shadow-sm">
                    <p className="text-slate-500">Total Cost</p>

                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      ${item.total_cost}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default UsagePanel;