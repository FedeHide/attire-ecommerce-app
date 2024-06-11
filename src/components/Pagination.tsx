'use client'
import type { PaginationProps } from '@/interfaces/paginationInterface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Pagination({
	currentPage,
	hasPrev,
	hasNext,
	maxPages,
}: PaginationProps): JSX.Element {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()

	const createPageUrl = (pageNumber: number): void => {
		const params = new URLSearchParams(searchParams)
		params.set('page', pageNumber.toString())
		router.replace(`${pathname}?${params.toString()}`)
	}

	return (
		<section className="mt-12 flex justify-between w-full">
			<button
				className="rounded-md bg-clrPrimary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
				disabled={!hasPrev}
				onClick={() => {
					createPageUrl(currentPage - 1)
				}}
			>
				Previous
			</button>
			<div className="flex items-center justify-evenly w-1/4">
				{Array.from({ length: maxPages }, (_, i) => i + 1).map((page) => (
					<p
						key={page}
						className={`font-semibold text-md ${page === currentPage + 1 ? 'text-clrPrimary' : ''}`}
					>
						{page}
					</p>
				))}
			</div>
			<button
				className="rounded-md bg-clrPrimary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
				disabled={!hasNext}
				onClick={() => {
					createPageUrl(currentPage + 1)
				}}
			>
				Next
			</button>
		</section>
	)
}
