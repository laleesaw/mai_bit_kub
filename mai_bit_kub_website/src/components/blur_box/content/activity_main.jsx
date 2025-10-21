import React, { useState } from "react";
import "./activity_main.css";
import Sport_icon from "../../../assets/sport.png";
import Music_icon from "../../../assets/music.png";
import Indoor_icon from "../../../assets/indoor.png";
import Adventure_icon from "../../../assets/adventure.png";
import Back from "../../../assets/back.png";

import Create_icon from "../../../assets/create.png";


import Pingpong_icon from "../../../assets/pingpong.png";
import Boxing_icon from "../../../assets/boxing.png";
import Add_activity_icon from "../../../assets/add_activity.png";

const mainActivities = [
  {
    name: "SPORT",
    icon: Sport_icon,
    subActivities: [
      { name: "PINGPONG", icon: Pingpong_icon },
      { name: "BOXING", icon: Boxing_icon },
    ],
  },
  {
    name: "MUSIC",
    icon: Music_icon,
    subActivities: [],
  },
  {
    name: "INDOOR",
    icon: Indoor_icon,
    subActivities: [],
  },
  {
    name: "ADVENTURE",
    icon: Adventure_icon,
    subActivities: [],
  },
  {
    name: "CREATE",
    icon: Create_icon,
    subActivities: [],
  },
];

function Activity() {
  const [selectedActivity, setSelectedActivity] = useState(null);

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
            <img src = {Back}></img>
            </button>
          <div className="sub_activity_icon">
            {selectedActivity.subActivities.map((sub, idx) => (
              <div key={idx} className="sub_card">
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