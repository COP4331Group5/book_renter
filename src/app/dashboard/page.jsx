import "../globals.css";
import Sidebar from "../components/sidebar/sidebar";
import Body from "../components/body/body";

export function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <Body />
        </div>
    );
}

export default Dashboard;
