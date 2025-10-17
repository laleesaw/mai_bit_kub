<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./available_main.css";

function Available() {
  // เดือนปัจจุบัน (สำหรับ activeStartDate และปุ่มเลื่อนเดือน)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // เก็บวันที่เลือกหลายวัน
  const [selectedDates, setSelectedDates] = useState([]);

  // เก็บเวลาแต่ละวัน
  const [timeSelections, setTimeSelections] = useState({});

  // วันที่เลือกล่าสุดเพื่อแสดงแถบเวลา
  const [currentDate, setCurrentDate] = useState(null);

  // สร้างช่วงเวลา 24 ชั่วโมง
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);

  // เลือกวัน
  const handleDayClick = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    setCurrentDate(dateStr);

    setSelectedDates((prev) => {
      if (prev.includes(dateStr)) {
        return prev.filter((d) => d !== dateStr); // ยกเลิกวัน
      } else {
        return [...prev, dateStr]; // เลือกวันใหม่
      }
    });
  };

  // เลือกเวลา
  const handleTimeClick = (dateStr, time) => {
    setTimeSelections((prev) => {
      const currentTimes = prev[dateStr] || [];
      if (currentTimes.includes(time)) {
        return { ...prev, [dateStr]: currentTimes.filter((t) => t !== time) };
      } else {
        return { ...prev, [dateStr]: [...currentTimes, time] };
      }
    });
  };

  // ปุ่มเลื่อนเดือน
  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
  };

  return (
    <div className="display-calendar">
      <div className="calendar-layout">
        {/* แถบเดือนซ้าย */}
        <div className="month-selector">
          <button onClick={handlePrevMonth} className="arrow-btn">▲</button>
          <div className="month-name">
            {currentMonth.toLocaleString("eng", { month: "long", year: "numeric" })}
          </div>
          <button onClick={handleNextMonth} className="arrow-btn">▼</button>
        </div>

        {/* ปฏิทินวันตรงกลาง */}
        <div className="calendar-container">
          <Calendar
            onClickDay={handleDayClick}
            value={null} // ใช้การเลือกหลายวันเอง
            activeStartDate={currentMonth}
            onActiveStartDateChange={({ activeStartDate }) => setCurrentMonth(activeStartDate)}
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              return timeSelections[dateStr]?.length > 0 ? "selected-day" : "";
            }}
          />
        </div>

        {/* แถบเวลา ขวา */}
        <div className="time-selector">
          {!currentDate && <div style={{ color: "white" }}>Select Day</div>}
          {currentDate && (
            <div className="time-list">
              <div className="time-date">{currentDate}</div>
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${
                    timeSelections[currentDate]?.includes(time) ? "selected" : ""
                  }`}
                  onClick={() => handleTimeClick(currentDate, time)}
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad
    </div>
  );
}

export default Available;
