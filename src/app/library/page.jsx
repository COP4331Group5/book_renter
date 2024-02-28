import Sidebar from "../components/sidebar/sidebar";
import LibraryBody from "../components/library/library_body";

export default function Library() {
    return (
        <div className="container">
            <Sidebar />
            <LibraryBody />
        </div>
    );
}
