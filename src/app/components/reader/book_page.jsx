import { useEffect, useState } from "react";
import PageSlice from "./slice";
import { isSomething } from "@/lib/fp";

export default function BookPage({ cache, pageId }) {
    const [sliceUrls, setSliceUrls] = useState([]);

    useEffect(() => {
        console.log(cache.current);
        cache.current.load(pageId).then((sliceUrls) => {
            if (isSomething(sliceUrls)) {
                setSliceUrls(sliceUrls);
            }
        });
    }, [pageId, cache]);

    return (
        <div>
            {sliceUrls.map((e, i) => (
                <PageSlice key={i} sliceUrl={e} />
            ))}
        </div>
    );
}
