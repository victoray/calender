import React, {useState} from "react";
import {Grid, Message, Segment} from "semantic-ui-react";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import WeekTable, {getWeekDay} from "./WeekTable";
import ResponsiveButtons from "./ResponsiveButtons";


const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    .map((day, index) => ({
        key: index,
        text: day,
        value: day
    }));

/**
 * Retrieves the closest date to the given weekday and returns it
 * @params: {Date} [date]
 * @params: {string} [weekDay]
 * @return: Date
 */
export const getClosestDate = (date, weekDay) => {
    let nextDate = new Date(date);
    let prevDate = new Date(date);


    for (let i = 0; i < 7; i++) {
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

const initialDate = getClosestDate(new Date(), weekDays[0].value);

const Calender = () => {
    const [firstDay, setFirstDay] = useState(weekDays[0].value);
    const [date, setDate] = useState(initialDate);

    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 7);

    //This calculates the final day of the week
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() - 1);

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
        setDate(getClosestDate(date, value));
    };

    return (
        <div>
            <Segment basic>
                <Grid columns={3}>
                    <Grid.Column width={6}>
                        <ResponsiveButtons handleNextWeek={handleNextWeek} handlePreviousWeek={handlePreviousWeek}/>
                    </Grid.Column>
                    <Grid.Column textAlign={"center"} id={"week-range"} width={4}>
                        <strong>{startDate.toLocaleDateString("et-EE")} - {endDate.toLocaleDateString("et-EE")}</strong>
                    </Grid.Column>
                    <Grid.Column textAlign={"right"} width={6}>

                        <Dropdown placeholder='First Day' search selection options={weekDays} className={"dropdown"}
                                  defaultValue={firstDay}
                                  onChange={(e, {value}) => handleFirstDayChange(value)}/>
                    </Grid.Column>
                </Grid>
            </Segment>

            <WeekTable endDate={endDate} startDate={startDate}/>

            <Message info compact>
                <p>{"folk"}</p>
            </Message>

            <Message success compact>
                <p>{"public"}</p>
            </Message>
        </div>
    )

};

export default Calender;