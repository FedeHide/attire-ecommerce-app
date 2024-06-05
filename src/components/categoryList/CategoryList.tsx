'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import LeftArrowIcon from '../../../public/assets/icons/LeftArrowIcon'
import RightArrowIcon from '../../../public/assets/icons/RightArrowIcon'
import { categories } from './categories'

export default function CategoryList(): JSX.Element {
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
			<div ref={sliderRef} className="flex  gap-5 md:gap-8 overflow-x-scroll scrollbar-hide">
				{categories.map((category) => (
					<Link
						key={category.id}
						className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
						href="/list?cat=test"
					>
						<div className="relative bg-slate-100 w-full h-96 right-1">
							<Image
								className="object-cover"
								src={category.src}
								alt={category.name}
								fill
								sizes="20vw"
								onError={(e) => {
									e.currentTarget.src = category.src2
								}}
							/>
						</div>
						<h1 className="mt-8 font-light text-xl tracking-wide">{category.name}</h1>
					</Link>
				))}
			</div>
			<button onClick={scrollRight} className="mx-5 slide-button next-slide">
				<RightArrowIcon />
			</button>
		</div>
	)
}
