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
    useEffect(() => {
        let a: any = document.getElementById("render_developer");
        a.innerHTML=props.api[0].developer;
        a.innerHTML=a.innerHTML.replaceAll(";"," - ")
    });
    useEffect(() => {
        let a: any = document.getElementById("render_publisher");
        a.innerHTML=props.api[0].publisher;
        a.innerHTML=a.innerHTML.replaceAll(";"," - ")
    });
    

    function renderPlatforms() {
        let a: any = props.api[0].platforms?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p className="game_plateform_inline_block"> {value}&nbsp; </p>; //css dans header.css
        });
    }

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
                <p>Developer : <div id="render_developer"></div></p><br/>
                <p>Publisher : <div id="render_publisher"></div></p>
            </div>

            <div id="sidebar_review-bar" className="sidebar_block">
                <p>Positive ratings &nbsp;: {props.api[0].positive_ratings}</p>
                <p>Negative ratings : {props.api[0].negative_ratings}</p>
                {renderReviewBar()}
            </div>

            <div id="sidebar_date_platform" className="sidebar_block">
                <p>Release date: <br/> {props.api[0].release_date}</p><br/><br/>
                <p>Platforms: <br/> {renderPlatforms()}</p>
            </div>
        </div>
    );
}

export default Sidebar;