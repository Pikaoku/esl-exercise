import axios from 'axios'
import {Dispatch} from 'redux';
import {
    ESL_API_LEAGUES,
    ESL_API_LEAGUES_CONTESTANTS,
    ESL_API_LEAGUES_RESULTS,
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_FAILURE,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_FAILURE,
    FETCH_LEAGUE_RESULTS_BEGIN,
    FETCH_LEAGUE_RESULTS_FAILURE,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS
} from "./leagueTypes";

export function fetchLeague(id: number) {
    return (dispatch: Dispatch) => {
        const apiRecord = ESL_API_LEAGUES + id.toString();
        dispatch({type: FETCH_LEAGUE_BEGIN, payload: {id}});
        return axios.get(apiRecord)
            .then(
                successResponse => {
                    dispatch({
                        payload: {data: successResponse.data, id},
                        type: FETCH_LEAGUE_SUCCESS
                    });
                    // For the purposes of this exercise, auto-hydrate the League as we need all of it.
                    dispatch<any>(fetchLeagueResults(id));
                    dispatch<any>(fetchLeagueContestants(id));
                },
                error =>
                    dispatch({
                        payload: {error: error.message, id},
                        type: FETCH_LEAGUE_FAILURE
                    })
            )
    }
}

export function fetchLeagueResults(id: number) {
    return hydrateLeague(
        FETCH_LEAGUE_RESULTS_BEGIN,
        FETCH_LEAGUE_RESULTS_SUCCESS,
        FETCH_LEAGUE_RESULTS_FAILURE,
        ESL_API_LEAGUES_RESULTS,
        id
    )
}

export function fetchLeagueContestants(id: number) {
    return hydrateLeague(
        FETCH_LEAGUE_CONTESTANTS_BEGIN,
        FETCH_LEAGUE_CONTESTANTS_SUCCESS,
        FETCH_LEAGUE_CONTESTANTS_FAILURE,
        ESL_API_LEAGUES_CONTESTANTS,
        id
    )
}

function hydrateLeague(begin: string, success: string, failure: string, endpoint: string, id: number) {
    return (dispatch: Dispatch) => {
        const apiRecord = ESL_API_LEAGUES + id.toString();
        dispatch({type: begin});
        return axios.get(apiRecord + endpoint)
            .then(
                successResponse => (
                    dispatch({
                        payload: {data: successResponse.data, id},
                        type: success,
                    })
                ),
                error => (
                    dispatch({
                        payload: {error: error.message, id},
                        type: failure
                    })
                )
            )
    }
}


