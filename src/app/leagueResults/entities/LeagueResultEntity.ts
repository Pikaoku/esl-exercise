class LeagueResultParticipant {
    constructor(
        id: number,
        place: number,
        point: number[]
    ) { }
}

class LeagueResultEntity {
    constructor(
        id: number,
        state: string,
        bracket: number,
        beginAt: string,
        position: number,
        round: number,
        participants: LeagueResultParticipant[]
    ) { }
}

export default LeagueResultEntity