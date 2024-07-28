import Link from 'next/link'

export default function TermsConditions(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-80px)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Terms & Conditions</h1>
				<p className="text-gray-700 mb-4">
					Welcome to ATTIRE! These Terms and Conditions govern your use of our website and
					services. By accessing or using our site, you agree to be bound by these terms.
				</p>

				<h2 className="text-xl mb-4">1. Introduction</h2>
				<p className="text-gray-700 mb-4">
					These terms apply to all users of our website and services. If you do not agree
					with any part of these terms, please do not use our site.
				</p>

				<h2 className="text-xl mb-4">2. Use of Site</h2>
				<p className="text-gray-700 mb-4">
					You agree to use our site for lawful purposes only and not to engage in any
					activities that could harm our website or interfere with its operation.
				</p>

				<h2 className="text-xl mb-4">3. Intellectual Property</h2>
				<p className="text-gray-700 mb-4">
					All content on our site, including text, images, and logos, is the property of
					[Your Store Name] and may not be used without permission.
				</p>

				<h2 className="text-xl mb-4">4. Limitation of Liability</h2>
				<p className="text-gray-700 mb-4">
					We are not liable for any indirect, incidental, or consequential damages arising
					from your use of our website or services.
				</p>

				<h2 className="text-xl mb-4">5. Changes to Terms</h2>
				<p className="text-gray-700 mb-4">
					We may update these terms from time to time. It is your responsibility to review
					these terms periodically for any changes.
				</p>

				<h2 className="text-xl mb-4">6. Contact Us</h2>
				<p className="text-gray-700 mb-4">
					If you have any questions about these Terms and Conditions, please contact us at{' '}
					<Link
						href="mailto:support@ATTIRE.com"
						target="_blank"
						className="text-blue-500 underline"
					>
						support@ATTIRE.com
					</Link>
				</p>
			</div>
		</div>
	)
}
