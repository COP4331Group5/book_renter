import AuthForm from "./auth_form";
import NavBar from "@/app/components/navbar/navbar";

export const metadata = {
    title: "Novel Nest - Login"
};

export default function Login() {
    return (
        <body>
            <NavBar></NavBar>
            <main>
                <div className="img-container">
                    <AuthForm></AuthForm>
                </div>
            </main>
        </body>
    );
}
