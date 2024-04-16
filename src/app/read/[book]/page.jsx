import { Maybe } from "@/lib/fp";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Sidebar from "../../components/sidebar/sidebar";
import PageReader from "../../components/reader/page_reader";
import "../../components/reader/page_reader.scss";

export const metadata = {
    title: "Novel Nest - Reader"
};

const bookPages = [
    "https://scrappystickyinkymess.files.wordpress.com/2013/08/aiwplain1.jpg",
    "https://www.thebookdesigner.com/wp-content/uploads/2018/04/type-color-filosofia-12on18-6x9-96-2.jpg",
    "https://i.pinimg.com/originals/1a/6c/8c/1a6c8c7576570ffdc1e525336f291fe8.jpg"
];

const bookId = "bookId";

export default function Reader({ params }) {
    const cookieStore = cookies();

    /** @type {Maybe<RequestCookie>} */
    const sessionToken = new Maybe(cookieStore.get("session"));

    /*
    if (sessionToken.isNone) {
        redirect(`/login?read=${params.book}`);
    }
    */

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <PageReader pages={bookPages} bookId={bookId} />
            </div>
        </div>
    );
}
