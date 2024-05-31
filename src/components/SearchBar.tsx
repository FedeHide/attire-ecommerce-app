'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function SearchBar(): JSX.Element {
	const router = useRouter()

	const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const name = formData.get('name') as string

		if (name !== '') {
			router.push(`/list?name=${name}`)
		}
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
				<Image src="/assets/search.png" alt="search" width={16} height={16} />
			</button>
		</form>
	)
}
