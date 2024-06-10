'use client'
export default function Pagination(): JSX.Element {
	return (
		<section className="mt-12 flex justify-between w-full">
			<button className="rounded-md bg-clrPrimary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200">
				Previous
			</button>
			<button className="rounded-md bg-clrPrimary text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200">
				Next
			</button>
		</section>
	)
}
