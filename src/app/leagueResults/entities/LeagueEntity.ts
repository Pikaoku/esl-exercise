class LeagueNameEntity {
    constructor(
        full: string,
        normal: string,
        short: string
    ) { }
}

class LeagueTimelineEntityEntity {
    public state: Date
    public end: Date
    constructor(
        start: string,
        end: string
    ) {
        this.state = new Date(start)
        this.end = new Date(end)
    }
}

class LeagueTimelineEntity {
    constructor(
        inProgress: LeagueTimelineEntityEntity,
        signUp: LeagueTimelineEntityEntity,
        finished: LeagueTimelineEntityEntity,
        checkIn: LeagueTimelineEntityEntity
    ) { }
}

class LeagueEntity {
    constructor(
        id: number,
        type: string,
        name: LeagueNameEntity,
        timeline: LeagueTimelineEntity,
        tag: string[],
        gameId: number,
        contestants: any[],
        results: any[]
    ) { }
}

export default LeagueEntity