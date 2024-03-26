import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function BookCard({ data }) {
    const router = useRouter();

    const goToLogin = () => {
        console.log("Redirecting to login page");
        redirect(router, "/login");
    };

    return (
        <div className="m-2 flex h-fit w-[200px] flex-col gap-2 rounded-md bg-gray-800 p-4">
            <img className="max-w-[120px]" src={data.image} />
            <div>
                <p className="font-bold">{data.name}</p>
                <p className="text-slate-300">{data.author}</p>
            </div>
            <div className="flex-grow" />
            <Link
                href={"/login"}
                className="rounded-md bg-slate-600 p-2 text-sm"
            >
                Rent Now
            </Link>
        </div>
    );
}
