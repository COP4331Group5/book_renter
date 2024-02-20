import "../globals.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import LibraryBody from "../Components/Library/LibraryBody";

export function Library() {
    return (
        <div className="container">
            <Sidebar />
            <LibraryBody />
        </div>
    );
}

export default Library;
