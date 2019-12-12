import {useDispatch, useStore} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";

/**
 * useGetHolidays custom Hook, makes a request to the API and retrieves the holidays from the give range.
 * @params: {Date} [startDate]
 * @params: {Date} [endDate]
 * @return: Object
 */
export const useGetHolidays = (startDate, endDate) => {
    const state = useStore().getState();
    const [holidays, setHolidays] = useState(state && state.holidays);
    const dispatch = useDispatch();

    useEffect(() => {
        // Sort the list of already retrieved holidays
        let holidayList = [];
        if (state.holidays) {
            holidayList = [...Object.keys(state.holidays)];
        }
        holidayList.sort((a, b) => new Date(a) - new Date(b));

        const start = holidayList[0];
        const end = holidayList[holidayList.length - 1];


        // if the current date range is in the redux store return it else make new request
        if ((new Date(start) <= startDate && endDate <= new Date(end))) {
            setHolidays(state.holidays);
        } else {
            axios.post("https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/holidays", {
                apiKey: "887d33535711e966f7b5746f263b4b81",
                startDate: startDate.toISOString().substring(0, 10),
                endDate: endDate.toISOString().substring(0, 10)
            }).then(r => {
                dispatch({type: "GET_HOLIDAYS", payload: r.data.holidays});
                setHolidays(r.data.holidays);
            }).catch(e => console.log(e))
        }

        // eslint-disable-next-line
    }, [startDate, endDate, dispatch]);

    return holidays;
};
