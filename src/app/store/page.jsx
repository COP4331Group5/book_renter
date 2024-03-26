import NavBar from "../components/navbar/navbar";
import StoreBody from "../components/store/store_body";

export const metadata = {
    title: "Novel Nest - Store"
};

export default function Store() {
    return (
        <div className="container flex-col">
            <NavBar />
            <StoreBody />
        </div>
    )
}
