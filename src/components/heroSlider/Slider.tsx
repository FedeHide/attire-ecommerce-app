'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { slides } from './sliderCards'

export default function Slider(): JSX.Element {
	const [current, setCurrent] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
		}, 5000)

		return () => {
			clearInterval(interval)
		}
	}, [current])

	return (
		<section className="h-[calc(100vh-80px)] overflow-hidden">
			<div
				className="w-max h-full flex transition-all ease-in-out duration-1000"
				style={{ transform: `translateX(-${current * 100}vw)` }}
			>
				{slides.map((slide) => (
					<article
						className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
						key={slide.id}
					>
						{/* TEXT CONTAINER */}
						<div className="h-1/2 xl:w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
							<h2 className="text-xl lg:text-3xl 2xl:text-5xl">
								{slide.description}
							</h2>
							<h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
								{slide.title}
							</h1>
							<Link href={slide.url}>
								<button>SHOP NOW</button>
							</Link>
						</div>
						{/* IMAGE CONTAINER */}
						<div className="h-1/2 xl:w-1/2 xl:h-full relative">
							<Image
								src={slide.img}
								alt={slide.title}
								fill
								sizes="100%"
								priority
								fetchPriority="high"
								className="object-cover"
							/>
						</div>
					</article>
				))}
			</div>
			<div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						onClick={() => {
							setCurrent(index)
						}}
						className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? 'scale-150' : ''}`}
					>
						{current === index && (
							<div className="w-[6px] h-[6px] rounded-full bg-gray-600"></div>
						)}
					</div>
				))}
			</div>
		</section>
	)
}
