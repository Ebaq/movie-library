import { observer } from 'mobx-react-lite'
import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { GenreModel } from '../../Models/GenreModel'
import { IListForm } from '../../forms/ListForm'
import styles from './CustomSelect.module.scss'
import { Option } from './Option'

type SelectProps = {
	// selected: Set<GenreModel> | null
	// options: GenreModel[]
	placeholder?: string
	// onChange: (selected: GenreWithChecked) => void
	// onClose: (selected: GenreWithChecked[]) => void
	form: IListForm
}

export type GenreWithChecked = {
	name: string
	slug: string
	isChecked: boolean
}

export const CustomSelect: FC<SelectProps> = observer(
	({ placeholder, form }) => {
		const [isOpened, setIsOpened] = useState<boolean>(false)

		const ref = useRef<HTMLDivElement>(null)
		const placeholderRef = useRef<HTMLDivElement>(null)

		const handleOptionClick = (genre: GenreModel) => {
			form.toggleGenres(genre)
		}

		useEffect(() => {
			const handleClick = (event: MouseEvent) => {
				const { target } = event
				if (target instanceof Node && !ref.current?.contains(target)) {
					if (isOpened) {
						setIsOpened(false)
					}
				}
			}

			window.addEventListener('click', handleClick)

			return () => {
				window.removeEventListener('click', handleClick)
			}
		}, [])

		useEffect(() => {
			const placeholderEl = placeholderRef.current
			if (!placeholderEl) return

			const handleClick = (event: KeyboardEvent) => {
				if (event.key === 'Enter') {
					setIsOpened(!isOpened)
				}
			}

			placeholderEl.addEventListener('keydown', handleClick)

			return () => {
				placeholderEl.removeEventListener('keydown', handleClick)
			}
		}, [])

		const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
			setIsOpened(!isOpened)
		}

		return (
			<div className={styles['border']}>
				<div
					className={styles['selectWrapper']}
					data-is-active={isOpened}
					ref={ref}
				>
					<div className={styles['arrow']}></div>
					<div
						className={styles['placeholder']}
						ref={placeholderRef}
						onClick={handlePlaceHolderClick}
						tabIndex={0}
					>
						{form.selectedGenres.length > 0 &&
							form.selectedGenres.length <= 2 &&
							form.selectedGenres.map((el, index) =>
								index === 0 ? `${el}` : `, ${el}`
							)}
						{!form.selectedGenres.length && placeholder}
						{form.selectedGenres.length > 2 &&
							form.selectedGenres.slice(0, 2).map(el => `${el}, `)}
						{form.selectedGenres.length > 2 &&
							`еще ${form.selectedGenres.length - 2}`}
					</div>
					<ul className={`${styles['options']}`}>
						{form.allGenres.map(genre => (
							<Option
								key={genre.slug}
								option={genre}
								form={form}
								selected={!!form.selectedGenres.find(el => el === genre.name)}
								onClick={opt => handleOptionClick(opt)}
							/>
						))}
					</ul>
				</div>
			</div>
		)
	}
)
