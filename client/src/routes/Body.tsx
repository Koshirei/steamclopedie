import React, { useEffect, useState } from "react";

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

    function renderPlatforms() {
        let a: any = props.api[0].platforms?.split(";");        

        return a?.map((value: any) => {
            return <p>{value}</p>;
        });
    }

    return (
        <>
            <p>{props.api[0].detailed_description}</p>
            <p>{props.api[0].minimum}</p>
            <img src={props.api[0].background}></img>
            {renderPlatforms()}
            {renderScreenshots()}
           
        </>
    );
}

export default Header;