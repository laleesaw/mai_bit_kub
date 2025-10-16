import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// helper: serialize UserActivity ให้ JSON-safe
function serializeUserActivity(ua) {
  return {
    user_id: ua.user_id,
    activity_id: ua.activity_id,
    preference_level: ua.preference_level,
    user: ua.user ? { user_id: ua.user.user_id, name: ua.user.name, email: ua.user.email } : null,
    activity: ua.activity ? { activity_id: ua.activity.activity_id, name: ua.activity.name } : null,
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
    switch(req.method) {
      case "GET": {
        const uas = await prisma.userActivity.findMany({ include: { user: true, activity: true } });
        return res.status(200).json(uas.map(serializeUserActivity));
      }

      case "POST": {
        const { user_id, activity_id, preference_level } = req.body;
        if (!user_id || !activity_id || preference_level == null) {
          return res.status(400).json({ message: "Missing user_id, activity_id, or preference_level" });
        }
        const newUA = await prisma.userActivity.create({ data: { user_id, activity_id, preference_level } });
        const fullUA = await prisma.userActivity.findUnique({ 
          where: { user_id_activity_id: { user_id, activity_id } },
          include: { user: true, activity: true }
        });
        return res.status(201).json(serializeUserActivity(fullUA));
      }

      case "PUT": {
        const { user_id, activity_id, preference_level } = req.body;
        if (!user_id || !activity_id || preference_level == null) {
          return res.status(400).json({ message: "Missing user_id, activity_id, or preference_level" });
        }
        const updatedUA = await prisma.userActivity.update({
          where: { user_id_activity_id: { user_id, activity_id } },
          data: { preference_level },
          include: { user: true, activity: true }
        });
        return res.status(200).json(serializeUserActivity(updatedUA));
      }

      case "DELETE": {
        const { user_id, activity_id } = req.body;
        if (!user_id || !activity_id) {
          return res.status(400).json({ message: "Missing user_id or activity_id" });
        }
        await prisma.userActivity.delete({ where: { user_id_activity_id: { user_id, activity_id } } });
        return res.status(200).json({ message: "UserActivity deleted" });
      }

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch(err) {
    console.error("Error in /api/userActivity:", err);
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
}
