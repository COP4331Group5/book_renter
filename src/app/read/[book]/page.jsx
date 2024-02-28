import { Maybe } from "@/lib/fp";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
    title: "Novel Nest - Reader"
};

export default function Reader({ params }) {
    const cookieStore = cookies();

    /** @type {Maybe<RequestCookie>} */
    const sessionToken = new Maybe(cookieStore.get("session"));

    if (sessionToken.isNone) {
        redirect(`/login?read=${params.book}`);
    }

    return <main></main>;
}
