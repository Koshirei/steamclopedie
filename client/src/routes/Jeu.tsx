import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Body from "./Body";
import Navbar from "../components/Navbar";

function Jeu() {
    let params = useParams();

    const [data, setData] = useState<any[]>([{}]);
    
    useEffect(() => {
        let query = async function() {
            let body = await fetch(`http://localhost:3001/api/jeux/${params.appid}`, {
                mode: "cors",
            });

            let json = await body.json();
       
            document.body.style.backgroundImage=`url(${json[0].background}) `; 

            setData(json);
            // setData([{a: "a"}]);

        }

        

        query().catch((err) => {
            console.log(err);
            
        });
    }, [])

    console.log();

    return (
        <>
            <Navbar />
     
            <div className="container">      

                <Header api={data} />

                <div id="page_content">
                    <Body api={data} />

                    <Sidebar api={data} />
                </div>
            </div>
        </>
    );
}

export default Jeu;