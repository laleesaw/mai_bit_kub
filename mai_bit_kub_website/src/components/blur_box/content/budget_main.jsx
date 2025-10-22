// import { useState, useEffect } from "react";
// import "./budget_main.css";
// import Budget_main from "../../../assets/budget_icon.png";

// function Budget({ userId }) {
//   const [minBudget, setMinBudget] = useState("");
//   const [maxBudget, setMaxBudget] = useState("");

//   // โหลด budget ของ user
//   useEffect(() => {
//     async function fetchBudget() {
//       try {
//         const res = await fetch("/api/budget");
//         const data = await res.json();
//         const userBudget = data.find(b => b.user_id === userId);
//         if (userBudget) {
//           setMinBudget(userBudget.min_budget || "");
//           setMaxBudget(userBudget.max_budget || "");
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchBudget();
//   }, [userId]);

//   const handleSave = async () => {
//     try {
//       // ตรวจว่ามี budget อยู่แล้วหรือยัง
//       const res = await fetch("/api/budget");
//       const data = await res.json();
//       const userBudget = data.find(b => b.user_id === userId);

//       const body = {
//         user_id: userId,
//         min_budget: parseFloat(minBudget),
//         max_budget: parseFloat(maxBudget),
//       };


//       let saveRes;
//       if (userBudget) {
//         // ถ้ามี budget แล้ว ใช้ PUT
//         saveRes = await fetch("/api/budget", {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             budget_id: userBudget.budget_id,
//             min_budget: body.min_budget,
//             max_budget: body.max_budget,
//           }),
//         });
//       } else {
//         // ถ้าไม่มี budget ใช้ POST
//         saveRes = await fetch("/api/budget", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body),
//         });
//       }

//       if (!saveRes.ok) throw new Error("Failed to save budget");
//       const result = await saveRes.json();
//       alert("Budget saved: " + JSON.stringify(result));
//     } catch (err) {
//       console.error(err);
//       alert("Error saving budget");
//     }
//   };

//   return (
//     <div className="budget">
//       <img src={Budget_main} alt="budget icon" />
//       <div className="amount-container">
//         <div className="budget-wrapper">
//           <input
//             type="number"
//             placeholder="Min Budget"
//             className="budget-min"
//             value={minBudget}
//             onChange={(e) => setMinBudget(e.target.value)}
//           />
//           <span className="currency">฿</span>
//         </div>
//         <div className="budget-wrapper">
//           <input
//             type="number"
//             placeholder="Max Budget"
//             className="budget-max"
//             value={maxBudget}
//             onChange={(e) => setMaxBudget(e.target.value)}
//           />
//           <span className="currency">฿</span>
//         </div>
//       </div>
//       <button onClick={handleSave} className="save-btn">Save Budget</button>
//     </div>
//   );
// }

// export default Budget;


import { useState, useEffect } from "react";
import "./budget_main.css";
import Budget_main from "../../../assets/budget_icon.png";

function Budget({ userId }) {
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  // โหลด budget ของ user
  useEffect(() => {
    async function fetchBudget() {
      try {
        const res = await fetch("/api/budget");
        const data = await res.json();
        console.log("Fetched budgets:", data);
        const userBudget = data.find(b => b.user_id === userId);
        if (userBudget) {
          setMinBudget(userBudget.min_budget || "");
          setMaxBudget(userBudget.max_budget || "");
        }
      } catch (err) {
        console.error("Error fetching budget:", err);
      }
    }
    fetchBudget();
  }, [userId]);

  const handleSave = async () => {
    try {
      const min = parseFloat(minBudget) || 0;
      const max = parseFloat(maxBudget) || 0;

      console.log("Saving budget for user:", userId, "Min:", min, "Max:", max);

      const body = {
        user_id: userId,
        min_budget: min,
        max_budget: max,
      };

      // ตรวจสอบว่ามี budget อยู่แล้วหรือยัง
      const resCheck = await fetch("/api/budget");
      const dataCheck = await resCheck.json();
      const userBudget = dataCheck.find(b => b.user_id === userId);

      let saveRes;
      if (userBudget) {
        console.log("Updating existing budget:", userBudget.budget_id);
        saveRes = await fetch("/api/budget", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            budget_id: userBudget.budget_id,
            min_budget: min,
            max_budget: max,
          }),
        });
      } else {
        console.log("Creating new budget");
        saveRes = await fetch("/api/budget", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!saveRes.ok) {
        const text = await saveRes.text();
        console.error("Save failed:", text);
        throw new Error("Failed to save budget");
      }

      const result = await saveRes.json();
      console.log("Budget saved:", result);
      alert("Budget saved: " + JSON.stringify(result));
    } catch (err) {
      console.error("Error saving budget:", err);
      alert("Error saving budget: " + err.message);
    }
  };

  return (
    <div className="budget">
      <img src={Budget_main} alt="budget icon" />
      <div className="amount-container">
        <div className="budget-wrapper">
          <input
            type="number"
            placeholder="Min Budget"
            className="budget-min"
            value={minBudget}
            onChange={(e) => setMinBudget(e.target.value)}
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
          />
          <span className="currency">฿</span>
        </div>
      </div>
      <button onClick={handleSave} className="save-btn">Save Budget</button>
    </div>
  );
}

export default Budget;
