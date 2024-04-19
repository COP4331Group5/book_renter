import { Montserrat } from "next/font/google";
import "./globals.scss";
import NavBar from "@components/navbar/navbar";
import { cookies } from "next/headers";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Novel Nest",
    description: "Lorem Ipsum"
};

export default function RootLayout({ children }) {
    const cookieStore = cookies();

    const sessionExists = cookieStore.get("session_exists") !== undefined;

    return (
        <html lang="en">
            <body className={montserrat.className}>
                <div className="root">
                    <NavBar sessionExists={sessionExists} />
                    {children}
                </div>
            </body>
        </html>
    );
}
