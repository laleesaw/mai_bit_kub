import './Home.css'
import Header from '../components/Head/Header.jsx'
import Button from "../components/button/button.jsx"
function Home() {
    return(
        <div>
            <h1>MAI BIT KUB</h1>
            <p>It’s often hard to meet up with friends because of different schedules, preferences, and budgets. That’s why we created Mai Bid Krub — a website that helps find the best time, activity, and budget for everyone.</p>
            <div class = "navigate-to">
                <div class = "SIGN-IN"><Button type = "main" text = "SIGN IN"></Button></div>
                <div class = "SIGN-UP"><Button type = "secondary" text = "SIGN UP"></Button></div>
            </div>
        </div>
    );
}
export default Home
