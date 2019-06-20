class LeagueNameEntity {
    constructor(
        public full: string,
        public normal: string,
        public short: string
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
        public inProgress: LeagueTimelineEntityEntity,
        public signUp: LeagueTimelineEntityEntity,
        public finished: LeagueTimelineEntityEntity,
        public checkIn: LeagueTimelineEntityEntity
    ) { }
}

class LeagueEntity {
    constructor(
        public id: number,
        public type: string,
        public name: LeagueNameEntity,
        public timeline: LeagueTimelineEntity,
        public tag: string[],
        public gameId: number,
        public contestants: any[],
        public results: any[]
    ) { }
}

export default LeagueEntity