import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch(req.method) {
      case "GET":
        const members = await prisma.groupMember.findMany({ include: { user: true, group: true } });
        return res.status(200).json(members);

      case "POST":
        const { user_id, group_id, role } = req.body;
        const newMember = await prisma.groupMember.create({
          data: { user_id, group_id, role },
        });
        return res.status(201).json(newMember);

      case "PUT":
        const { user_id: uId, group_id: gId, role: newRole } = req.body;
        const updatedMember = await prisma.groupMember.update({
          where: { user_id_group_id: { user_id: uId, group_id: gId } },
          data: { role: newRole },
        });
        return res.status(200).json(updatedMember);

      case "DELETE":
        const { user_id: delU, group_id: delG } = req.body;
        await prisma.groupMember.delete({
          where: { user_id_group_id: { user_id: delU, group_id: delG } },
        });
        return res.status(200).json({ message: "Group member deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
