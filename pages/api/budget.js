import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch(req.method) {
      case "GET":
        const budgets = await prisma.budget.findMany({ include: { user: true } });
        return res.status(200).json(budgets);

      case "POST":
        const { user_id, max_budget } = req.body;
        const newBudget = await prisma.budget.create({ data: { user_id, max_budget } });
        return res.status(201).json(newBudget);

      case "PUT":
        const { budget_id, max_budget: newMax } = req.body;
        const updatedBudget = await prisma.budget.update({ where: { budget_id }, data: { max_budget: newMax } });
        return res.status(200).json(updatedBudget);

      case "DELETE":
        const { budget_id: delId } = req.body;
        await prisma.budget.delete({ where: { budget_id: delId } });
        return res.status(200).json({ message: "Budget deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
