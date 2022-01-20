import { application } from "express";
import React, {useState, useEffect} from "react";

import "./Header.css";

interface HeaderProps{
    api: any;
}

function Header(props: HeaderProps) {

    console.log(props.api[0].name);   

    return (
        <div id="header_block">
            <div id="header_block_gauche">
                <img className="game_image_own_page" src={props.api[0].header_image}/>
            </div>

            <div id="header_block_droite">
                <h1 className="headline_game_title">{props.api[0].name}</h1>                
            </div>
        </div>
    
    );
}

export default Header;