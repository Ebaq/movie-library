import { NavLink } from 'react-router-dom'
import '../../globals.scss'
import styles from './Header.module.scss'

export default function Header() {
	return (
		<header className={styles['Header']}>
			<NavLink
				className={({ isActive }) => (isActive ? styles['active'] : '')}
				to='/'
			>
				Главная
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? styles['active'] : '')}
				to='/list/1'
			>
				Список фильмов
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? styles['active'] : '')}
				to='/favorites/1'
			>
				Избранное
			</NavLink>
		</header>
	)
}
