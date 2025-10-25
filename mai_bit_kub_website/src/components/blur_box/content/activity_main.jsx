import React, { useState } from "react";
import "./activity_main.css";

import Create_icon from "../../../assets/create.png";
import Sport_icon from "../../../assets/sport.png";
import Music_icon from "../../../assets/music.png";
import Indoor_icon from "../../../assets/indoor.png";
import Adventure_icon from "../../../assets/adventure.png";
import Back from "../../../assets/back.png";

import Biking_icon from "../../../assets/biking_icon.png";
import Dancing_icon from "../../../assets/dancing_icon.png";
import Drawing_icon from "../../../assets/drawing_icon.png";
import Hiking_icon from "../../../assets/hiking_icon.png";
import Serfing_icon from "../../../assets/serfing_icon.png";
import Singing_icon from "../../../assets/singing_icon.png";
import Pingpong_icon from "../../../assets/pingpong.png";
import Boxing_icon from "../../../assets/boxing.png";
import Swimming_icon from "../../../assets/water.png";
import Gaming_icon from "../../../assets/game_icon.png";
import Photography_icon from "../../../assets/photography.png";
import Boardgame_icon from "../../../assets/boardgame_icon.png";
import Diving_icon from "../../../assets/diving_icon.png";
import Add_activity_icon from "../../../assets/add_activity.png";

// -----------------------------------------------------
// ✅ กำหนดกิจกรรมหลัก / ย่อย
// -----------------------------------------------------
const mainActivities = [
  {
    name: "SPORT",
    icon: Sport_icon,
    subActivities: [
      { name: "PINGPONG", icon: Pingpong_icon },
      { name: "BOXING", icon: Boxing_icon },
      { name: "SWIMMING", icon: Swimming_icon },
      { name: "SERFING", icon: Serfing_icon },
    ],
  },
  {
    name: "MUSIC",
    icon: Music_icon,
    subActivities: [
      { name: "SINGING", icon: Singing_icon },
      { name: "DANCING", icon: Dancing_icon },
    ],
  },
  {
    name: "INDOOR",
    icon: Indoor_icon,
    subActivities: [
      { name: "VIDEO GAME", icon: Gaming_icon },
      { name: "BOARD GAME", icon: Boardgame_icon },
    ],
  },
  {
    name: "ADVENTURE",
    icon: Adventure_icon,
    subActivities: [
      { name: "HIKING", icon: Hiking_icon },
      { name: "BIKING", icon: Biking_icon },
      { name: "DIVING", icon: Diving_icon },
    ],
  },
  {
    name: "CREATE",
    icon: Create_icon,
    subActivities: [
      { name: "PHOTOGRAPHY", icon: Photography_icon },
      { name: "DRAWING", icon: Drawing_icon },
    ],
  },
];
function Activity() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  // เพิ่มกิจกรรมให้ user โดยคลิกที่ subActivity
  async function addUserActivity(activityName) {
    try {
      // 1️⃣ ดึง activity_id จากชื่อกิจกรรม
      const resAct = await fetch(`/api/activity/by-name?name=${encodeURIComponent(activityName)}`);
      if (!resAct.ok) throw new Error(`Activity API error: ${resAct.status}`);
      const activity = await resAct.json();

      if (!activity?.activity_id) {
        console.error("Activity not found:", activityName);
        return;
      }

      // 2️⃣ เพิ่ม userActivity
      const resUA = await fetch("http://localhost:3000/api/activity/useractivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // เปลี่ยนเป็น user_id จริง
          activity_id: activity.activity_id,
          preference_level: 1,
        }),
      });
      if (resUA.status === 409) {
        console.warn('UserActivity already exists for this user/activity');
        return;
      }

      if (!resUA.ok) throw new Error(`UserActivity API error: ${resUA.status}`);
      const data = await resUA.json();
      console.log("✅ Added activity:", data);
    } catch (err) {
      console.error("❌ Error adding activity:", err);
    }
  }

  return (
    <div className="display">
      {!selectedActivity ? (
        <div className="activity_icon">
          {mainActivities.map((act, idx) => (
            <div
              key={idx}
              className="activity_card"
              onClick={() => setSelectedActivity(act)}
            >
              <img src={act.icon} alt={act.name} />
              <div className="activity_name">{act.name}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="sub_activity_container">
          <button className="back_btn" onClick={() => setSelectedActivity(null)}>
            <img src={Back} alt="Back" />
          </button>

          <div className="sub_activity_icon">
            {selectedActivity.subActivities.map((sub, idx) => (
              <div
                key={idx}
                className="sub_card"
                onClick={() => addUserActivity(sub.name)} // คลิกเพื่อเพิ่ม activity
                style={{ cursor: "pointer" }}
              >
                <img src={sub.icon} alt={sub.name} />
                <div className="sub_name">{sub.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Activity;