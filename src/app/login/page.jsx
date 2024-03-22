import AuthForm from "./auth_form";
import NavBar from "@components/navbar/navbar";

export const metadata = {
    title: "Novel Nest - Login"
};

export default function Login() {
    return (
        <div className="container flex-col">
            <NavBar></NavBar>
            <div className="width-full height-full mt-8 flex flex-col items-center justify-start gap-[25vh]">
                <main>
                    <AuthForm></AuthForm>
                </main>
            </div>
        </div>
    );
}
