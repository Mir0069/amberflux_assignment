import { useEffect, useState } from "react";

const decisionOptions = [
  { value: "allowed", label: "Allow" },
  { value: "blocked", label: "Block" },
  { value: "pending_review", label: "Pending Review" }
];

function AgentPanel() {

  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/agents"
      );

      const data = await response.json();

      setAgents(data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchAgents();

  }, []);

  const updateDecision = async (
    name,
    decision
  ) => {

    try {

      await fetch(
        `http://localhost:5000/agents/${name}/decision`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            decision,
            reason: "Updated from admin dashboard",
            approved_by: "admin"
          })
        }
      );

      fetchAgents();

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="bg-white  border border-slate-200 p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between gap-4">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Agent Governance
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">
            Manage agents
          </h2>
        </div>

        <p className="text-sm text-slate-500">
          Choose a decision from the dropdown for each agent.
        </p>

      </div>

      <div className="space-y-4">

        {agents.map((agent) => (

          <div
            key={agent._id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {agent.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {agent.description}
                </p>
              </div>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  agent.status === "allowed"
                    ? "bg-emerald-100 text-emerald-700"
                    : agent.status === "blocked"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {agent.status}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-white p-4 shadow-sm">

                <p className="text-sm text-slate-500">Risk</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {agent.risk_level}
                </p>

              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">

                <p className="text-sm text-slate-500">Reliability</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {agent.reliability_score}
                </p>

              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">

                <label className="text-sm text-slate-500">
                  Decision
                </label>
                <select
                  value={agent.status}
                  onChange={(e) =>
                    updateDecision(agent.name, e.target.value)
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                >
                  {decisionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default AgentPanel;