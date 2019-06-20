import {
    FETCH_LEAGUE_BEGIN,
    FETCH_LEAGUE_CONTESTANTS_FAILURE,
    FETCH_LEAGUE_CONTESTANTS_SUCCESS,
    FETCH_LEAGUE_FAILURE,
    FETCH_LEAGUE_RESULTS_FAILURE,
    FETCH_LEAGUE_RESULTS_SUCCESS,
    FETCH_LEAGUE_SUCCESS,
} from '../../app/league/constants'
import LeagueEntity from '../../app/league/entities/LeagueEntity'
import LeagueResultEntity from '../../app/league/entities/LeagueResultEntity'
import { LeagueReducerAction } from './leagueActions'


export interface LeagueReducerState {
    error: null | string,
    fetched: boolean,
    fetching: boolean,
    league: LeagueEntity | null,
    leagueContestant: LeagueContestantEntity | null,
    leagueId: number | null,
    leagueResult: LeagueResultEntity | null,
}

const initialState = {
    error: null,
    fetched: false,
    fetching: false,
    league: null,
    leagueContestant: null,
    leagueId: null,
    leagueResult: null,
};

const leagueReducer = (state: LeagueReducerState = initialState, { type, payload }: LeagueReducerAction) => {
    const addToState = (field: string) => {
        const fetched = (state.league || payload.league) && (state.leagueResult || payload.leagueResult) && (state.leagueContestant || payload.leagueContestant)
        return state.leagueId === payload.leagueId ? { ...state, ...payload, fetched, fetching: !fetched } : state
    }

    switch (type) {
        case FETCH_LEAGUE_BEGIN:
            return { ...initialState, league: false, fetching: true, leagueId: payload.leagueId }
        case FETCH_LEAGUE_SUCCESS:
            return addToState('league')
        case FETCH_LEAGUE_RESULTS_SUCCESS:
            return addToState('leagueResult')
        case FETCH_LEAGUE_CONTESTANTS_SUCCESS:
            return addToState('leagueContestant')
        case FETCH_LEAGUE_FAILURE:
        case FETCH_LEAGUE_RESULTS_FAILURE:
        case FETCH_LEAGUE_CONTESTANTS_FAILURE:
            return { ...initialState, error: payload.error }
        default:
            return state;
    }
};

export default leagueReducer
