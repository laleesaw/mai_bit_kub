import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./budget_main.css";
import Budget_main from "../../../assets/budget_icon.png";

function Budget() {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [budgetId, setBudgetId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [minAllowed, setMinAllowed] = useState(0);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(Number(id)); // convert to int for Prisma
    else console.error("No userId in localStorage");
  }, []);

  // Load existing budget for the user (if any) and show it (read-only until Edit)
  useEffect(() => {
    async function loadBudget() {
      try {
        const id = localStorage.getItem("userId");
        if (!id) return;
        const res = await fetch(`/api/budget`);
        if (!res.ok) return;
        const all = await res.json();
        const mine = all.find(b => String(b.user_id) === String(id));
        if (mine) {
          setBudgetId(mine.budget_id || null);
          setMinBudget(String(mine.min_budget ?? ""));
          setMaxBudget(String(mine.max_budget ?? ""));
          setIsSaved(true);
          // also notify activity about existing saved budget
          window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { maxBudget: Number(mine.max_budget || 0), minBudget: Number(mine.min_budget || 0) } }));
        }
      } catch (err) {
        console.error('Failed to load existing budget', err);
      }
    }

    loadBudget();
  }, []);

  // Listen for selected activities min cost to enforce minBudget
  useEffect(() => {
    function handler(e) {
      const maxMin = e?.detail?.maxMin ?? 0;
      setMinAllowed(maxMin);
      // do NOT auto-adjust the user's Min Budget; only warn and record the required minimum
      const current = parseFloat(minBudget) || 0;
      if (current < maxMin) {
        toast.warn(`Selected activities require a minimum budget of ฿${maxMin}. Please increase your Min Budget before saving.`);
      }
    }

    window.addEventListener('selectedActivitiesMinCost', handler);
    return () => window.removeEventListener('selectedActivitiesMinCost', handler);
  }, [minBudget]);

  const handleSave = async () => {
    if (!userId) {
      toast.error("No user selected!");
      return;
    }

    const min = parseFloat(minBudget) || 0;
    const max = parseFloat(maxBudget) || 0;

    if (min < minAllowed) {
      toast.error(`Min budget cannot be less than required ${minAllowed}`);
      return;
    }

    if (min >= max) {
      toast.error("Min budget must be less than Max budget!");
      return;
    }

    try {
      const method = budgetId ? 'PUT' : 'POST';
      const body = budgetId ? { budget_id: budgetId, min_budget: min, max_budget: max } : { user_id: userId, min_budget: min, max_budget: max };
      const res = await fetch(`/api/budget`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", text);
        throw new Error(text || "Failed to save budget");
      }

      const result = await res.json();
      console.log("Budget saved:", result);
      setIsSaved(true);
      if (!budgetId && result?.budget_id) setBudgetId(result.budget_id);
      // notify other components (Activity) that user's budget changed
      try {
        const max = Number(result.max_budget ?? max);
        const min = Number(result.min_budget ?? min);
        window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { maxBudget: max, minBudget: min } }));
      } catch (e) {
        // ignore
      }
      toast.success("Budget saved successfully!");
    } catch (err) {
      console.error("Error saving budget:", err);
      toast.error("Error saving budget: " + err.message);
    }
  };

  const handleEdit = () => setIsSaved(false);

  // Prevent user from entering a maxBudget lower than the required minimum (minAllowed).
  const handleMaxBudgetChange = (e) => {
    const v = e.target.value;
    // allow clearing
    if (v === "") {
      setMaxBudget("");
      // notify others that budget was cleared/changed
      window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { maxBudget: null, minBudget: minBudget === "" ? null : Number(minBudget || 0) } }));
      return;
    }

    const num = parseFloat(v);
    if (Number.isNaN(num)) {
      setMaxBudget(v);
      return;
    }

    if (minAllowed && num < Number(minAllowed)) {
      toast.warn(`Max budget cannot be less than required minimum ฿${minAllowed}`);
      // do not accept the value
      return;
    }

    setMaxBudget(v);
    // notify other components (Activity) about the change immediately so clearing enables selections
    window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { maxBudget: Number(v), minBudget: minBudget === "" ? null : Number(minBudget || 0) } }));
  };

  const handleMinBudgetChange = (e) => {
    const v = e.target.value;
    if (v === "") {
      setMinBudget("");
      window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { minBudget: null, maxBudget: maxBudget === "" ? null : Number(maxBudget || 0) } }));
      return;
    }
    const num = parseFloat(v);
    if (Number.isNaN(num)) {
      setMinBudget(v);
      return;
    }

    setMinBudget(v);
    window.dispatchEvent(new CustomEvent('userBudgetUpdated', { detail: { minBudget: Number(v), maxBudget: maxBudget === "" ? null : Number(maxBudget || 0) } }));
  };

  const canSave = minBudget && maxBudget && parseFloat(minBudget) < parseFloat(maxBudget);

  // Save only allowed when minBudget meets activity requirement AND maxBudget is >= minAllowed
  const canSaveWithMinAllowed = canSave && (parseFloat(minBudget) >= minAllowed) && (parseFloat(maxBudget) >= minAllowed);

  return (
    <div className="budget">
      <img src={Budget_main} alt="budget icon" />
      <div className={`amount-container ${isSaved ? "disabled" : ""}`}>
        <div className="budget-wrapper">
          <input
            type="number"
            placeholder="Min Budget"
            className="budget-min"
            value={minBudget}
            onChange={handleMinBudgetChange}
            disabled={isSaved}
          />
          <span className="currency">฿</span>

        </div>
        <div className="budget-wrapper">
          <input
            type="number"
            placeholder="Max Budget"
            className="budget-max"
            value={maxBudget}
            onChange={handleMaxBudgetChange}
            disabled={isSaved}
            min={minAllowed || undefined}
          />
          <span className="currency">฿</span>
        </div>
      </div>
      <div className="notice" style={{ color: parseFloat(minBudget || 0) < minAllowed ? '#b00020' : '#333' }}>
        <span>more than: {minAllowed} ฿</span>
      </div>
      {/* Debug panel to show budget-related state for troubleshooting */}
      {/* <div style={{ marginTop: 8, padding: 8, background: '#f7f7f7', borderRadius: 6, fontSize: 12 }}>
        <strong>DEBUG</strong>
        <div>minBudget: {String(minBudget)}</div>
        <div>maxBudget: {String(maxBudget)}</div>
        <div>minAllowed (from activities): {String(minAllowed)}</div>
        <div>canSave: {String(canSave)}</div>
        <div>canSaveWithMinAllowed: {String(canSaveWithMinAllowed)}</div>
      </div> */}
      {!isSaved ? (
        <button onClick={handleSave} disabled={!canSaveWithMinAllowed} className="save-btn">
          Save Budget
        </button>
      ) : (
        <button onClick={handleEdit} className="save-btn">
          Edit Budget
        </button>
      )}
    </div>
  );
}

export default Budget;
