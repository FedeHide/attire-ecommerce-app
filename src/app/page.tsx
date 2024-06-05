import CategoryList from '@/components/categoryList/CategoryList'
import ProductList from '@/components/ProductList'
import Slider from '@/components/heroSlider/Slider'
import { wixClientServer } from '@/lib/wixClientServer'
// import { useEffect } from 'react'
// import { useWixClient } from '@/hooks/useWixClient'

export default async function Home(): Promise<JSX.Element> {
	// const wixClient = useWixClient()

	// useEffect(() => {
	// 	const getProducts = async (): Promise<void> => {
	// 		try {
	// 			const res = await wixClient.products.queryProducts().find()
	// 			console.log(res)
	// 		} catch (error) {
	// 			console.error('Error fetching products:', error)
	// 		}
	// 	}

	// 	getProducts()
	// }, [wixClient])

	const wixClient = await wixClientServer()
	const res = await wixClient.products.queryProducts().find()
	console.log(res)

	return (
		<>
			<div>
				<Slider />
				<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
					<h1 className="text-2xl">Featured Products</h1>
					<ProductList />
				</div>
				<div className="mt-24">
					<h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
						Categories
					</h1>
					<CategoryList />
				</div>
				<div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
					<h1 className="text-2xl">New Products</h1>
					<ProductList />
				</div>
			</div>
		</>
	)
}
