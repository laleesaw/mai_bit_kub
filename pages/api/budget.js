import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  // --- CORS headers ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // --- Preflight request ---
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    switch(req.method) {
      case "GET": {
        const budgets = await prisma.budget.findMany({ include: { user: true } });
        // Serialize ข้อมูลก่อนส่งกลับ
        const serialized = budgets.map(b => ({
          budget_id: b.budget_id,
          user_id: b.user_id,
          max_budget: Number(b.max_budget), // convert BigInt or string เป็น number
          user: b.user ? {
            user_id: b.user.user_id,
            email: b.user.email,
            name: b.user.name
          } : null
        }));
        return res.status(200).json(serialized);
      }

      case "POST": {
        const { user_id, max_budget } = req.body;
        if (!user_id || max_budget == null) {
          return res.status(400).json({ message: "Missing user_id or max_budget" });
        }
        const newBudget = await prisma.budget.create({
          data: { user_id, max_budget }
        });
        return res.status(201).json({
          budget_id: newBudget.budget_id,
          user_id: newBudget.user_id,
          max_budget: Number(newBudget.max_budget)
        });
      }

      case "PUT": {
        const { budget_id, max_budget: newMax } = req.body;
        if (!budget_id || newMax == null) {
          return res.status(400).json({ message: "Missing budget_id or max_budget" });
        }
        const updatedBudget = await prisma.budget.update({
          where: { budget_id },
          data: { max_budget: newMax }
        });
        return res.status(200).json({
          budget_id: updatedBudget.budget_id,
          user_id: updatedBudget.user_id,
          max_budget: Number(updatedBudget.max_budget)
        });
      }

      case "DELETE": {
        const { budget_id: delId } = req.body;
        if (!delId) return res.status(400).json({ message: "Missing budget_id" });
        await prisma.budget.delete({ where: { budget_id: delId } });
        return res.status(200).json({ message: "Budget deleted" });
      }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error("Error in /api/budget:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
