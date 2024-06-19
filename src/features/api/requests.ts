import { makeRequestGetV1, makeRequestGetV14 } from '.'
import { GenreModel } from '../../Models/GenreModel'
import { MovieModel } from '../../Models/MovieModel'

export type getMoviesResponse = {
	docs: MovieModel[]
	limit: number
	page: number
	pages: number
	total: number
}

export type selectedRange = {
	start: string
	end: string
}

export const apiGetMovies = async (
	page?: number,
	genres?: string[],
	rating?: selectedRange,
	year?: selectedRange
) => {
	return makeRequestGetV14<getMoviesResponse>(
		`/movie?limit=${Number(process.env.REACT_APP_PAGE_MOVIES_LIMIT!)}${
			page ? `&page=${page}` : ''
		}${genres && genres.length ? genres.map(el => `&genres.name=${el}`) : ''}${
			rating && (rating.start.length || rating.end.length)
				? `&rating.imdb=${rating.start ?? '0'}-${rating.end ?? '10'}`
				: ''
		}${
			year?.start || year?.end
				? `&releaseYears.start=${year.start ?? '1990'}-${year.end ?? '2025'}`
				: ''
		}`.replaceAll(',', '')
	)
}

export const apiGetGenres = async () => {
	return makeRequestGetV1<GenreModel[]>(
		'/movie/possible-values-by-field?field=genres.name'
	)
}

export const apiGetMovieById = async (movieId: string) => {
	return makeRequestGetV14<MovieModel>(`/movie/${movieId}`)
}
