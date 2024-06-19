import { observer } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'
import { favoritesStoreInstance } from '../../stores/favoritesStore'
import styles from './Favorites.module.scss'

export const Favorites = observer(() => {
	const { pageId } = useParams()
	const store = favoritesStoreInstance
	return (
		<div className={styles['Page']}>
			<div className={styles['Page-content']}>
				{store.favorites && store.favorites.length > 0 ? (
					<div className={styles['movies-list']}>
						{store.favorites.map(
							(movie, index) =>
								index >=
									(Number(pageId) - 1) *
										Number(process.env.REACT_APP_PAGE_MOVIES_LIMIT!) &&
								index <
									Number(pageId) *
										Number(process.env.REACT_APP_PAGE_MOVIES_LIMIT!) && (
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
												<h4 className={styles['movie-year']}>
													{movie.year} Год
												</h4>
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
											</div>
										</div>
									</Link>
								)
						)}
					</div>
				) : (
					<h2
						style={{
							color: '#fff',
						}}
					>
						Вы пока не добавили ни одного фильма в избранное!
					</h2>
				)}
			</div>
			<div className={styles['pages']}>
				<Link
					style={{
						visibility: Number(pageId) > 1 ? 'visible' : 'hidden',
						height: '30px',
					}}
					to={`/favorites/${Number(pageId) - 1}`}
				>
					<img
						className={`${styles['arrow']} ${styles['arrow-left']}`}
						src='/arrow.svg'
						alt=''
						// onClick={() => form.setPage(form.selectedPage - 1)}
					/>
				</Link>
				<h4 className={styles['pages-count']}>
					{pageId} /{' '}
					{Math.ceil(
						store.favorites.length /
							Number(process.env.REACT_APP_PAGE_MOVIES_LIMIT!)
					)}
				</h4>
				<Link
					to={`/favorites/${Number(pageId) + 1}`}
					style={{
						visibility:
							Number(pageId) <
							Math.ceil(
								store.favorites.length /
									Number(process.env.REACT_APP_PAGE_MOVIES_LIMIT!)
							)
								? 'visible'
								: 'hidden',
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
	)
})
