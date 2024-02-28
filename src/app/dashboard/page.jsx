import Sidebar from "../components/sidebar/sidebar";
import Body from "../components/body/body";

export default function Dashboard() {
    return (
        <div className="container">
            <Sidebar />
            <Body />
        </div>
    );
}
