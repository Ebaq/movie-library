import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

export default function Home() {
	return (
		<div className={styles['Page']}>
			<h1>
				Исследуй мир <span>Кинопоиска!</span>
			</h1>
			<Link to={'/list/1'} className={styles['start']}>
				<span>Начать</span>
			</Link>
		</div>
	)
}
