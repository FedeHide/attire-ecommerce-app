import AddItem from '@/components/productPage/AddItem'
import CustomizeProducts from '@/components/productPage/CustomizeProducts'
import ProductImages from '@/components/productPage/ProductImages'
import { wixClientServer } from '@/lib/wixClientServer'
import Link from 'next/link'
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
				<p className="font-bold">Description</p>
				<p className="text-gray-500">{product.description?.replace(/<[^>]*>?/gm, '')}</p>
				{product.variants !== null && product.productOptions !== null && (
					<CustomizeProducts
						productId={product._id}
						variants={product.variants}
						productOptions={product.productOptions}
					/>
				)}
				<AddItem />
				<div className="h-[2px] bg-gray-100"></div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">TERMS & CONDITIONS</h4>
					<p>
						By using our website and making a purchase, you agree to our Terms &
						Conditions. Please review them to understand your rights and obligations.
					</p>
				</div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
					<p>
						We accept returns within 30 days of purchase for a full refund. Items must
						be unused and in original packaging. Return shipping is at customer&apos;s
						expense. Contact us at{' '}
						<Link
							className="text-blue-500 hover:text-blue-300"
							href="mailto:info@ATTIRE.com"
							target="_blank"
						>
							info@ATTIRE.com
						</Link>{' '}
						for return instructions.
					</p>
				</div>
				<div className="text-sm">
					<h4 className="font-medium mb-4">SHIPPING INFO</h4>
					<p>
						We offer worldwide shipping with standard delivery times of 5-10 business
						days. Orders are processed within 2 business days. Shipping costs are
						calculated at checkout. Track your order via the link provided in your
						confirmation email.
					</p>
				</div>
			</div>
		</div>
	)
}
