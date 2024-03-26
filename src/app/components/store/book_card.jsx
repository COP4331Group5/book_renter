

export default function BookCard({
    data
}) {
    return (
        <div className="flex flex-col gap-2 h-fit w-[200px] bg-gray-800 m-2 p-4 rounded-md">
            <img className="max-w-[120px]" src={data.image} />
            <div>
            <p className="font-bold">{data.name}</p>
            <p className="text-slate-300">{data.author}</p>
            </div>
            <div className="flex-grow" />
            <button className="bg-blue-300">Rent Now</button>
        </div>
    )    
}
