import React, {useState} from "react";
import {Header, Menu} from "semantic-ui-react";


const NavBar = ()=> {
    return (
        <Menu inverted className={"navbar"} borderless>
            <Menu.Item>
                <img src={"https://react.semantic-ui.com/logo.png"}  alt={""}/>
            </Menu.Item>
            <Menu.Item>
                <Header inverted>Calender<sup>TM</sup></Header>
            </Menu.Item>

        </Menu>
    )
};

export default NavBar;