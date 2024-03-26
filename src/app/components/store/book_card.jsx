import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

export default function BookCard({
    data
}) {
    const router = useRouter();

    const goToLogin = () => {
        console.log("Redirecting to login page");
        redirect(router, "/login");
    }

    return (
        <div className="flex flex-col gap-2 h-fit w-[200px] bg-gray-800 m-2 p-4 rounded-md">
            <img className="max-w-[120px]" src={data.image} />
            <div>
                <p className="font-bold">{data.name}</p>
                <p className="text-slate-300">{data.author}</p>
            </div>
            <div className="flex-grow" />
            <Link href={"/login"} className="bg-slate-600 rounded-md p-2 text-sm">Rent Now</Link>
        </div>
    )
}
