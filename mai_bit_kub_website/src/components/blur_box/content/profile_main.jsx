import "./profile_main.css"
import Profile_icon from "../../../assets/profile_icon.png"

function Profile(){
    return(
        <div className = "profile">
            <img src = {Profile_icon}></img>
            <div className = "username">USERNAME</div>
        </div>
    );
}

export default Profile;