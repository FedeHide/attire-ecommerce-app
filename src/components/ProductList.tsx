import { wixClientServer } from '@/lib/wixClientServer'
import type { products } from '@wix/stores'
import Image from 'next/image'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import Pagination from './Pagination'
import type { productListSearchParams } from '@/interfaces/searchParamsInterface'

const PRODUCT_PER_PAGE = 50

export default async function ProductList({
	categoryId,
	limit,
	searchParams,
}: {
	categoryId: string | undefined | null | boolean
	limit?: number
	searchParams?: productListSearchParams
}): Promise<JSX.Element> {
	const wixClient = await wixClientServer()

	const productQuery = wixClient.products
		.queryProducts()
		.startsWith('name', searchParams?.name ?? '')
		.eq('collectionIds', categoryId)
		.gt('priceData.price', searchParams?.min ?? 0)
		.lt('priceData.price', searchParams?.max ?? 999999)
		.limit(limit ?? PRODUCT_PER_PAGE)

	const res = await productQuery.find()
	const sortedAndTyped = res.items.filter((product: products.Product) => {
		if (searchParams?.type !== undefined && searchParams.type !== '') {
			if (searchParams.type === 'new') {
				if (product.ribbon === 'New') {
					return product
				}
			}

			if (searchParams.type === 'discount') {
				if (product.discount?.type === 'PERCENT') {
					return product
				}
			}
		} else {
			return product
		}
		return null
	})

	if (searchParams?.sort !== undefined && searchParams.sort !== '') {
		if (searchParams.sort === 'ascPrice') {
			sortedAndTyped.sort((a: products.Product, b: products.Product) => {
				const priceA = a.price?.discountedPrice ?? 0
				const priceB = b.price?.discountedPrice ?? 0
				return priceA - priceB
			})
		}

		if (searchParams.sort === 'descPrice') {
			sortedAndTyped.sort((a: products.Product, b: products.Product) => {
				const priceA = a.price?.discountedPrice ?? 0
				const priceB = b.price?.discountedPrice ?? 0
				return priceB - priceA
			})
		}

		if (searchParams.sort === 'ascLastUpdated') {
			sortedAndTyped.sort((a: products.Product, b: products.Product) => {
				const dateA = new Date(a.lastUpdated ?? 0).getTime()
				const dateB = new Date(b.lastUpdated ?? 0).getTime()
				return dateB - dateA
			})
		}

		if (searchParams.sort === 'descLastUpdated') {
			sortedAndTyped.sort((a: products.Product, b: products.Product) => {
				const dateA = new Date(a.lastUpdated ?? 0).getTime()
				const dateB = new Date(b.lastUpdated ?? 0).getTime()
				return dateA - dateB
			})
		}
	}

	return (
		<section className="flex gap-x-8 gap-y-16 flex-wrap mt-12">
			{sortedAndTyped.map((product: products.Product) => (
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
					<section className="flex justify-between sm:gap-4">
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
					</section>
					{product.additionalInfoSections !== undefined &&
						product.additionalInfoSections !== null && (
							<section
								className="text-sm text-gray-500"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(
										product.additionalInfoSections.find(
											(section: any) => section.title === 'shortDesc',
										)?.description ?? 'No description available',
									),
								}}
							></section>
						)}
					<button className="w-max rounded-2xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 text-xs hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white transition-colors ease-in duration-200">
						Add to Cart
					</button>
				</Link>
			))}
			<Pagination /* currentPage={res.items} */ />
		</section>
	)
}
