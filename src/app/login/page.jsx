import AuthForm from "./auth_form";

export const metadata = {
    title: "Novel Nest - Login"
};

export default function Login() {
    return (
        <div className="width-full height-full mt-8 flex flex-col items-center justify-start gap-[25vh]">
            <main>
                <AuthForm />
            </main>
        </div>
    );
}
