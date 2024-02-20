import React from "react";
import "./body.scss";
import Top from "./top/top";
import Listing from "./listing/listing";
import Activity from "./activity/activity";

const Body = () => {
    return (
        <div className="mainContent">
            <Top />

            <div className="bottom flex">
                <Listing />
                <Activity />
            </div>
        </div>
    );
};

export default Body;
