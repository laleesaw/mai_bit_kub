import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch(req.method) {
      case "GET":
        const acts = await prisma.activity.findMany({ include: { user_activities: true } });
        return res.status(200).json(acts);

      case "POST":
        const { activity_name, cost, category } = req.body;
        const newAct = await prisma.activity.create({ data: { activity_name, cost, category } });
        return res.status(201).json(newAct);

      case "PUT":
        const { activity_id, activity_name: newName } = req.body;
        const updatedAct = await prisma.activity.update({ where: { activity_id }, data: { activity_name: newName } });
        return res.status(200).json(updatedAct);

      case "DELETE":
        const { activity_id: delId } = req.body;
        await prisma.activity.delete({ where: { activity_id: delId } });
        return res.status(200).json({ message: "Activity deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
