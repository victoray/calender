import React, {useState} from "react";
import {Button, Grid, Icon, Segment} from "semantic-ui-react";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import WeekTable, {getWeekDay} from "./WeekTable";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    .map((day, index) => ({
        key: index,
        text: day,
        value: day
    }));

const reducer = (state, action) => {
    if (action.type === "SET_DATE") {
        return action.payload
    }

    return state
};

const initialDate = new Date();

const getDate = (date, weekDay) => {
    let nextDate = new Date(date);
    let prevDate = new Date(date);

    while (true) {
        if (getWeekDay(nextDate) === weekDay) {
            return new Date(nextDate);
        }
        if (getWeekDay(prevDate) === weekDay) {
            return new Date(prevDate);
        }
        nextDate.setDate(nextDate.getDate() + 1);
        prevDate.setDate(prevDate.getDate() - 1);
    }
};


const Calender = () => {
    const [firstDay, setFirstDay] = useState(weekDays[0].value);
    const [date, setDate] = useState(getDate(initialDate, firstDay));

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 7);

    const handlePreviousWeek = () => {
        date.setDate(date.getDate() - 7);
        setDate(new Date(date));
    };

    const handleNextWeek = () => {
        date.setDate(date.getDate() + 7);
        setDate(new Date(date));
    };

    const handleFirstDayChange = (value) => {
        setFirstDay(value);
        setDate(getDate(date, value));
    };
    
    return (
        <div>

            <Segment basic>
                <Grid columns={3}>
                    <Grid.Column>
                        <Grid columns={"equal"} stackable>
                            <Grid.Column textAlign={"left"}>
                                <Button color={"red"} onClick={handlePreviousWeek} size={"small"}>
                                    <Icon name={"arrow left"}/> Previous Week
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={"left"}>
                                <Button color={"blue"} onClick={handleNextWeek} size={"small"}>
                                    Next Week <Icon name={"arrow right"}/>
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column textAlign={"center"}>
                        <h2>{startDate.toLocaleDateString("et-EE")} - {date.toLocaleDateString("et-EE")}</h2>
                    </Grid.Column>
                    <Grid.Column textAlign={"right"}>

                        <Dropdown placeholder='First Day' search selection options={weekDays}
                                  style={{position: "absolute", right: 10}} defaultValue={firstDay}
                                  onChange={(e, {value}) => handleFirstDayChange(value)}/>
                    </Grid.Column>
                </Grid>
            </Segment>

            <WeekTable endDate={date} startDate={startDate}/>
        </div>
    )

};

export default Calender;