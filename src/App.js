import React from 'react';
import NavBar from "./components/NavBar";
import {Container} from "semantic-ui-react";
import Calender from "./components/Calender";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Container>
                <Calender/>
            </Container>
        </div>
    );
}

export default App;
