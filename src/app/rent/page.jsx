import Sidebar from "../components/sidebar/sidebar";
import SubscribeBody from "../components/subscribe/subscribe_body";

export default function Store() {
    return (
        <div className="container flex-row">
            <Sidebar />
            <SubscribeBody />
        </div>
    );
}
