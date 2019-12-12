import {combineReducers} from "redux";


const holidayReducer = (state = null, action) => {
    if (action.type === "GET_HOLIDAYS") {
        return {...state, ...action.payload};
    }
    return state;
};


export default combineReducers({
    holidays: holidayReducer
});