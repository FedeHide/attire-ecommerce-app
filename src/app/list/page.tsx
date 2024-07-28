import Filter from '@/components/Filter'
import ProductList from '@/components/ProductList'
import Skeleton from '@/components/Skeleton'
import type { listSearchParamsProps } from '@/interfaces/searchParamsInterface'
import { wixClientServer } from '@/lib/wixClientServer'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function ListPage({
	searchParams,
}: listSearchParamsProps): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const category = await wixClient.collections.getCollectionBySlug(
		searchParams.cat ?? 'all-products',
	)
	return (
		<div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
			{/* CAMPAIGN */}
			<div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64 ">
				<div className="w-2/3 flex flex-col items-center justify-center gap-8">
					<h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
						Grab up to 50% off on <br /> Selected Products
					</h1>
					<button className="rounded-3xl bg-clrPrimary text-white w-max py-3 px-5 text-sm">
						<Link href="/list?cat=deals">Buy Now</Link>
					</button>
				</div>
				<div className="relative w-1/3">
					<Image
						src="/assets/woman.webp"
						alt="Campaign"
						fill
						className="object-contain"
					/>
				</div>
			</div>
			{/* FILTER */}
			<Filter />
			{/* PRODUCTS */}
			<h1 className="mt-12 text-xl font-semibold">{category.collection?.name} For You!</h1>
			<Suspense fallback={<Skeleton />}>
				<ProductList
					categoryId={category.collection?._id ?? process.env.ALL_PRODUCTS_CATEGORY_ID}
					searchParams={searchParams}
				/>
			</Suspense>
		</div>
	)
}
