import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Jeu from "./routes/Jeu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Accueil from "./routes/Accueil";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/jeux" element={<Jeu />}>
                <Route path=":appid" element={<Jeu />} />
            </Route>
            <Route path="/recherche" element={<Jeu />}>
            <Route path=":page" element={<Jeu />} />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
