import {combineReducers} from "redux";
import leagueReducer from "./league/leagueReducer";

const reducer = combineReducers({
    league: leagueReducer
});

export default reducer;