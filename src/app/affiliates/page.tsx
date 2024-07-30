import Link from 'next/link'

export default function Affiliates(): JSX.Element {
	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-10%)] justify-center">
			<div className="w-full md:w-2/3 lg:w-1/2 text-center">
				<h1 className="text-2xl mb-8">Affiliate Program</h1>
				<p className="text-gray-700 mb-4">
					Join our affiliate program and earn commissions by promoting our products.
					It&apos;s a great way to earn money while helping others discover our stylish
					and high-quality clothing.
				</p>
				<p className="text-gray-700 mb-4">
					As an affiliate, you will receive a unique referral link and access to
					promotional materials. You&apos;ll earn a commission for every sale made through
					your link.
				</p>
				<p className="text-gray-700 mb-4">
					If you&apos;re interested in joining our affiliate program, please contact us
					at:{' '}
					<Link
						href="mailto:affiliates@ATTIRE.com"
						target="_blank"
						className="text-blue-500 underline"
					>
						affiliates@ATTIRE.com
					</Link>
				</p>
				<p className="text-gray-700 mb-4">We look forward to partnering with you!</p>
			</div>
		</div>
	)
}
