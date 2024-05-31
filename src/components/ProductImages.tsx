'use client'
import Image from 'next/image'
import { useState } from 'react'

const images = [
	{
		id: 1,
		title: 'Bonsai Tree',
		src: 'https://images.pexels.com/photos/4050790/pexels-photo-4050790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 2,
		title: 'Bonsai Tree',
		src: 'https://images.pexels.com/photos/8408547/pexels-photo-8408547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 3,
		title: 'Bonsai Tree',
		src: 'https://images.pexels.com/photos/2778192/pexels-photo-2778192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 4,
		title: 'Bonsai Tree',
		src: 'https://images.pexels.com/photos/6072061/pexels-photo-6072061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
]

export default function ProductImages(): JSX.Element {
	const [index, setIndex] = useState(0)

	return (
		<div>
			<div className="h-[500px] relative">
				<Image
					src={images[index].src}
					alt={images[index].title}
					fill
					sizes="50vw"
					className="object-contain rounded-md"
				/>
			</div>
			<div className="flex justify-between gap-4 mt-8">
				{images.map((image, i) => (
					<div
						key={image.id}
						onClick={() => {
							setIndex(i)
						}}
						className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
					>
						<Image
							src={image.src}
							alt={image.title}
							fill
							sizes="30vw"
							className="object-cover rounded-md"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
