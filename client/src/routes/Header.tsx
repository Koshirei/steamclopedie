import { platform } from "os";
import React, { useEffect, useState } from "react";

interface IApiProps {
    appid: string;
    name: string;
    release_date: string;
    background: string;
    header_image: string;
    platforms: string;
  
}

interface HeaderProps {
    api: IApiProps[];
}

function Header(props: HeaderProps) {
    return (
        <>
            <img src={props.api[0].header_image}></img>
            <p>{props.api[0].name}</p>
            <p>{props.api[0].release_date}</p>
        </>
    );
}

export default Header;