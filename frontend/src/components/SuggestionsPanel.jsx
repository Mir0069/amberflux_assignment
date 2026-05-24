import { useEffect, useState } from "react";

function SuggestionsPanel() {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/improvement-suggestions"
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div className="bg-white  border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Improvement Suggestions
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          What agents need next
        </h2>
      </div>

      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
            No suggestions available yet.
          </div>
        ) : (
          suggestions.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.agent}
                </h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  Suggestion
                </span>
              </div>
              <p className="text-slate-700">{item.suggestion}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SuggestionsPanel;