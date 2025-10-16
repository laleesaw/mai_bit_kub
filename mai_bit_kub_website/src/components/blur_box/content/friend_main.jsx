import "./friend_main.css"
import Profile_friend from "../../../assets/profile_icon_friend.png"

function Friend(){
    return(
        <div className = "profile_friend">
            <img src = {Profile_friend}></img>
            <img src = {Profile_friend}></img>
            <img src = {Profile_friend}></img>
        </div>
    );
}

export default Friend;