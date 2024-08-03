'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Filter(): JSX.Element {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const [typeValue, setTypeValue] = useState('Type')
	const [minValue, setMinValue] = useState('')
	const [maxValue, setMaxValue] = useState('')
	const [sortValue, setSortValue] = useState('Sort By')

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	): void => {
		const { name, value } = e.target
		const params = new URLSearchParams(searchParams)
		params.set(name, value)
		router.replace(`${pathname}?${params.toString()}`)
		if (name === 'type') setTypeValue(value)
		if (name === 'min') setMinValue(value)
		if (name === 'max') setMaxValue(value)
		if (name === 'sort') setSortValue(value)
	}

	const handleResetFilters = (): void => {
		const params = new URLSearchParams(searchParams)
		params.delete('type')
		params.delete('min')
		params.delete('max')
		params.delete('sort')
		router.replace(`${pathname}?${params.toString()}`)
		setTypeValue('Type')
		setMinValue('')
		setMaxValue('')
		setSortValue('Sort By')
	}

	return (
		<section className="mt-12 flex flex-wrap gap-8 justify-between">
			<div className="flex gap-6 flex-wrap">
				<select
					name="type"
					className="py-2 px-10 sm:px-4 rounded-2xl text-sm sm:text-xs font-medium bg-[#EBEDED]"
					onChange={handleFilterChange}
					value={typeValue}
				>
					<option disabled>Type</option>
					<option value="new">New</option>
					<option value="discount">Discount</option>
				</select>
				<input
					type="text"
					name="min"
					placeholder="min price"
					className="text-sm sm:text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
					onChange={handleFilterChange}
					value={minValue}
				/>
				<input
					type="text"
					name="max"
					placeholder="max price"
					className="text-sm sm:text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
					onChange={handleFilterChange}
					value={maxValue}
				/>
				<select
					name="sort"
					className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
					onChange={handleFilterChange}
					value={sortValue}
				>
					<option disabled>Sort By</option>
					<option value="ascPrice">Price (low to high)</option>
					<option value="descPrice">Price (high to low)</option>
					<option value="ascLastUpdated">Newest</option>
					<option value="descLastUpdated">Oldest</option>
				</select>
			</div>
			<div>
				<button
					onClick={handleResetFilters}
					className="w-max rounded-2xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 text-xs hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white transition-colors ease-in duration-200"
				>
					Reset Filters
				</button>
			</div>
		</section>
	)
}
