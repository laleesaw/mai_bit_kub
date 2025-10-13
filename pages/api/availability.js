import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    switch(req.method) {
      case "GET":
        const avails = await prisma.availability.findMany({ include: { user: true, group: true } });
        return res.status(200).json(avails);

      case "POST":
        const { user_id, group_id, start_datetime, end_datetime, note } = req.body;
        const newAvail = await prisma.availability.create({
          data: { user_id, group_id, start_datetime: new Date(start_datetime), end_datetime: new Date(end_datetime), note },
        });
        return res.status(201).json(newAvail);

      case "PUT":
        const { availability_id, note: updatedNote } = req.body;
        const updatedAvail = await prisma.availability.update({
          where: { availability_id },
          data: { note: updatedNote },
        });
        return res.status(200).json(updatedAvail);

      case "DELETE":
        const { availability_id: delId } = req.body;
        await prisma.availability.delete({ where: { availability_id: delId } });
        return res.status(200).json({ message: "Availability deleted" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
