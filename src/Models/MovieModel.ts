import { GenreModel } from './GenreModel'

export type MovieModel = {
	id: number
	poster?: posterModel
	name: string | null
	alternativeName: string
	description: string | null
	shortDescription: string | null
	year: number
	rating: Ratings
	genres: GenreModel[]
}

export type Ratings = {
	await: number
	filmCritics: number
	imdb: number
	kp: number
	russianFilmCritics: number
}

export type posterModel = {
	previewUrl: string
	url: string
}
