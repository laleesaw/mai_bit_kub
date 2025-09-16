import "./button.css"

function base_Button(opa, stroke, text, font_color){
    return(
        <button  style = {{backgroundColor: `rgba(234, 91, 111, ${opa/100})`, borderWidth: `${stroke}px`, borderStyle: "solid", color: `#${font_color}`}}>
            {text}
        </button>
    );
}

function Button( {type, text}){
    if(type == "main"){
        return(
            <div>
                {base_Button(100, 0, text, "FFFBDE")}
            </div>
        );
    }
    if(type == "secondary"){
        return(
            <div>
                {base_Button(20, 2, text, "000000")}
            </div>
        );
    }
}
export default Button