import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import styles from './Layout.module.scss'

export default function Layout() {
	return (
		<div className={styles['contentWrapper']}>
			<Header />
			<main className={styles['Main']}>
				<Outlet />
			</main>
		</div>
	)
}
