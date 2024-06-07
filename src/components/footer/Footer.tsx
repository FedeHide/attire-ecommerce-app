import Image from 'next/image'
import Link from 'next/link'
import { footerSocials } from './footerSocials'
import { footerPayments } from './footerPayments'
import { footerLinks } from './footerLinks'

export default function Footer(): JSX.Element {
	return (
		<div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24">
			{/* TOP */}
			<div className="flex flex-col md:flex-row justify-between gap-24">
				{/* TOP-LEFT */}
				<div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
					<Link href="/">
						<div className="text-2xl tracking-wide">ATTIRE</div>
					</Link>
					<p>1234 Maple Street, Oakwood Center, Pineville, TX 75001, United States</p>
					<span className="font-semibold">info@ATTIRE.com</span>
					<span className="font-semibold">+1 234 567 890</span>
					<div className="flex gap-6">
						{footerSocials.map((social) => (
							<Link key={social.id} href={social.href} target="_blank">
								<Image
									className="w-auto h-auto"
									src={social.src}
									alt={social.title}
									width={16}
									height={16}
								/>
							</Link>
						))}
					</div>
				</div>
				{/* TOP-CENTER */}
				<div className="hidden lg:flex justify-between w-1/2">
					{footerLinks.map((link) => (
						<div key={link.id} className="flex flex-col justify-between">
							<h1 className="font-medium text-lg">{link.title}</h1>
							<div className="flex flex-col gap-6">
								{link.links.map((item) => (
									<Link
										className="hover:underline"
										key={item.title}
										href={item.href}
									>
										{item.title}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
				{/* TOP-RIGHT */}
				<div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
					<h1 className="font-medium text-lg">SUBSCRIBE</h1>
					<p>
						Be the first to know about the latest trends, exclusive promotions, and
						more!
					</p>
					<div className="flex">
						<input type="text" placeholder="Email address" className="p-4 w-3/4" />
						<button className="w-1/4 bg-clrPrimary hover:brightness-110 text-white">
							JOIN
						</button>
					</div>
					<span className="font-semibold">Payments</span>
					<div className="flex justify-between w-auto h-auto">
						{footerPayments.map((pay) => (
							<Image
								className="w-auto h-auto"
								key={pay.id}
								src={pay.src}
								alt={pay.title}
								width={32}
								height={32}
							/>
						))}
					</div>
				</div>
			</div>
			{/* BOTTOM */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
				<div>©️ 2024 ATTIRE Shop</div>
				<div className="flex flex-col gap-8 md:flex-row">
					<div>
						<span className="text-gray-500 mr-4">Language</span>
						<span className="font-medium">United States | English</span>
					</div>
					<div>
						<span className="text-gray-500 mr-4">Currency</span>
						<span className="font-medium">$ USD</span>
					</div>
				</div>
			</div>
		</div>
	)
}
