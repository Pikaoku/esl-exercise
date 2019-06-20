import axios from 'axios'
import { Dispatch } from 'redux'

import {
    ESL_API_LEAGUES,
    ESL_API_LEAGUES_CONTESTANTS,
    ESL_API_LEAGUES_RESULTS,
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_FAILURE,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_FAILURE,
    FETCH_LEAGUE_RESULTS_FAILURE,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS,
} from '../../app/league/constants'

export interface LeagueReducerAction {
    type: string,
    payload: any
}

const leaguesApi = axios.create({
    baseURL: ESL_API_LEAGUES
});

export function fetchLeague(id: number) {
    return (dispatch: Dispatch) => {
        dispatch<LeagueReducerAction>({ type: FETCH_LEAGUE_BEGIN, payload: { leagueId: id } });
        getLeague(id)
        getLeagueContestants(id)
        getLeagueResults(id)
    }
}

function getLeague(id: number) {
    getLeagueChild(
        id,
        'league',
        '',
        FETCH_LEAGUE_SUCCESS,
        FETCH_LEAGUE_FAILURE
    )
}

function getLeagueResults(id: number) {
    getLeagueChild(
        id,
        'leagueResults',
        ESL_API_LEAGUES_RESULTS,
        FETCH_LEAGUE_RESULTS_SUCCESS,
        FETCH_LEAGUE_RESULTS_FAILURE
    )
}

function getLeagueContestants(id: number) {
    getLeagueChild(
        id,
        'leagueContestants',
        ESL_API_LEAGUES_CONTESTANTS,
        FETCH_LEAGUE_CONTESTANTS_SUCCESS,
        FETCH_LEAGUE_CONTESTANTS_FAILURE
    )
}

function getLeagueChild(id: number, field: string, endpoint: string, successType: string, failureType: string) {
    return (dispatch: Dispatch) =>
        leaguesApi.get(id + endpoint)
            .then(
                success => dispatch({
                    payload: {
                        leagueId: id,
                        [field]: success.data
                    },
                    type: successType,
                }),
                error => dispatch({
                    payload: {
                        error: error.message
                    },
                    type: failureType
                })
            )
}