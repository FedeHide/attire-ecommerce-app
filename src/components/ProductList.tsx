import Image from 'next/image'
import Link from 'next/link'

const products = [
	{
		id: 1,
		title: 'Bonsai Tree',
		description: 'Elegant indoor potted plant',
		price: 45,
		img: 'https://images.pexels.com/photos/4050790/pexels-photo-4050790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		img2: 'https://images.pexels.com/photos/8408547/pexels-photo-8408547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 2,
		title: 'Red Cocktail Dress',
		description: 'Stylish evening wear',
		price: 125,
		img: 'https://images.pexels.com/photos/16922808/pexels-photo-16922808/free-photo-of-mujer-modelo-maqueta-sombrero.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		img2: 'https://images.pexels.com/photos/16922810/pexels-photo-16922810/free-photo-of-mujer-sentado-sombrero-gorro.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 3,
		title: 'Checkered Shirt',
		description: 'Casual checkered shirt',
		price: 30,
		img: 'https://images.pexels.com/photos/18185494/pexels-photo-18185494/free-photo-of-hombre-calle-chaqueta-joven.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		img2: 'https://images.pexels.com/photos/18185493/pexels-photo-18185493/free-photo-of-hombre-chaqueta-joven-guapo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
	{
		id: 4,
		title: 'Classic Hoodie',
		description: 'Comfortable casual wear',
		price: 40,
		img: 'https://images.pexels.com/photos/2932727/pexels-photo-2932727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
		img2: 'https://images.pexels.com/photos/2932740/pexels-photo-2932740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
	},
]

export default function ProductList() {
	return (
		<div className="flex gap-x-8 gap-y-16 justify-between flex-wrap mt-12">
			{products.map((product) => (
				<Link
					key={product.id}
					className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
					href="/test"
				>
					<div className="relative w-full h-80">
						<Image
							src={product.img}
							alt={product.title}
							className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
							sizes="25vw"
							fill
						/>
						<Image
							src={product.img2}
							alt={product.title}
							className="absolute object-cover rounded-md"
							sizes="25vw"
							fill
						/>
					</div>
					<div className="flex justify-between">
						<span className="font-medium">{product.title}</span>
						<span className="font-semibold">${product.price}</span>
					</div>
					<div className="text-sm text-gray-500">{product.description}</div>
					<button className="w-max rounded-2xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 text-xs hover:bg-clrPrimary hover:text-white transition-colors ease-in duration-200">
						Add to Cart
					</button>
				</Link>
			))}
		</div>
	)
}

{
}
