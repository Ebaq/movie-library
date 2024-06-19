import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { GenreModel } from '../../Models/GenreModel'
import { IListForm } from '../../forms/ListForm'
import styles from './Option.module.scss'

type OptionProps = {
	option: GenreModel
	selected?: boolean
	form: IListForm
	className?: string
	onClick: (value: GenreModel) => void
}

export const Option: FC<OptionProps> = ({
	option,
	selected,
	className,
	form,
	onClick,
}) => {
	const { name, slug } = option
	const [sel, setSel] = useState(selected ?? false)
	const optionRef = useRef<HTMLLIElement>(null)
	const handleClick =
		(genre: GenreModel): MouseEventHandler<HTMLLIElement> =>
		() => {
			onClick(genre)
			setSel(prev => !prev)
		}

	useEffect(() => {
		const optionEl = optionRef.current
		if (!option) return

		const handleEnterPress = (event: KeyboardEvent) => {
			if (document.activeElement === optionEl && event.key === 'Enter') {
				onClick(option)
				setSel(prev => !prev)
			}
		}

		optionEl!.addEventListener('keydown', handleEnterPress)

		return () => {
			optionEl!.removeEventListener('keydown', handleEnterPress)
		}
	}, [slug, onClick])

	return (
		<li
			className={`${styles['option']} ${className ? className : ''}`}
			value={slug}
			data-selected={sel}
			onClick={handleClick(option)}
			tabIndex={0}
			ref={optionRef}
		>
			{name}
		</li>
	)
}
