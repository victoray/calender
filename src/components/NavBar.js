import React from "react";
import {Header, Menu} from "semantic-ui-react";


const NavBar = () => {
    return (
       <>
           <Menu inverted className={"nav"} borderless>
               <Menu.Item link>
                   <img src={"https://react.semantic-ui.com/logo.png"} alt={""}/>
               </Menu.Item>
               <Menu.Item link>
                   <Header inverted>Calender<sup>TM</sup></Header>
               </Menu.Item>

           </Menu>
       </>
    )
};

export default NavBar;