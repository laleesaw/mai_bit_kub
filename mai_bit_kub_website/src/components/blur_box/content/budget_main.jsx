import "./budget_main.css"
import Budget_main from "../../../assets/budget_icon.png"

function Budget(){
    return(
        <div className = "budget">
            <img src = {Budget_main}></img>
            <div className = "amount">amount</div>
        </div>
    );
}

export default Budget;