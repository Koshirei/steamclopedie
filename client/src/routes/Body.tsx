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
    mac_requirements: string;
    linux_requirements: string;
    pc_requirements:string;
    movies:string;
}

interface BodyProps {
    api: IApiProps[];
}

function Header(props: BodyProps) {
    
    function renderScreenshots() {
        
        let b: any = props.api[0].screenshots;
        return b?.map((value: any) => {
            return <img src={value.path_thumbnail}></img>
            
        });
        
    }
    function renderMovies(){
        let a: any = props.api[0].movies;
        console.log(a);
        return 0
        
    }

    useEffect(()=>{
        let t:any=document.getElementById('description');
        t.innerHTML=props.api[0].detailed_description;
    });
    useEffect(()=>{
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].pc_requirements;
        if (t.innerHTML==="[]"){
            t.innerHTML="";
        }
    })

    function setRequirementPc(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].pc_requirements;
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Windows";
        }
     }
     function setRequirementMac(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].mac_requirements;
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Mac";
        }
     }
     function setRequirementLinux(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].linux_requirements;
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Linux";
        }
     }

    
    
    return (
        <div id="body">
            
            <div id="screenshots_grid">
            <video id="movies" controls>
                    {renderMovies()}
                </video>
                {renderScreenshots()}
            </div>
            <div>
            
            </div>

            <div id="description"></div>
            <button onClick={setRequirementPc}>Windows</button>
            <button onClick={setRequirementMac}>Mac</button>
            <button onClick={setRequirementLinux}>Linux</button>
            <table className="requirement_table">
                <thead>
                    <tr>
                        <th>System Requirements</th>
                    </tr>
                </thead>
                 <tbody>
                     <tr>
                         <td id="pc_requirements"></td>
                     </tr>
                 </tbody>
             </table>

            
            
        </div>
    );
}

export default Header;
