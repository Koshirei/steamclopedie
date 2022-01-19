import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

<<<<<<< Updated upstream
import Body from "./Body";
import Header from "./Header";
=======
import Header from "../components/Header";
import Body from "./Body";
>>>>>>> Stashed changes

function Jeu() {
    let params = useParams();

    const [data, setData] = useState<any[]>([{}]);
    
    useEffect(() => {
        let query = async function() {
            let body = await fetch(`http://localhost:3001/api/jeux/${params.appid}`, {
                mode: "cors",
            });

            let json = await body.json();
       
            
            setData(json);
            // setData([{a: "a"}]);

        }

        query().catch((err) => {
            console.log(err);
            
        });
    }, [])
    
    return (
        <div className="container">      
         
            <Header api={data} />
            <Body api={data} />

        </div>
    );
}

export default Jeu;