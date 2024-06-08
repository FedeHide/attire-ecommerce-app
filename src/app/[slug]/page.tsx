import AddItem from '@/components/productPage/AddItem'
import CustomizeProducts from '@/components/productPage/CustomizeProducts'
import ProductImages from '@/components/productPage/ProductImages'
import { wixClientServer } from '@/lib/wixClientServer'
import { notFound } from 'next/navigation'

export default async function SinglePage({
	params,
}: {
	params: { slug: string }
}): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const products = await wixClient.products.queryProducts().eq('slug', params.slug).find()

	if (products.items.length === 0) {
		return notFound()
	}

	const product = products.items[0]
	return (
		<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
			{/* IMG */}
			<div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
				<ProductImages items={product.media?.items} />
			</div>
			{/* ProductDetails */}
			<div className="w-full lg:w-1/2 flex flex-col gap-6">
				<h1 className="text-4xl font-medium">{product.name}</h1>
				<p className="text-gray-500">{product.description}</p>
				<div className="h-[2px] bg-gray-100"></div>
				{product.price?.price === product.price?.discountedPrice ? (
					<h2 className="font-medium text-2xl">${product.price?.price}</h2>
				) : (
					<div className="flex items-center gap-4">
						<h3 className="text-xl text-gray-500 line-through">
							${product.price?.price}
						</h3>
						<h2 className="font-medium text-2xl">${product.price?.discountedPrice}</h2>
					</div>
				)}
				<div className="h-[2px] bg-gray-100"></div>
				<CustomizeProducts />
				<AddItem />
				<div className="h-[2px] bg-gray-100"></div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">PRODUCT INFO</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
						fugit, repudiandae ab quae perferendis quos beatae est voluptatem delectus
						velit? Eius natus nulla cupiditate dolore.
					</p>
				</div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
						fugit, repudiandae ab quae perferendis quos beatae est voluptatem delectus
						velit? Eius natus nulla cupiditate dolore.
					</p>
				</div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">SHIPPING INFO</h4>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus
						fugit, repudiandae ab quae perferendis quos beatae est voluptatem delectus
						velit? Eius natus nulla cupiditate dolore.
					</p>
				</div>
			</div>
		</div>
	)
}
