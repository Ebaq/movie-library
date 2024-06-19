import { observer } from 'mobx-react-lite'
import { Suspense, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CustomSelect } from '../../components/Select/CustomSelect'
import { ListForm } from '../../forms/ListForm'
import { favoritesStoreInstance } from '../../stores/favoritesStore'
import styles from './List.module.scss'

const form = new ListForm()
// const store = favoritesStoreInstance

export const List = observer(() => {
	const { pageId } = useParams()
	const navigate = useNavigate()
	useEffect(() => {
		if (Number(pageId) > form.pagesCount) {
			navigate('/list/1')
		} else {
			form.setPage(Number(pageId))
		}
	}, [pageId])

	// const movies: Movie[] = [
	// 	{
	// 		name: '',
	// 		release: 0,
	// 		rating: 0,
	// 	},
	// ]

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<div className={styles['Page']}>
				<div className={styles['Page-content']}>
					<div className={styles['filters']}>
						<div className={styles['filter']}>
							<h3>По жанру</h3>
							{form.allGenres && form.allGenres.length > 0 ? (
								<CustomSelect placeholder='Жанры' form={form}></CustomSelect>
							) : (
								''
							)}
						</div>
						<div className={styles['filter']}>
							<h3>По рейтингу</h3>
							<div className={styles['filters-input-wrapper']}>
								<input
									className={styles['range-input']}
									type='text'
									value={form.selectedRatings.start}
									onInput={event =>
										form.setSelectedRatings(event.currentTarget.value, 'start')
									}
								/>
								<input
									className={styles['range-input']}
									type='text'
									value={form.selectedRatings.end}
									onInput={event =>
										form.setSelectedRatings(event.currentTarget.value, 'end')
									}
								/>
							</div>
						</div>
						<div className={styles['filter']}>
							<h3>По году</h3>
							<div className={styles['filters-input-wrapper']}>
								<input
									className={styles['range-input']}
									type='text'
									maxLength={4}
									value={form.selectedYears.start}
									onInput={event =>
										form.setSelectedYears(event.currentTarget.value, 'start')
									}
								/>
								<input
									className={styles['range-input']}
									type='text'
									value={form.selectedYears.end}
									onInput={event =>
										form.setSelectedYears(event.currentTarget.value, 'end')
									}
								/>
							</div>
						</div>
						<button
							className={styles['submit']}
							type='submit'
							onClick={e => {
								e.preventDefault()
								form.getMovies({
									genres: form.selectedGenres.length ? form.selectedGenres : [],
									rating: form.selectedRatings,
									year: form.selectedYears,
								})
							}}
						>
							Применить
						</button>
					</div>
					{form.allMovies &&
					form.allMovies.length > 0 &&
					favoritesStoreInstance.favorites ? (
						<div className={styles['movies-list']}>
							{form.allMovies.map((movie, index) => (
								<Link
									to={`/movie/${movie.id}`}
									key={index}
									className={styles['movie']}
								>
									<span className={styles['movie-bg']}></span>
									{movie.poster?.previewUrl ? (
										<img
											src={movie.poster?.previewUrl}
											className={styles['movie-poster']}
										></img>
									) : (
										<div className={styles['movie-poster']}>
											<h4>No poster</h4>
										</div>
									)}
									<div className={styles['movie-info']}>
										<div className={styles['title']}>
											<h3 className={styles['title-name']}>{movie.name}</h3>
											<h4 className={styles['title-altName']}>
												{movie.alternativeName}
											</h4>
											<h4 className={styles['movie-year']}>{movie.year} Год</h4>
										</div>
										<p className={styles['movie-description']}>
											{movie.shortDescription
												? movie.shortDescription
												: movie.description
												? movie.description
												: ''}
										</p>
										<div className={styles['movie-bottom']}>
											<h4 className={styles['movie-rating']}>
												{movie.rating.imdb !== 0
													? movie.rating.imdb
													: 'Нет оценки'}
											</h4>
											<svg
												data-active={
													!!favoritesStoreInstance.favorites.find(
														el => el.id === movie.id
													)
												}
												onClick={e => {
													e.preventDefault()
													favoritesStoreInstance.toggleFavorites(movie)
												}}
												width='30px'
												height='30px'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													fill-rule='evenodd'
													clip-rule='evenodd'
													d='M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
													stroke='#ff4f67'
													stroke-width='2'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
											</svg>
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<h2
							style={{
								color: '#fff',
							}}
						>
							{form.errorMessage}
						</h2>
					)}
				</div>
				<div className={styles['pages']}>
					<Link
						style={{
							visibility: form.selectedPage > 1 ? 'visible' : 'hidden',
							height: '30px',
						}}
						to={`/list/${form.selectedPage - 1}`}
					>
						<img
							className={`${styles['arrow']} ${styles['arrow-left']}`}
							src='/arrow.svg'
							alt=''
							// onClick={() => form.setPage(form.selectedPage - 1)}
						/>
					</Link>
					<h4 className={styles['pages-count']}>
						{form.selectedPage} / {form.pagesCount}
					</h4>
					<Link
						to={`/list/${form.selectedPage + 1}`}
						style={{
							visibility:
								form.selectedPage < form.pagesCount ? 'visible' : 'hidden',
							height: '30px',
						}}
					>
						<img
							className={`${styles['arrow']}`}
							src='/arrow.svg'
							alt=''
							// onClick={() => form.setPage(form.selectedPage + 1)}
						/>
					</Link>
				</div>
			</div>
		</Suspense>
	)
})
