import React from "react";
import "./body.scss";
import Top from "./top/top";
import Listing from "./listing/listing";
import Activity from "./activity/activity";

export default function Body() {
    return (
        <div className="main-content">
            <Top />

            <div className="bottom flex items-center">
                <Listing />
                <Activity />
            </div>
        </div>
    );
}
