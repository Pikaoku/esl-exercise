import axios from 'axios'
import { Dispatch } from 'react'

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
    return (dispatch: Dispatch<LeagueReducerAction | any>) => {
        dispatch({ type: FETCH_LEAGUE_BEGIN, payload: { leagueId: id } })
        dispatch(getLeague(id))
        dispatch(getLeagueContestants(id))
        dispatch(getLeagueResults(id))
    }
}

function getLeague(id: number) {
    return getLeagueChild(
        id,
        'league',
        '',
        FETCH_LEAGUE_SUCCESS,
        FETCH_LEAGUE_FAILURE
    )
}

function getLeagueResults(id: number) {
    return getLeagueChild(
        id,
        'leagueResults',
        ESL_API_LEAGUES_RESULTS,
        FETCH_LEAGUE_RESULTS_SUCCESS,
        FETCH_LEAGUE_RESULTS_FAILURE
    )
}

function getLeagueContestants(id: number) {
    return getLeagueChild(
        id,
        'leagueContestants',
        ESL_API_LEAGUES_CONTESTANTS,
        FETCH_LEAGUE_CONTESTANTS_SUCCESS,
        FETCH_LEAGUE_CONTESTANTS_FAILURE
    )
}

const getLeagueChild = (id: number, field: string, endpoint: string, successType: string, failureType: string) => {
    return async (dispatch: Dispatch<LeagueReducerAction>) =>
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