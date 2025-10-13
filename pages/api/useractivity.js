import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch(req.method) {
      case "GET":
        const uas = await prisma.userActivity.findMany({ include: { user: true, activity: true } });
        return res.status(200).json(uas);

      case "POST":
        const { user_id, activity_id, preference_level } = req.body;
        const newUA = await prisma.userActivity.create({ data: { user_id, activity_id, preference_level } });
        return res.status(201).json(newUA);

      case "PUT":
        const { user_id: uId, activity_id: aId, preference_level: newPref } = req.body;
        const updatedUA = await prisma.userActivity.update({
          where: { user_id_activity_id: { user_id: uId, activity_id: aId } },
          data: { preference_level: newPref },
        });
        return res.status(200).json(updatedUA);

      case "DELETE":
        const { user_id: delU, activity_id: delA } = req.body;
        await prisma.userActivity.delete({ where: { user_id_activity_id: { user_id: delU, activity_id: delA } } });
        return res.status(200).json({ message: "UserActivity deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
