import Move from "./move"

export default class Game {
    gameId?: number
	viewCount?: number
	status?: boolean
	date?: Date
	moves?: Move[]
}