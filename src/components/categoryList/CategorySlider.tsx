import CategorySliderClient from './CategorySliderClient'
import { wixClientServer } from '../../lib/wixClientServer'

export default async function CategorySlider(): Promise<JSX.Element> {
	const wixClient = await wixClientServer()
	const categories = await wixClient.collections.queryCollections().find()
	const filteredCategories = categories.items.filter((category) => category.slug !== 'new')

	return <CategorySliderClient categories={filteredCategories} />
}
