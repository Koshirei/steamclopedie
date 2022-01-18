import { application } from "express";
import React, {useState, useEffect} from "react";

import "./Header.css";

interface HeaderProps{
    api: any;
}

function Header(props: HeaderProps) {

    console.log(props.api[0].name);
    

    function renderPlatforms() {
        let a: any = props.api[0].platforms?.split(";");
        
        console.log(a?.length);
        if ( a != undefined){
            console.log(a[0]);
        }
        return a?.map((value: any) => {
            
            return <p className="game_plateform_inline_block"> {value+", "} </p>;
        });
    }
   

    return (
        <div id="header_block">
            <div id="header_block_gauche">
                <img className="game_image_own_page" src={props.api[0].header_image}/>
            </div>

            <div id="header_block_droite">
                <h1 className="headline_game_title">{props.api[0].name}</h1>
                <p className="paragraph_game_header">Released {props.api[0].release_date} -</p>
                <p className="game_plateforms">For {renderPlatforms()} </p>
            </div>
        </div>
    
    );
}

export default Header;