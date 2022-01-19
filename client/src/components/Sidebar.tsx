import { application } from "express";
import React, { useEffect } from "react";

import IApiProps from "../types/IApiProps";

import "./Sidebar.css";

interface SidebarProps {
    api: IApiProps[];
}

function Sidebar(props: SidebarProps){

    useEffect(() => {
        let review_bar: any = document.getElementById("review-bar");
        let positive_ratings: any = document.getElementById("review-bar_positive-ratings");

        let a: number = parseInt(props.api[0].positive_ratings);
        let b: number = parseInt(props.api[0].negative_ratings);


        positive_ratings.style.width = `${(a / (a + b))*review_bar.offsetWidth}px`;        
    });

    function renderReviewBar() {
        return (
            <div id="review-bar">
                <div id="review-bar_positive-ratings">

                </div>

                <div id="review-bar_negative-ratings">
                    
                </div>
            </div>
        )
    }

    return (
        <div id="sidebar">
            <div id="sidebar_short-description" className="sidebar_block">
                <p>{props.api[0].short_description}</p>
            </div>

            <div id="sidebar_developer-publisher" className="sidebar_block">
                <p>Developer : {props.api[0].developer}</p>
                <p>Publisher : {props.api[0].publisher}</p>
            </div>

            <div id="sidebar_review-bar" className="sidebar_block">
                <p>Positive ratings : {props.api[0].positive_ratings}</p>
                <p>Negative ratings : {props.api[0].negative_ratings}</p>
                {renderReviewBar()}
            </div>
        </div>
    );
}

export default Sidebar;