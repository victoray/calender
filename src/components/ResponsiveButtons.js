import React from "react";
import {Button, Responsive} from "semantic-ui-react";

//Returns different buttons based on the screen size
const ResponsiveButtons = ({handlePreviousWeek, handleNextWeek}) => {
    return (
        <>
            <Responsive {...Responsive.onlyComputer}>
                <Button.Group size={"mini"}>
                    <Button labelPosition='left' icon='left chevron' content='Previous Week' color={"red"}
                            onClick={handlePreviousWeek}/>
                    <Button labelPosition='right' icon='right chevron' content='Next Week' color={"blue"}
                            onClick={handleNextWeek}/>
                </Button.Group>
            </Responsive>
            <Responsive {...Responsive.onlyMobile}>
                <>
                    <Button icon='left chevron' color={"red"}
                            onClick={handlePreviousWeek}/>
                    <Button icon='right chevron' color={"blue"}
                            onClick={handleNextWeek}/>
                </>
            </Responsive>
            <Responsive {...Responsive.onlyTablet}>
                <Button.Group size={"mini"}>
                    <Button labelPosition='left' icon='left chevron' content='Prev' color={"red"}
                            onClick={handlePreviousWeek}/>
                    <Button labelPosition='right' icon='right chevron' content='Next' color={"blue"}
                            onClick={handleNextWeek}/>
                </Button.Group>
            </Responsive>
        </>
    )
};

export default ResponsiveButtons;

