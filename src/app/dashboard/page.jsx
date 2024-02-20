import "../globals.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Body from "../Components/Body/Body";

export function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <Body />
        </div>
    );
}

export default Dashboard;
