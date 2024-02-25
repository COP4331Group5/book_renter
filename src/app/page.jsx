import "./page.scss";

export default function Page() {
    return (
        <body>
            <header>
                <nav>
                    <a href="home.html">Home</a>
                    <a href="shop1.html">Shop</a>
                    <a href="#">About Us</a>
                    <a href="login.html">Login</a>
                </nav>
            </header>

            <div className="img-container">
                <div className="inner-container">
                    <h1>NovelNest</h1>
                    <p>Where Stories Nest, Imaginations Take Wing</p>
                    <a className="btn" href="#">
                        GET STARTED
                    </a>
                </div>
            </div>
        </body>
    );
}
