import "./friend_main.css"
import Profile_friend from "../../../assets/profile_icon_friend.png"
import Add_friend from "../../../assets/add_friend.png"


function Friend(){
    return(
        <div className = "profile_friend">
            <img src = {Profile_friend}></img>
            <img src = {Profile_friend}></img>
            <img src = {Add_friend}></img>
        </div>
    );
}

export default Friend;