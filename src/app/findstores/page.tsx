import Link from 'next/link'

export default function FindAStore(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-80px)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Find a Store</h1>
				<p className="text-gray-700 mb-4">
					Looking for one of our stores? Use the store locator below to find the nearest
					location to you.
				</p>
				<p className="text-gray-700 mb-4">Enter your city or ZIP code:</p>
				<input
					type="text"
					placeholder="City or ZIP code"
					className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full md:w-1/2"
				/>
				<Link target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
					<button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
						Search
					</button>
				</Link>

				<p className="text-gray-700 mt-8 mb-4">
					For more information, you can also visit our{' '}
					<Link href="/contact" className="text-blue-500 underline">
						contact page
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
