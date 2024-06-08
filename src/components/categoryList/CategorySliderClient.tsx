'use client'
import { useRef } from 'react'
import LeftArrowIcon from '../../../public/assets/icons/LeftArrowIcon'
import RightArrowIcon from '../../../public/assets/icons/RightArrowIcon'
import { CategoryList } from './CategoryList'

interface CategorySliderClientProps {
	categories: any[]
}

export default function CategorySliderClient({
	categories,
}: CategorySliderClientProps): JSX.Element {
	const sliderRef = useRef<HTMLDivElement>(null)

	const scrollLeft = (): void => {
		if (sliderRef.current !== null) {
			const containerWidth = sliderRef.current.clientWidth
			sliderRef.current.scrollBy({
				left: -containerWidth + 20,
				behavior: 'smooth',
			})
		}
	}

	const scrollRight = (): void => {
		if (sliderRef.current !== null) {
			const containerWidth = sliderRef.current.clientWidth
			sliderRef.current.scrollBy({
				left: containerWidth + 20,
				behavior: 'smooth',
			})
		}
	}
	return (
		<div className="slider-wrapper px-5">
			<button onClick={scrollLeft} className="mx-5 slide-button prev-slide">
				<LeftArrowIcon />
			</button>
			<div ref={sliderRef} className="flex gap-5 md:gap-8 overflow-x-scroll scrollbar-hide">
				<CategoryList categories={categories} />
			</div>
			<button onClick={scrollRight} className="mx-5 slide-button next-slide">
				<RightArrowIcon />
			</button>
		</div>
	)
}
