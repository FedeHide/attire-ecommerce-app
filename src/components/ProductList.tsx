import { wixClientServer } from '@/lib/wixClientServer'
import type { products } from '@wix/stores'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'

const PRODUCT_PER_PAGE = 20

export default async function ProductList({
	categoryId,
	limit,
}: {
	categoryId: string
	limit?: number
}): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const res = await wixClient.products
		.queryProducts()
		.eq('collectionIds', categoryId)
		.limit(limit ?? PRODUCT_PER_PAGE)
		.find()

	return (
		<div className="flex gap-x-8 gap-y-16 justify-between flex-wrap mt-12">
			{res.items.map((product: products.Product) => (
				<Link
					key={product._id}
					className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
					href={`/${product.slug}`}
				>
					<div className="relative w-full h-80">
						<Image
							src={product.media?.mainMedia?.image?.url ?? '/product.png'}
							alt={(product.name !== null).toString()}
							className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease-in-out duration-500"
							sizes="25vw"
							fill
						/>
						{product.media?.items !== undefined && product.media.items.length > 1 && (
							<Image
								src={product.media?.items[1]?.image?.url ?? '/product.png'}
								alt={(product.name !== null).toString()}
								className="absolute object-cover rounded-md"
								sizes="25vw"
								fill
							/>
						)}
					</div>
					<div className="flex justify-between sm:gap-4">
						<span className="font-medium">{product.name}</span>
						{product.price?.discountedPrice !== product.price?.price ? (
							<div className="flex flex-row items-center gap-4 md:flex-row md:gap-4 lg:flex-col xl:flex-row ">
								<span className="font-semibold text-gray-500 line-through">
									${product.price?.price}
								</span>
								<span className="font-semibold">
									${product.price?.discountedPrice}
								</span>
							</div>
						) : (
							<div className="flex flex-row items-center gap-4 md:flex-row md:gap-4 lg:flex-col xl:flex-row ">
								<span className="font-semibold">${product.price?.price}</span>
							</div>
						)}
					</div>
					{product.additionalInfoSections !== undefined &&
						product.additionalInfoSections !== null && (
							<div
								className="text-sm text-gray-500"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										product.additionalInfoSections.find(
											(section: any) => section.title === 'shortDesc',
										)?.description ?? 'No description available',
									),
								}}
							></div>
						)}
					<button className="w-max rounded-2xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 text-xs hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white transition-colors ease-in duration-200">
						Add to Cart
					</button>
				</Link>
			))}
		</div>
	)
}
