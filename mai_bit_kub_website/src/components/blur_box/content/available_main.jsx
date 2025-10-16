// import "./available_main.css"
// import Avai_icon from "../../../assets/available.png"
// import Unavai_icon from "../../../assets/unavailable.png"

// function Checkbox() {
//   return (
//     <label className="img-checkbox">
//       <input type="checkbox" id="cb1" />
//       <img src={Unavai_icon} className="unchecked" alt="Available" />
//       <img src={Avai_icon} className="checked" alt="Unavailable" />
//     </label>
//   );
// }


// function Available(){
//     return(
//         <div>
//             {Checkbox()}
//         </div>
//     );
// }

// export default Available;




import React from "react";
import "./available_main.css";
// import Avai_icon from "../../../assets/available.png";
// import Unavai_icon from "../../../assets/unavailable.png";

function Checkbox({ dayNumber }) {
  return (
    <label className="img-checkbox">
      {/* <input type="checkbox" />
      <div className="img-wrapper">
        <img src={Unavai_icon} className="unchecked" alt="Unavailable" />
        <img src={Avai_icon} className="checked" alt="Available" />
        <span className="date-num">{dayNumber}</span>
      </div> */}
    </label>
  );
}

function Available() {
  const daysHeader = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDays = 31;

  return (
    <div className="calendar-wrapper">
      {/* <div className="calendar-header">
        {daysHeader.map((day, index) => (
          <div key={index} className="day-header">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {[...Array(totalDays)].map((_, index) => (
          <Checkbox key={index} dayNumber={index + 1} />
        ))}
      </div> */}
    </div>
  );
}

export default Available;
