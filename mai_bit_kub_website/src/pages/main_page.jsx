import "./main_page.css"
import Profile from "../assets/profile_icon.png"

function box_content(width_ratio, height_ration){
    return(
        <div class = "box">
            
        </div>
    );
}

function main_page(){
    return(
        <div class = "main_monitor">
            <div class = "top">            
                <div class = "profile">
                    <img id = "profile_icon" src = {Profile}></img>
                    <div class = "username">USERNAME</div>
                </div>
                <div class = "activity"></div>
            </div>
            <div class = "bottom">
                <div class = "friends"></div>
                <div class = "available"></div>
            </div>

        </div>
    );
}
export default main_page;