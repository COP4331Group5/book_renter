"use client";
/* eslint-disable @next/next/no-img-element */
export default function PageSlice({ sliceUrl }) {
    return (
        <img
            src={sliceUrl}
            alt="Image Slice"
            style={{ width: "100%", height: "auto" }}
        ></img>
    );
}
