import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

import Header from "./Header";

function Jeu() {
    const [appid, setAppid] = useState("");
    let params = useParams();

    const [api, setApi]=useState<any[]>([0]);

    useEffect(() => {
        console.log("a");
        

        let query = async function() {
            let body = await fetch(`http://localhost:3001/api/jeux/${params.appid}`, {
                mode: "cors",
            });

            let json = await body.json();

            setApi(json);
        }

        query().catch((err) => {
            console.log(err);
            
        });
    }, [])

    console.log();
    

    return (

        
        <div className="container">  

            <Header api={api} /> 
           
        </div>
    );
}

export default Jeu;