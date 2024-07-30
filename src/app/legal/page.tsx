import Link from 'next/link'

export default function LegalAndPrivacy(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-10%)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Legal & Privacy</h1>
				<p className="text-gray-700 mb-4">
					At ATTIRE!, we are committed to protecting your privacy and ensuring the
					security of your personal information. Below is a summary of our legal and
					privacy practices.
				</p>

				<h2 className="text-xl mb-4">Privacy Policy</h2>
				<p className="text-gray-700 mb-4">
					We take your privacy seriously. For details on how we handle your personal data,
					please refer to our privacy policy available on our website.
				</p>

				<h2 className="text-xl mb-4">Terms of Service</h2>
				<p className="text-gray-700 mb-4">
					By using our services, you agree to our{' '}
					<Link href="/terms" className="text-blue-500 underline">
						Terms of Service
					</Link>
					. Please review these terms carefully.
				</p>
				<h2 className="text-xl mb-4">Return Policy</h2>
				<p className="text-gray-700 mb-4">
					If you need to return an item, please refer to our return policy for guidance on
					the process and conditions.
				</p>
				<h2 className="text-xl mb-4">Cookies Policy</h2>
				<p className="text-gray-700 mb-4">
					Our site uses cookies to enhance your experience. For more information, please
					review our cookies policy.
				</p>
				<p className="text-gray-700 mt-8 mb-4">
					If you have any questions or concerns regarding our legal policies, please visit
					our{' '}
					<Link href="/contact" className="text-blue-500 underline">
						contact page
					</Link>
					.
				</p>
			</div>
		</div>
	)
}
