'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const categories = [
	{
		id: 1,
		name: 'All Products',
		image: 'https://images.pexels.com/photos/2473586/pexels-photo-2473586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 2,
		name: 'Accessories',
		image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 3,
		name: 'Jeans',
		image: 'https://images.pexels.com/photos/16850074/pexels-photo-16850074/free-photo-of-mujer-roto-sentado-tejanos.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 4,
		name: 'Skirts',
		image: 'https://images.pexels.com/photos/1857375/pexels-photo-1857375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 5,
		name: 'Sweaters',
		image: 'https://images.pexels.com/photos/5407259/pexels-photo-5407259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 6,
		name: 'T-shirts',
		image: 'https://images.pexels.com/photos/2328051/pexels-photo-2328051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 7,
		name: 'Coats',
		image: 'https://images.pexels.com/photos/20434986/pexels-photo-20434986/free-photo-of-mujer-modelo-maqueta-chaqueta.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 8,
		name: 'Hats',
		image: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
	{
		id: 9,
		name: 'Home',
		image: 'https://images.pexels.com/photos/5375975/pexels-photo-5375975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		link: '/list?cat=test',
	},
]

export default function CategoryList(): JSX.Element {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	/* slider */

	const handleMouseDown = (e: React.MouseEvent): void => {
		e.preventDefault()
		if (containerRef.current !== null) {
			setIsDragging(true)
			setStartX(e.pageX - containerRef.current.offsetLeft)
			setScrollLeft(containerRef.current.scrollLeft)
		}
	}

	const handleMouseLeave = (): void => {
		setIsDragging(false)
	}

	const handleMouseUp = (): void => {
		setIsDragging(false)
	}

	const handleMouseMove = (e: React.MouseEvent): void => {
		if (!isDragging || containerRef.current === null || containerRef.current === undefined)
			return
		e.preventDefault()
		const x = e.pageX - containerRef.current.offsetLeft
		const walk = (x - startX) * 2
		containerRef.current.scrollLeft = scrollLeft - walk
	}

	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseLeave={handleMouseLeave}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			ref={containerRef}
			className="px-4 overflow-x-scroll scrollbar-hide"
		>
			<div className="flex gap-4 md:gap-8">
				{categories.map((category) => (
					<Link
						key={category.id}
						className="flex-shrink-0 w-full sm:w-1/2 lg:h-1/4 xl:w-1/6"
						href="/list?cat=test"
					>
						<div className="relative bg-slate-100 w-full h-96">
							<Image
								className="object-cover"
								src={category.image}
								alt={category.name}
								fill
								sizes="20vw"
							/>
						</div>
						<h1 className="mt-8 font-light text-xl tracking-wide">{category.name}</h1>
					</Link>
				))}
			</div>
		</div>
	)
}
