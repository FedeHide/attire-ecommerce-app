export default function FAQ(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-10%)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Frequently Asked Questions</h1>

				<div className="text-left">
					<h2 className="text-xl mb-4">What is your return policy?</h2>
					<p className="text-gray-700 mb-6">
						Our return policy allows you to return items within 30 days of purchase.
						Please ensure that the items are in their original condition with tags
						attached.
					</p>

					<h2 className="text-xl mb-4">How can I track my order?</h2>
					<p className="text-gray-700 mb-6">
						Once your order has shipped, you will receive an email with a tracking
						number and a link to track your shipment.
					</p>

					<h2 className="text-xl mb-4">Do you offer international shipping?</h2>
					<p className="text-gray-700 mb-6">
						Yes, we offer international shipping to most countries. Shipping rates and
						delivery times vary by location.
					</p>

					<h2 className="text-xl mb-4">What payment methods do you accept?</h2>
					<p className="text-gray-700 mb-6">
						We accept major credit cards, PayPal, and other secure payment methods.
						Payment options are available at checkout.
					</p>

					<h2 className="text-xl mb-4">How can I contact customer support?</h2>
					<p className="text-gray-700 mb-6">
						You can contact our customer support team via email at{' '}
						<a href="mailto:support@attire.com" className="text-blue-500 underline">
							support@attire.com
						</a>{' '}
						or by calling +1 (123) 456-7890.
					</p>
				</div>
			</div>
		</div>
	)
}
