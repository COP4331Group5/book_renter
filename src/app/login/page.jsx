import AuthForm from "./auth_form";
import NavBar from "@/app/components/navbar/navbar";

export const metadata = {
    title: "Novel Nest - Login"
};

export default function Login() {
    return (
        <div className="container">
            <div className="width-full height-full flex flex-col items-center justify-start gap-[25vh]">
                <NavBar></NavBar>
                <main>
                    <AuthForm></AuthForm>
                </main>
            </div>
        </div>
    );
}
