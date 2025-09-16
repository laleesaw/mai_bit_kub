import './Home.css'
import Header from '../components/Head/Header.jsx'
import Button from "../components/button/button.jsx"
function Home() {
    return(
        <div>
            <h1>MAI BIT KUB</h1>
            <p>It’s often hard to meet up with friends because of different schedules, preferences, and budgets. That’s why we created Mai Bid Krub — a website that helps find the best time, activity, and budget for everyone.</p>
            <div class = "navigate-to">
                <div class = "login"><Button type = "main" text = "LOGIN"></Button></div>
                <div class = "register"><Button type = "secondary" text = "REGISTER"></Button></div>
            </div>
        </div>
    );
}
export default Home
