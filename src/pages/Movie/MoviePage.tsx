import { observer } from 'mobx-react-lite'
import { Suspense, useState } from 'react'
import { Await, defer, useLoaderData, useNavigate } from 'react-router-dom'
import { MovieLoaderModel } from '../../Models/MovieLoaderModel'
import { MovieModel } from '../../Models/MovieModel'
import { apiGetMovieById } from '../../features/api/requests'
import { favoritesStoreInstance } from '../../stores/favoritesStore'
import styles from './MoviePage.module.scss'

export const MoviePage = observer(() => {
	const { movie } = useLoaderData() as MovieLoaderModel
	const [isFavorite, setIsFavorite] = useState<boolean>(false)
	const navigate = useNavigate()
	return (
		<div className={styles['Page']}>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={movie}>
					{(resolvedMovie: MovieModel) => {
						setIsFavorite(
							!!favoritesStoreInstance.favorites.find(
								el => el.id === resolvedMovie.id
							)
						)
						return (
							<>
								<div className={styles['goBack']}>Назад</div>
								<div className={styles['movie']}>
									{resolvedMovie.poster?.url ? (
										<img
											src={resolvedMovie.poster?.url}
											className={styles['movie-poster']}
										></img>
									) : (
										<div className={styles['movie-poster']}>
											<h4>No poster</h4>
										</div>
									)}
									<div className={styles['movie-info']}>
										<div className={styles['movie-header']}>
											<div className={styles['movie-title']}>
												{resolvedMovie.name} ({resolvedMovie.year})
												<div className={styles['addToFavorites']}>
													<svg
														data-active={isFavorite}
														onClick={() => {
															favoritesStoreInstance.toggleFavorites(
																resolvedMovie
															)
															setIsFavorite(prev => !prev)
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
											<h3 className={styles['movie-altName']}>
												{resolvedMovie.alternativeName}
											</h3>
										</div>
										<div className={styles['movie-description']}>
											{resolvedMovie.description}
										</div>
										<div className={styles['movie-ratings']}>
											<div className={styles['critics']}>
												imdb:
												<span> {resolvedMovie.rating.imdb}</span>
											</div>
											<div className={styles['critics']}>
												Кинопоиск:
												<span> {resolvedMovie.rating.kp}</span>
											</div>
											<div className={styles['critics']}>
												Кино-критики:
												<span> {resolvedMovie.rating.filmCritics}</span>
											</div>
										</div>
										<div className={styles['movie-genres']}>
											<span>Жанры: </span>
											{resolvedMovie.genres.map((el, index) => (
												<span key={index}>
													{index == 0 ? el.name : `, ${el.name}`}
												</span>
											))}
										</div>
									</div>
									<div className={styles['goBack']}>
										<button
											className={styles['goBack-btn']}
											onClick={() => navigate(-1)}
										>
											<svg
												fill='#c23838'
												height='30px'
												width='30px'
												version='1.1'
												id='Layer_1'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 472.615 472.615'
												stroke='#c23838'
											>
												<g id='SVGRepo_bgCarrier' stroke-width='0' />

												<g
													id='SVGRepo_tracerCarrier'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>

												<g id='SVGRepo_iconCarrier'>
													{' '}
													<g>
														{' '}
														<g>
															{' '}
															<path d='M167.158,117.315l-0.001-77.375L0,193.619l167.157,153.679v-68.555c200.338,0.004,299.435,153.932,299.435,153.932 c3.951-19.967,6.023-40.609,6.023-61.736C472.615,196.295,341.8,117.315,167.158,117.315z' />{' '}
														</g>{' '}
													</g>{' '}
												</g>
											</svg>
										</button>
									</div>
								</div>
							</>
						)
					}}
				</Await>
			</Suspense>
		</div>
	)
})
//@ts-ignore
export const movieLoader = async ({ params }) => {
	const { movieId } = params
	return defer({
		movie: apiGetMovieById(movieId!),
	})
}
