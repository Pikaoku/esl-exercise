import axios from 'axios'
import { Dispatch } from 'redux'

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
    FETCH_LEAGUE_SUCCESS,
} from '../../app/leagueResults/constants'

export interface LeagueReducerAction {
    type: string,
    payload: any
}

const leaguesApi = axios.create({
    baseURL: ESL_API_LEAGUES
});

export function fetchLeague(id: string) {
    return (dispatch: Dispatch) => {
        dispatch<LeagueReducerAction>({type: FETCH_LEAGUE_BEGIN, payload: {id}});
        return leaguesApi.get(id)
            .then(
                successResponse => {
                    dispatch<LeagueReducerAction>({
                        payload: {data: successResponse.data, id},
                        type: FETCH_LEAGUE_SUCCESS
                    });
                    // For the purposes of this exercise, auto-hydrate the League as we need all of it.
                    dispatch<any>(fetchLeagueResults(id));
                    dispatch<any>(fetchLeagueContestants(id));
                }
            )
            .catch(
                error =>
                    dispatch<LeagueReducerAction>({
                        payload: {error: error.message, id},
                        type: FETCH_LEAGUE_FAILURE
                    })
            )
    }
}

export function fetchLeagueResults(id: string) {
    return hydrateLeague(
        FETCH_LEAGUE_RESULTS_BEGIN,
        FETCH_LEAGUE_RESULTS_SUCCESS,
        FETCH_LEAGUE_RESULTS_FAILURE,
        ESL_API_LEAGUES_RESULTS,
        id
    )
}

export function fetchLeagueContestants(id: string) {
    return hydrateLeague(
        FETCH_LEAGUE_CONTESTANTS_BEGIN,
        FETCH_LEAGUE_CONTESTANTS_SUCCESS,
        FETCH_LEAGUE_CONTESTANTS_FAILURE,
        ESL_API_LEAGUES_CONTESTANTS,
        id
    )
}

function hydrateLeague(begin: string, success: string, failure: string, endpoint: string, id: string) {
    return (dispatch: Dispatch) => {
        dispatch<LeagueReducerAction>({type: begin, payload: {id}});
        return leaguesApi.get(id + endpoint)
            .then(
                successResponse => (
                    dispatch<LeagueReducerAction>({
                        payload: {data: successResponse.data, id},
                        type: success,
                    })
                ),
                error => (
                    dispatch<LeagueReducerAction>({
                        payload: {error: error.message, id},
                        type: failure
                    })
                )
            )
    }
}


