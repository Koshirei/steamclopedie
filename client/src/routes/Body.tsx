import React, { useEffect, useState } from "react";
import "./Body.css";

interface IApiProps {
    appid: string;
    name: string;
    release_date: string;
    background: string;
    header_image: string;
    platforms: string;
    detailed_description: string;
    screenshots: string;
    minimum: string;

}

interface BodyProps {
    api: IApiProps[];
}

function Header(props: BodyProps) {
    function renderScreenshots() {
        let b: any = props.api[0].screenshots
        
        return b?.map((value: any) => {
            return <img src={value.path_thumbnail}></img>
            
        });
        
    }

    useEffect(()=>{

        let t:any=document.getElementById('description');
        t.innerHTML=props.api[0].detailed_description;
    })

    return (
        <div id="body">
            
        

            <div id="description">
                
            </div>
            <p>{props.api[0].minimum}</p>

            <div id="screenshots_grid">
            {renderScreenshots()}
        </div>
            
        </div>
    );
}

export default Header;
