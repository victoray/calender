import React, {useState} from "react";
import {Button, Dropdown, Label, List, Message} from "semantic-ui-react";
import WeekTable, {getWeekDay} from "./WeekTable";


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
        <div className={"ui container fluid"}>
            <div>
                <Button.Group size={"small"} floated={"right"} inverted>
                    <Button className={"prev"} icon='angle double left'
                            onClick={handlePreviousWeek}/>
                            <Label active className={"date__label"}>{startDate.toLocaleDateString("et-EE")} - {endDate.toLocaleDateString("et-EE")}</Label>
                    <Button className={"next"} icon='angle double right'
                            onClick={handleNextWeek}/>
                </Button.Group>
                <Dropdown placeholder='First Day' selection search options={weekDays}
                          defaultValue={firstDay}
                          onChange={(e, {value}) => handleFirstDayChange(value)}/>

            </div>

            <WeekTable endDate={endDate} startDate={startDate}/>

            <div>
                <List>
                    <List.Item>
                        <Label as={Message} info className={"holiday__label"}>
                            folk
                        </Label>
                    </List.Item>
                    <List.Item>
                        <Label as={Message} success className={"holiday__label"}>
                            public
                        </Label>
                    </List.Item>
                </List>
            </div>
        </div>
    )

};

export default Calender;