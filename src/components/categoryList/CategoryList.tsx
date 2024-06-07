import Image from 'next/image'
import Link from 'next/link'
import { wixClientServer } from '@/lib/wixClientServer'

export default async function CategoryList(): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const categories = await wixClient.collections.queryCollections().find()
	const filteredCategories = categories.items.filter((category) => category.slug !== 'new')
	return (
		<>
			{filteredCategories.map((category) => (
				<Link
					key={category._id}
					className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
					href={`/list?cat=${category.slug}`}
				>
					<div className="relative bg-slate-100 w-full h-96 right-1">
						<Image
							className="object-cover"
							src={category.media?.mainMedia?.image?.url ?? '/product.png'}
							alt={(category.name !== null).toString()}
							fill
							sizes="20vw"
						/>
					</div>
					<h1 className="mt-8 font-light text-xl tracking-wide">{category.name}</h1>
				</Link>
			))}
		</>
	)
}
