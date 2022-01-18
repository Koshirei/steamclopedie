import { application } from "express";
import React, {useState, useEffect} from "react";


interface HeaderProps{
    t: any[];
}

function Header(props: HeaderProps) {

   console.log(props.t[0].name);
   

    return (
    <>
       <p>{props.t[0]}</p>
    </>
    );
}

export default Header;