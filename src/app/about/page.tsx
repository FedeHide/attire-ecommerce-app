import Image from 'next/image'
import Link from 'next/link'

export default function About(): JSX.Element {
	return (
		<section className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-80px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
			<article className="w-full md:w-1/2">
				<h1 className="text-2xl">About Us</h1>
				<p className="mt-4 text-gray-700">
					Welcome to ATTIRE! We are a fashion-forward women&apos;s clothing boutique
					located at the heart of Pineville, Texas. Our mission is to provide stylish and
					affordable clothing options for women of all ages and sizes.
				</p>
				<p className="mt-4 text-gray-700">
					Our journey began with a simple idea: to create a space where women can find
					unique and trendy pieces that make them feel confident and beautiful. Whether
					you&apos;re looking for the perfect dress for a special occasion, casual wear
					for everyday comfort, or accessories to complete your outfit, we&apos;ve got you
					covered.
				</p>
				<p className="mt-4 text-gray-700">
					At ATTIRE, we believe in quality, comfort, and style. We work closely with
					designers and manufacturers to bring you the latest trends and timeless
					classics. Our team is dedicated to providing exceptional customer service and a
					shopping experience that is both enjoyable and convenient.
				</p>
				<p className="mt-4 text-gray-700">
					Visit us at our store located at 1234 Maple Street, Oakwood Center, Pineville,
					TX 75001, United States. You can also reach us at{' '}
					<Link
						href="mailto:info@ATTIRE.com"
						target="_blank"
						className="text-blue-500 underline"
					>
						info@ATTIRE.com
					</Link>
					. We look forward to helping you find your next favorite outfit!
				</p>
			</article>
			<article className="w-full md:w-1/2 flex justify-center">
				<div className="">
					<Image
						src="/assets/products/coats/Detachable Storm Trench/217437-1200-auto.webp"
						alt="Stylish Dress"
						className="rounded-md shadow-md"
						width={300}
						height={300}
					/>
				</div>
			</article>
		</section>
	)
}
