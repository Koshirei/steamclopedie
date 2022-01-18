import { render } from "@testing-library/react";
import React, {useEffect, useState} from "react";
import { forEachTrailingCommentRange } from "typescript";
import "./styles.css";

function App() {
    const [api, setApi] = useState<any[]>([]);
    const [mediadata, setMediadata] = useState(0);

    useEffect(() => {
        const steam = async () => {
            let res = await fetch("http://localhost:3001/api/jeux", {
                mode: "cors",
            });

            let json = await res.json();
            // console.log(json);
            setApi(json);

            return json;
        };  

        const media = async (value: any) => {
            let res = await fetch(`http://localhost:3001/api/mediadata/${value}`, {
                mode: "cors",
            });

            let json = await res.json();
            // console.log(json);
            setMediadata(json.image_header);

            return json.header_image;
        }; 

        steam().then((value) => {
            // console.log(value);

            value.forEach((newValue: any) => {
                // console.log(newValue.appid);

                renderImage(newValue.appid);
                
            });
        });
    }, []);

    async function renderImage(appid: any) {
        let res = await fetch(`http://localhost:3001/api/mediadata/${appid}`, {
            mode: "cors",
        });

        let json = await res.json();
        // console.log(json);
        // setMediadata(json.image_header);

        setMediadata(appid);
    }

    let res = api.map((data) => {
        // console.log(mediadata);
        console.log(mediadata);
        

        return (
            <>
            <a href={"/jeux/" + data.appid}>{data.name}</a> 
            </>
            
        );
    });
   

    return (
        <>
            {res}
        </>
    );
}

export default App;