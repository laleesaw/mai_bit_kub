import './Header.css'
import menu_first from '../../assets/menu.png'
import menu_second from '../../assets/menu_second.png'
import profilePic from '../../assets/logo_mai_bit_kub.png'
import home_first from '../../assets/home_first.png'
import home_second from '../../assets/home_second.png'
import notice_first from '../../assets/notice_first.png'
import notice_second from '../../assets/notice_second.png'
import profile_first from '../../assets/profile_first.png'
import profile_second from '../../assets/profile_second.png'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Main_page from '../../pages/main_page.jsx'


function button(first, second){
    return(
        <div className = "button">
            <img id = "first" src = {first}></img>
            <img id = "second" src = {second}></img>
        </div>
    );
}

function Header(){
    
    return(
        
        <header>
            <Link to="/" className="logo">
                <img id="logo" src={profilePic} alt="Logo" />
            </Link>
            <div className='button_bar'>
                <Link to="/" className="home_button">
                    {button(home_first, home_second)}
                </Link>
                <div className="notice_button">{button(notice_first, notice_second)}</div>
                <div className="profile_button">{button(profile_first, profile_second)}</div>
            </div>
        </header>
    )
}
export default Header