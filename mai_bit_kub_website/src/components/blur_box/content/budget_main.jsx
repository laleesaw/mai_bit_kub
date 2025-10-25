import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./budget_main.css";
import Budget_main from "../../../assets/budget_icon.png";

function Budget() {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [userId, setUserId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(Number(id)); // convert to int for Prisma
    else console.error("No userId in localStorage");
  }, []);

  const handleSave = async () => {
    if (!userId) {
      toast.error("No user selected!");
      return;
    }

    const min = parseFloat(minBudget) || 0;
    const max = parseFloat(maxBudget) || 0;

    if (min >= max) {
      toast.error("Min budget must be less than Max budget!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5173/api/budget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, min_budget: min, max_budget: max }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", text);
        throw new Error(text || "Failed to save budget");
      }

      const result = await res.json();
      console.log("Budget saved:", result);
      setIsSaved(true);
      toast.success("Budget saved successfully!");
    } catch (err) {
      console.error("Error saving budget:", err);
      toast.error("Error saving budget: " + err.message);
    }
  };

  const handleEdit = () => setIsSaved(false);

  const canSave = minBudget && maxBudget && parseFloat(minBudget) < parseFloat(maxBudget);

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
            onChange={(e) => setMinBudget(e.target.value)}
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
            onChange={(e) => setMaxBudget(e.target.value)}
            disabled={isSaved}
          />
          <span className="currency">฿</span>
        </div>
      </div>
      {!isSaved ? (
        <button onClick={handleSave} disabled={!canSave} className="save-btn">
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
