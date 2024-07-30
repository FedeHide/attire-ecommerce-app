import Link from 'next/link'

export default function CustomerService(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-10%)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Customer Service</h1>
				<p className="text-gray-700 mb-4">
					At ATTIRE!, we are committed to providing excellent customer service. If you
					have any questions or need assistance, please don&apos;t hesitate to contact us.
				</p>
				<h2 className="text-xl mb-4">Contact Us</h2>
				<p className="text-gray-700 mb-4">
					You can reach us through the following methods:
				</p>
				<p className="text-gray-700 mb-4">
					<strong>Phone:</strong> +1 (123) 456-7890
				</p>
				<p className="text-gray-700 mb-4">
					<strong>Email:</strong>{' '}
					<Link
						href="mailto:service@attire.com"
						target="_blank"
						className="text-blue-500 underline"
					>
						service@ATTIRE.com
					</Link>
				</p>
				<p className="text-gray-700 mb-4">
					<strong>Address:</strong> 1234 Maple Street, Oakwood Center, Pineville, TX
					75001, United States
				</p>

				<h2 className="text-xl mb-4">FAQs</h2>
				<p className="text-gray-700 mb-4">
					For common questions, please visit our{' '}
					<a href="/faq" className="text-blue-500 underline">
						FAQ page
					</a>
					.
				</p>

				<h2 className="text-xl mb-4">Customer Support Hours</h2>
				<p className="text-gray-700 mb-4">Our customer support team is available:</p>
				<p className="text-gray-700 mb-4">Monday - Friday: 9:00 AM - 6:00 PM (CST)</p>
				<p className="text-gray-700 mb-4">Saturday - Sunday: Closed</p>
			</div>
		</div>
	)
}
