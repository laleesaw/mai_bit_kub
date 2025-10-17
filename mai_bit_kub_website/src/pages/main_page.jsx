import "./main_page.css"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Blur_box from "../components/blur_box/blur_box.jsx"
import Profile_content from "../components/blur_box/content/profile_main.jsx"
import Activity_content from "../components/blur_box/content/activity_main.jsx"
import Friend_content from "../components/blur_box/content/friend_main.jsx"
import Avai_content from "../components/blur_box/content/available_main.jsx"

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
                    <Profile_content></Profile_content>
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