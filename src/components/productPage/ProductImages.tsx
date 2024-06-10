'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductImages({ items }: { items: any }): JSX.Element {
	const [index, setIndex] = useState(0)

	return (
		<section>
			<div className="h-[500px] relative">
				<Image
					src={items[index].image?.url}
					alt={items[index].title}
					fill
					sizes="50vw"
					className="object-contain rounded-md"
				/>
			</div>
			<div className="flex justify-between gap-4 mt-8">
				{items.map((item: any, i: number) => (
					<div
						key={item._id}
						onClick={() => {
							setIndex(i)
						}}
						className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
					>
						<Image
							src={item.image?.url}
							alt={item.title}
							fill
							sizes="30vw"
							className="object-cover rounded-md"
						/>
					</div>
				))}
			</div>
		</section>
	)
}
