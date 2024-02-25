import "./page.scss";

export const metadata = {
    title: "Novel Nest - Login"
};

function login() {}

function register() {}

function redirectToPage() {}

export default function Login() {
    return (
        <body>
            <nav>
                <a href="home.html">Home</a>
                <a href="#">Shop</a>
                <a href="#">About Us</a>
                <a href="login.html">Login</a>
            </nav>
            <main>
                <div className="img-container">
                    <div id="login_form" className="login-page">
                        <div className="form-box">
                            <div className="button-box">
                                <div id="btn"></div>
                                <button
                                    type="button"
                                    onClick={login()}
                                    className="toggle-btn"
                                >
                                    Log In
                                </button>
                                <button
                                    type="button"
                                    onClick={register()}
                                    className="toggle-btn"
                                >
                                    Register
                                </button>
                            </div>
                            <div id="login" className="input-group-login">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Email Id"
                                    required
                                />
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Enter Password"
                                    required
                                />
                                <input type="checkbox" className="check-box" />
                                <span>Remember Password</span>
                                <button
                                    type="button"
                                    className="submit-btn"
                                    onClick={redirectToPage()}
                                >
                                    Log In
                                </button>
                            </div>
                            <form
                                id="register"
                                className="input-group-register"
                            >
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="First Name"
                                    required
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="Last Name "
                                    required
                                />
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder="Email Id"
                                    required
                                />
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Enter Password"
                                    required
                                />
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder="Confirm Password"
                                    required
                                />
                                <input type="checkbox" className="check-box" />
                                <span>I agree to the terms and conditions</span>
                                <button type="submit" className="submit-btn">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </body>
    );
}
