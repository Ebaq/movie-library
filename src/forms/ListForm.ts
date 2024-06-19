import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { GenreModel } from '../Models/GenreModel'
import { MovieModel } from '../Models/MovieModel'
import {
	apiGetGenres,
	apiGetMovies,
	selectedRange,
} from '../features/api/requests'

export type getMoviesParams = {
	page?: number
	genres?: string[]
	rating?: selectedRange
	year?: selectedRange
}

export interface IListForm {
	readonly allMovies: MovieModel[]
	readonly selectedGenres: string[]
	readonly allGenres: GenreModel[]
	readonly selectedRatings: selectedRange
	readonly selectedYears: selectedRange
	readonly selectedPage: number
	readonly pagesCount: number
	readonly errorMessage: string
	initialize: () => Promise<void>
	getGenres: () => Promise<void>
	getMovies: (params?: getMoviesParams) => Promise<void>
	toggleGenres: (genre: GenreModel) => void
	setSelectedRatings: (value: string, range: 'start' | 'end') => void
	setSelectedYears: (value: string, range: 'start' | 'end') => void
	setPage: (page: number) => void
}

export class ListForm implements IListForm {
	@observable private _allMovies: MovieModel[] = [
		// {
		// 	id: 5613210,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 561320,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 5613020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 2193020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 56721020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 5670020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 13020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
		// {
		// 	id: 56020,
		// 	name: 'Гитлер и нацисты: Суд над злом',
		// 	alternativeName: 'Hitler and the Nazis: Evil on Trial',
		// 	year: 2024,
		// 	description: null,
		// 	shortDescription: null,
		// 	rating: {
		// 		kp: 0,
		// 		imdb: 7.6,
		// 		filmCritics: 0,
		// 		russianFilmCritics: 0,
		// 		await: 0,
		// 	},
		// 	poster: {
		// 		url: 'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/orig',
		// 		previewUrl:
		// 			'https://image.openmoviedb.com/kinopoisk-images/4486454/235f4026-7a0c-4d4e-a42f-32eaf49eb676/x1000',
		// 	},
		// 	genres: [
		// 		{
		// 			name: 'документальный',
		// 		},
		// 		{
		// 			name: 'история',
		// 		},
		// 	],
		// },
	]
	@observable private _selectedGenres: string[] = []
	@observable private _allGenres: GenreModel[] = []
	// @observable private _allGenres: GenreModel[] = [
	// 	{
	// 		name: 'аниме',
	// 		slug: 'anime',
	// 	},
	// 	{
	// 		name: 'биография',
	// 		slug: 'biografiya',
	// 	},
	// 	{
	// 		name: 'боевик',
	// 		slug: 'boevik',
	// 	},
	// 	{
	// 		name: 'вестерн',
	// 		slug: 'vestern',
	// 	},
	// 	{
	// 		name: 'военный',
	// 		slug: 'voennyy',
	// 	},
	// 	{
	// 		name: 'детектив',
	// 		slug: 'detektiv',
	// 	},
	// 	{
	// 		name: 'детский',
	// 		slug: 'detskiy',
	// 	},
	// 	{
	// 		name: 'для взрослых',
	// 		slug: 'dlya-vzroslyh',
	// 	},
	// 	{
	// 		name: 'документальный',
	// 		slug: 'dokumentalnyy',
	// 	},
	// 	{
	// 		name: 'драма',
	// 		slug: 'drama',
	// 	},
	// 	{
	// 		name: 'игра',
	// 		slug: 'igra',
	// 	},
	// 	{
	// 		name: 'история',
	// 		slug: 'istoriya',
	// 	},
	// 	{
	// 		name: 'комедия',
	// 		slug: 'komediya',
	// 	},
	// 	{
	// 		name: 'концерт',
	// 		slug: 'koncert',
	// 	},
	// 	{
	// 		name: 'короткометражка',
	// 		slug: 'korotkometrazhka',
	// 	},
	// 	{
	// 		name: 'криминал',
	// 		slug: 'kriminal',
	// 	},
	// 	{
	// 		name: 'мелодрама',
	// 		slug: 'melodrama',
	// 	},
	// 	{
	// 		name: 'музыка',
	// 		slug: 'muzyka',
	// 	},
	// 	{
	// 		name: 'мультфильм',
	// 		slug: 'multfilm',
	// 	},
	// 	{
	// 		name: 'мюзикл',
	// 		slug: 'myuzikl',
	// 	},
	// 	{
	// 		name: 'новости',
	// 		slug: 'novosti',
	// 	},
	// 	{
	// 		name: 'приключения',
	// 		slug: 'priklyucheniya',
	// 	},
	// 	{
	// 		name: 'реальное ТВ',
	// 		slug: 'realnoe-TV',
	// 	},
	// 	{
	// 		name: 'семейный',
	// 		slug: 'semeynyy',
	// 	},
	// 	{
	// 		name: 'спорт',
	// 		slug: 'sport',
	// 	},
	// 	{
	// 		name: 'ток-шоу',
	// 		slug: 'tok-shou',
	// 	},
	// 	{
	// 		name: 'триллер',
	// 		slug: 'triller',
	// 	},
	// 	{
	// 		name: 'ужасы',
	// 		slug: 'uzhasy',
	// 	},
	// 	{
	// 		name: 'фантастика',
	// 		slug: 'fantastika',
	// 	},
	// 	{
	// 		name: 'фильм-нуар',
	// 		slug: 'film-nuar',
	// 	},
	// 	{
	// 		name: 'фэнтези',
	// 		slug: 'fentezi',
	// 	},
	// 	{
	// 		name: 'церемония',
	// 		slug: 'ceremoniya',
	// 	},
	// ]
	@observable private _selectedRatings: selectedRange = {
		start: '',
		end: '',
	}
	@observable private _selectedPage: number = 1
	@observable private _pagesCount: number = 1
	@observable private _selectedYears: selectedRange = {
		start: '',
		end: '',
	}
	@observable private _errorMessage: string = 'Загрузка...'

	public constructor() {
		if (!this._allGenres.length || !this._allMovies.length) {
			this.initialize()
		}
		makeObservable(this)
	}

	@computed
	public get allMovies() {
		return this._allMovies
	}

	@computed
	public get selectedGenres() {
		return this._selectedGenres
	}

	@computed
	public get allGenres() {
		return this._allGenres
	}

	@computed
	public get selectedRatings() {
		return this._selectedRatings
	}

	@computed
	public get selectedYears() {
		return this._selectedYears
	}

	@computed
	public get selectedPage() {
		return this._selectedPage
	}

	@computed
	public get pagesCount() {
		return this._pagesCount
	}

	@computed
	public get errorMessage() {
		return this._errorMessage
	}

	public initialize = async () => {
		await this.getGenres()
		await this.getMovies()
	}

	@action.bound
	public getGenres = async () => {
		try {
			const response = await apiGetGenres()

			runInAction(() => {
				this._allGenres = response
			})
		} catch (e) {
			console.log(e)
		}
	}

	@action.bound
	public getMovies = async (params?: getMoviesParams) => {
		try {
			if (params) {
				const { page, genres, rating, year } = params
				const response = await apiGetMovies(page, genres, rating, year)
				if (response.docs) {
					runInAction(() => {
						this._allMovies = response.docs
						this._pagesCount = response.pages
					})
				} else {
					throw new Error()
				}
			} else {
				const response = await apiGetMovies()
				if (response.docs) {
					runInAction(() => {
						this._allMovies = response.docs
						this._pagesCount = response.pages
					})
				} else {
					throw new Error()
				}
			}
		} catch (e) {
			console.log(e)
			runInAction(() => {
				this._errorMessage = 'Не удалось загрузить фильмы!'
			})
		}
	}

	@action.bound
	public toggleGenres = (genre: GenreModel) => {
		let temp = this._selectedGenres
		if (temp.includes(genre.name)) {
			runInAction(() => {
				this._selectedGenres = temp.filter(el => el !== genre.name)
			})
		} else {
			temp.push(genre.name)
			runInAction(() => {
				this._selectedGenres = temp
			})
		}
	}

	@action.bound
	public setSelectedRatings = (value: string, range: 'start' | 'end') => {
		let temp = this._selectedRatings
		const valid = /^\d*\.?(?:\d{1})?$/
		if (range === 'start') {
			if (valid.test(value) && Number(value) <= 9.9) {
				temp.start = value
				this._selectedRatings = temp
			}
		} else if (range === 'end') {
			if (
				(valid.test(value) && Number(value) >= 1 && Number(value) <= 10) ||
				!value.length
			) {
				temp.end = value
				this._selectedRatings = temp
			}
		}
	}

	@action.bound
	public setSelectedYears = (value: string, range: 'start' | 'end') => {
		let temp = this._selectedYears
		const valid = /^\d+$/
		if (range === 'start') {
			if (valid.test(value) || !value.length) {
				temp.start = value
				this._selectedYears = temp
			}
		} else if (range === 'end') {
			if (valid.test(value) || !value.length) {
				temp.end = value
				this._selectedYears = temp
			}
		}
	}

	@action.bound
	public setPage = (page: number) => {
		if (page > 0 && page <= this._pagesCount) {
			this._selectedPage = page
		}
		this.getMovies({
			page,
			genres: this.selectedGenres,
			year: this._selectedYears,
			rating: this._selectedRatings,
		})

		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}
}
