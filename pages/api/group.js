import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const groups = await prisma.group.findMany({
          include: { creator: true, members: true, availabilities: true },
        });
        return res.status(200).json(groups);

      case "POST":
        const { group_name, max_members, created_by } = req.body;
        const newGroup = await prisma.group.create({
          data: { group_name, max_members, created_by },
        });
        return res.status(201).json(newGroup);

      case "PUT":
        const { group_id, group_name: newName } = req.body;
        const updatedGroup = await prisma.group.update({
          where: { group_id },
          data: { group_name: newName },
        });
        return res.status(200).json(updatedGroup);

      case "DELETE":
        const { group_id: deleteId } = req.body;
        await prisma.group.delete({ where: { group_id: deleteId } });
        return res.status(200).json({ message: "Group deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
