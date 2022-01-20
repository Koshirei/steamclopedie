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

    useEffect(()=>{
        let t:any=document.getElementById('description');
        t.innerHTML=props.api[0].detailed_description;
    });
    useEffect(()=>{
        {setRequirementPc()}
    });

    function setRequirementPc(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].pc_requirements;
        let a:any=document.getElementById('button_windows');
        {changeButtonColor(a)}
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Windows";
        }
        else{
            {requirement_emptying(t)}
        }
     }
     function setRequirementMac(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].mac_requirements;
        let a:any=document.getElementById('button_mac');
        {changeButtonColor(a)}
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Mac";
        }
        else{
            {requirement_emptying(t)}
        }
     }
     function setRequirementLinux(){
        
        let t:any=document.getElementById('pc_requirements');
        t.innerHTML=props.api[0].linux_requirements;
        let a:any=document.getElementById('button_linux');
        {changeButtonColor(a)}
        if (t.innerHTML==="[]"){
            t.innerHTML="There are no System Requirements for Linux";
        }
        else{
            {requirement_emptying(t)}
        }
     }

     function requirement_emptying(t:any){
        t.innerHTML=t.innerHTML.replaceAll("{\'minimum\': \'", "  ");
        t.innerHTML=t.innerHTML.replaceAll("\', \'recommended\': \'", "  ");
        t.innerHTML=t.innerHTML.replaceAll("\\t", "");
        t.innerHTML=t.innerHTML.replaceAll("\\n", "");
        t.innerHTML=t.innerHTML.replaceAll("\\r", "");
        t.innerHTML=t.innerHTML.replaceAll("\'}", "");
     }

     function changeButtonColor(a:any){
        let b:any = document.getElementById('button_windows');
        let c:any = document.getElementById('button_mac');
        let d:any = document.getElementById('button_linux');
        b.style.backgroundColor="#1B2838";
        c.style.backgroundColor="#1B2838";
        d.style.backgroundColor="#1B2838";
        a.style.backgroundColor="#2c64a3";
    }
    
    
    return (
        <div id="body">
            
            <div id="screenshots_grid">
                {/* <div id="img_full">{mainScreenshot()}</div> */}
                {renderScreenshots()}
            </div>
            <div>
            
            </div>

            <div id="description"></div>
            <div className="requirement_switch">
            <button id="button_windows" onClick={setRequirementPc}>Windows</button>
            <button id="button_mac" onClick={setRequirementMac}>Mac</button>
            <button id="button_linux" onClick={setRequirementLinux}>Linux</button>
            </div>
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

            <div id="end_of_page_void"></div>
            
        </div>
    );
}

export default Header;
