import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import { MovieModel } from '../Models/MovieModel'

export interface IMoviesStore {
	readonly favorites: MovieModel[]
	initialize: () => Promise<void>
	toggleFavorites: (movie: MovieModel) => void
	checkMovie: (movie: MovieModel) => boolean
}

export class moviesStore implements IMoviesStore {
	@observable private _favorites: MovieModel[] = []

	constructor() {
		makeObservable(this)
		this.initialize()
	}

	@computed
	public get favorites() {
		return this._favorites
	}

	@action.bound
	public initialize = async () => {
		this._favorites = await JSON.parse(localStorage.getItem('favorites')!)
	}

	@action.bound
	public toggleFavorites = (movie: MovieModel) => {
		let temp: MovieModel[] = this._favorites
		if (temp.length && temp.find(el => el.id === movie.id)) {
			runInAction(() => {
				this._favorites = temp.filter(el => el.id !== movie.id)
			})
		} else {
			temp.push(movie)
			runInAction(() => {
				this._favorites = temp
			})
		}
		localStorage.setItem('favorites', JSON.stringify(this._favorites))
	}

	@action.bound
	public checkMovie = (movie: MovieModel) => {
		for (let i = 0; i < this._favorites.length; i++) {
			if (this._favorites[i].id === movie.id) {
				return true
			}
		}
		return false
	}
}

export const favoritesStoreInstance = new moviesStore()
