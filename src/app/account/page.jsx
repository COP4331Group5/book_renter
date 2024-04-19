import { TabBar, Tab } from "@components/tabbar/tabbar";
import UpdateEmailForm from "./update_email";
import BillingHistory from "./billing_history";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function Account() {
    const cookieStore = cookies();
    const sessionResult = await getSession(cookieStore);
    if (sessionResult.isErr) {
        redirect("/login");
    }

    const session = sessionResult.unwrap();

    const emailAddress = cookieStore.get("email_address");

    return (
        <div className="grow p-4">
            <TabBar>
                <Tab name="Settings">
                    <UpdateEmailForm emailAddress={emailAddress} />
                </Tab>
                <Tab name="Billing">
                    <BillingHistory userId={session.userId} />
                </Tab>
            </TabBar>
        </div>
    );
}
