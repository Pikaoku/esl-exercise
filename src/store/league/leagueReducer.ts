import {
    defaultLeagueObject,
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_FAILURE,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_FAILURE,
    FETCH_LEAGUE_RESULTS_BEGIN,
    FETCH_LEAGUE_RESULTS_FAILURE,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS,
    LeagueReducerAction
} from "./leagueTypes";

const initialState = {
    leagues: {}
};

const leagueReducer = (state = initialState, action: LeagueReducerAction) => {
    const id = action.payload ? action.payload.id.toString() : null;
    // Helper method to keep code cleaner.
    const updateLeague = (updatedId: string, updatedLeague: object) => ({
        ...state, leagues: {...state.leagues, [updatedId]: updatedLeague}
    });

    switch (action.type) {
        case FETCH_LEAGUE_BEGIN:
            const leagueBeingFetched = state.leagues.hasOwnProperty(id)
                ? {...state.leagues[id], fetching: true, fetched: false}
                : defaultLeagueObject(id);
            return updateLeague(id, leagueBeingFetched);

        case FETCH_LEAGUE_SUCCESS:
            const fetchedLeague = {...state.leagues[id], fetched: true, fetching: false, data: action.payload.data};
            return updateLeague(id, fetchedLeague);

        case FETCH_LEAGUE_FAILURE:
            return state;

        case FETCH_LEAGUE_RESULTS_BEGIN:
            return state;

        case FETCH_LEAGUE_RESULTS_SUCCESS:
            return updateLeague(id, {...state.leagues[id], results: action.payload.data});

        case FETCH_LEAGUE_RESULTS_FAILURE:
            return state;

        case FETCH_LEAGUE_CONTESTANTS_BEGIN:
            return state;

        case FETCH_LEAGUE_CONTESTANTS_SUCCESS:
            return updateLeague(id, {...state.leagues[id], contestants: action.payload.data});

        case FETCH_LEAGUE_CONTESTANTS_FAILURE:
            return state;

        default:
            return state;
    }
};

export default leagueReducer
