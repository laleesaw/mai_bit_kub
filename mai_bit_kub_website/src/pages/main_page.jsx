import "./main_page.css"
<<<<<<< HEAD
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
=======
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad
import Blur_box from "../components/blur_box/blur_box.jsx"
import Budget_content from "../components/blur_box/content/budget_main.jsx"
import Activity_content from "../components/blur_box/content/activity_main.jsx"
import Friend_content from "../components/blur_box/content/friend_main.jsx"
import Avai_content from "../components/blur_box/content/available_main.jsx"
<<<<<<< HEAD
=======



// function main_page(){
//     return(
//         <div class = "main_monitor">
//             <div class = "top">            
//                 <div class = "profile">
//                     <img id = "profile_icon" src = {Profile}></img>
//                     <div class = "username">USERNAME</div>
//                 </div>
//                 <div class = "activity"></div>
//             </div>
//             <div class = "bottom">
//                 <div class = "friends"></div>
//                 <div class = "available"></div>
//             </div>

//         </div>
//     );
// }
// export default main_page;
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad

function main_page(){
    const navigate = useNavigate();

    useEffect(() => {
        // ตรวจสอบว่ามี username ใน localStorage หรือไม่
        const username = localStorage.getItem('username');
        if (!username) {
            navigate('/signin');
        }
    }, [navigate]);

    return(
        <div class = "box">
            <div className = "top">
                <Blur_box width = {2} height = {2}>
<<<<<<< HEAD
                    <Profile_content></Profile_content>
=======
                    <Budget_content></Budget_content>
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad
                </Blur_box>
                <Blur_box width = {2} height = {2}>
                    <Activity_content></Activity_content>
                </Blur_box>
            </div>
            <div className = "bottom">
                <Blur_box width = {8} height = {2}>
                    <Friend_content></Friend_content>
                </Blur_box>
                <Blur_box width = {1.145} height = {2}>
                    <Avai_content></Avai_content>
                </Blur_box>
            </div>
        </div>
    );
}
export default main_page;