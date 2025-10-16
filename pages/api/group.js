import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// helper: serialize group
function serializeGroup(group) {
  return {
    group_id: group.group_id,
    group_name: group.group_name,
    max_members: group.max_members,
    created_by: group.created_by,
    creator: group.creator
      ? { user_id: group.creator.user_id, name: group.creator.name, email: group.creator.email }
      : null,
    members: group.members ? group.members.map(m => ({ user_id: m.user_id, role: m.role })) : [],
    availabilities: group.availabilities ? group.availabilities.map(a => ({
      user_id: a.user_id,
      start_datetime: a.start_datetime,
      end_datetime: a.end_datetime
    })) : [],
  };
}

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
    switch (req.method) {
      case "GET": {
        const groups = await prisma.group.findMany({
          include: { creator: true, members: true, availabilities: true },
        });
        return res.status(200).json(groups.map(serializeGroup));
      }

      case "POST": {
        const { group_name, max_members, created_by } = req.body;
        if (!group_name || !max_members || !created_by) {
          return res.status(400).json({ message: "Missing group_name, max_members, or created_by" });
        }
        const newGroup = await prisma.group.create({
          data: { group_name, max_members, created_by },
        });
        const fullGroup = await prisma.group.findUnique({
          where: { group_id: newGroup.group_id },
          include: { creator: true, members: true, availabilities: true }
        });
        return res.status(201).json(serializeGroup(fullGroup));
      }

      case "PUT": {
        const { group_id, group_name: newName } = req.body;
        if (!group_id || !newName) {
          return res.status(400).json({ message: "Missing group_id or group_name" });
        }
        const updatedGroup = await prisma.group.update({
          where: { group_id },
          data: { group_name: newName },
          include: { creator: true, members: true, availabilities: true }
        });
        return res.status(200).json(serializeGroup(updatedGroup));
      }

      case "DELETE": {
        const { group_id } = req.body;
        if (!group_id) {
          return res.status(400).json({ message: "Missing group_id" });
        }
        await prisma.group.delete({ where: { group_id } });
        return res.status(200).json({ message: "Group deleted" });
      }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.error("Error in /api/group:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
