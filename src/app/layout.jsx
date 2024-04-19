import { Montserrat } from "next/font/google";
import "./globals.scss";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Novel Nest",
    description: "Lorem Ipsum"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>
                <div className="root">{children}</div>
            </body>
        </html>
    );
}
