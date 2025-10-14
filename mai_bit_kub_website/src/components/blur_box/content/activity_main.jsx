import "./activity_main.css"
import Pingpong_icon from "../../../assets/pingpong.png"
import Boxing_icon from "../../../assets/boxing.png"
import Add_activity_icon from "../../../assets/add_activity.png"


function Activity(){
    return(
        <div className = "display"> 
            <div>
                <img src = {Pingpong_icon}></img>           
            </div>   
            <div>
                <img src = {Boxing_icon}></img>  
            </div> 
            <div>
                <img src = {Add_activity_icon}></img>           
            </div>          
        </div>
            
    );
}

export default Activity;