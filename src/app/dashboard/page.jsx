import Sidebar from "@components/sidebar/sidebar";
import Body from "@components/body/body";

export default function Dashboard() {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <Body />
        </div>
    );
}
