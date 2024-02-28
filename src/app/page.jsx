import "./page.scss";

export default function Page() {
    return (
        <div class="container flex-col">
            <header>
                <nav>
                    <a href="home">Home</a>
                    <a href="shop1">Shop</a>
                    <a href="#">About Us</a>
                    <a href="login">Login</a>
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
        </div>
    );
}
