import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

export default function NotFound() {
	return (
		<div className={styles['Page']}>
			<h2>Такой страницы не существует :(</h2>
			<Link to={'/'} className={styles['toHome']}>
				<span>На главную</span>
			</Link>
		</div>
	)
}
