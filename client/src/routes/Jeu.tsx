import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

import Header from "./Header";
import Body from "./Body";

import { json } from "stream/consumers";



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
        <div className="container">      

            <Header api={data} />

            <div id="page_content">
                <Body api={data} />

                <div id="side_bar">
                    <p>SIDE BAR</p>
                </div>
            </div>
        </div>
    );
}

export default Jeu;