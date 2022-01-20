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

    function renderDeveloper() {
        let a: any = props.api[0].developer?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p > - {value}&nbsp; </p>; //css dans header.css
        });
    }
    function renderPublisher() {
        let a: any = props.api[0].publisher?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p > - {value}&nbsp; </p>; //css dans header.css
        });
    }
    

    function renderPlatforms() {
        let a: any = props.api[0].platforms?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p className="game_plateform_inline_block"> - {value}&nbsp; </p>; //css dans header.css
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

    function renderCategories() {
        let a: any = props.api[0].categories?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p > - {value}&nbsp; </p>; //css dans header.css
        });
    }

    function renderGenres() {
        let a: any = props.api[0].genres?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p > - {value}&nbsp; </p>; //css dans header.css
        });
    }

    function renderUserTags() {
        let a: any = props.api[0].steamspy_tags?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p > - {value}&nbsp; </p>; //css dans header.css
        });
    }


    return (
        <div id="sidebar">
            <div id="sidebar_short-description" className="sidebar_block">
                <p>{props.api[0].short_description}</p>
            </div>

            <div id="sidebar_developer-publisher" className="sidebar_block">
                <p>Developer : <div >{renderDeveloper()}</div></p><br/>
                <p>Publisher : <div >{renderPublisher()}</div></p>
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

            <div id="sidebar_date_platform" className="sidebar_block">
                <p>Categories: <br/> {renderCategories()}</p><br/><br/>
                <p>Genres: <br/> {renderGenres()}</p><br/><br/>
                <p>User Tags:{renderUserTags()}</p>
            </div>
        </div>
    );
}

export default Sidebar;