import "./page.scss";

import NavBar from "@components/navbar/navbar";

export default function Page() {
    return (
        <>
            <NavBar />
            <div className="img-container">
                <div className="inner-container">
                    <h1>NovelNest</h1>
                    <p>Where Stories Nest, Imaginations Take Wing</p>
                    <a className="btn" href="#">
                        GET STARTED
                    </a>
                </div>
            </div>
        </>
    );
}
