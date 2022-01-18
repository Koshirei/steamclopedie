import { useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";

function Jeu() {
    const [api, setApi] = useState<any>({});
    let params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/api/jeux/${params.appid}`, {
        mode: "cors",
        })
        .then((value) => {
            // value.body
            value.json().then((value) => {
                // console.log(value);

                setApi(value);
                
            });
        });
    }, []);

    return (
        <>
            <p>{api.name}</p>
        </>
    );
}

export default Jeu;