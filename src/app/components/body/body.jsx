import React from "react";
import "./body.scss";
import Top from "./top/top";
import Listing from "./listing/listing";

export default function Body() {
    return (
        <div className="main-content">
            <Top />

            <div className="bottom basis-full items-center">
                <Listing />
            </div>
        </div>
    );
}
