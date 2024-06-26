import ProductList from '@/components/ProductList'
import Slider from '@/components/heroSlider/Slider'
import { Suspense } from 'react'
import Skeleton from '@/components/Skeleton'
import CategorySlider from '@/components/categoryList/CategorySlider'

export default async function Home(): Promise<JSX.Element> {
	return (
		<>
			<section>
				<Slider />
				<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
					<h1 className="text-2xl">Featured Products</h1>
					<Suspense fallback={<Skeleton />}>
						<ProductList
							categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID ?? ''}
							limit={4}
						/>
					</Suspense>
				</div>
				<section className="mt-24">
					<h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
						Categories
					</h1>
					<Suspense fallback={<Skeleton />}>
						<CategorySlider />
					</Suspense>
				</section>
				<section className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
					<h1 className="text-2xl">New Products</h1>
					<ProductList
						categoryId={process.env.NEW_PRODUCTS_CATEGORY_ID ?? ''}
						limit={4}
					/>
				</section>
			</section>
		</>
	)
}
