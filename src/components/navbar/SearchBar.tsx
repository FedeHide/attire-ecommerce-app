'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { productListSearchFilter } from './searchBarFilter'

export default function SearchBar(): JSX.Element {
	const router = useRouter()

	const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('name') as string

		if (name !== '') {
			const cleanedName = name.replace(/[^a-zA-Z\s]/g, '').toLowerCase()
			const searchTerm = cleanedName.split(' ')
			const key = findKeyFromKeywords(searchTerm)

			if (key != null) {
				router.push(key)
			} else {
				console.log('No se encontraron coincidencias para la búsqueda.')
			}
		}
	}

	const findKeyFromKeywords = (keywords: string[]): string | null => {
		for (const [key, keywordArray] of Object.entries(productListSearchFilter)) {
			if (keywords.some((keyword) => keywordArray.includes(keyword))) {
				return key
			}
		}
		return null
	}

	return (
		<form
			className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
			onSubmit={handleSearch}
		>
			<input
				className="flex-1 bg-transparent outline-none"
				name="name"
				type="text"
				placeholder="Search"
			/>
			<button className="cursor-pointer">
				<Image src="/assets/icons/search-icon.png" alt="search" width={16} height={16} />
			</button>
		</form>
	)
}
