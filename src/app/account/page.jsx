
import Sidebar from "@components/sidebar/sidebar";
import { TabBar, Tab } from "@components/tabbar/tabbar";
import UpdateEmailForm from "./update_email";

export default function Account() {
    return <div className="flex w-full h-full">
        <Sidebar />
        <div className="grow p-4">
            <TabBar>
                <Tab name="Settings">
                    <h2>Current Email</h2>
                    <p>jonah</p>
                    <UpdateEmailForm />
                </Tab>
                <Tab name="Billing">
                    <h1>Billing</h1>
                </Tab>
            </TabBar>
        </div>
    </div>;
}
