import "./activity_main.css"
import Pingpong_icon from "../../../assets/pingpong.png"
import Boxing_icon from "../../../assets/boxing.png"
import Add_activity_icon from "../../../assets/add_activity.png"

// function container_activity(){
//     return(

//     );
// }

function Activity(){
    return(
        <div className = "display">
            
            <div className = "activity_icon"> 
                <div>
                    <img src = {Pingpong_icon}></img>           
                </div>   
                <div>
                    <img src = {Boxing_icon}></img>  
                </div> 
                <div>
                    <img src = {Add_activity_icon}></img>           
                </div>          
<<<<<<< HEAD
=======
                <div>
                    <img src = {Add_activity_icon}></img>           
                </div>    
>>>>>>> 153c70e98a9e9b7819a23ddd33c6a475b926bdad
            </div>
            <div className = "activity_name">BOXING</div>

        </div>
            
    );
}

export default Activity;