'use client'
import { useEffect, useState } from 'react'
import { useWixClient } from '@/context/wixContext'
import { useCartStore } from '@/hooks/useCartStore'
import Link from 'next/link'
import Image from 'next/image'

export default function CheckoutPage(): JSX.Element {
	const wixClient = useWixClient()
	const { cart, getCart, isLoading, removeItem } = useCartStore()
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
	const [itemIndex, setItemIndex] = useState(0)

	const getImageUrl = (wixImageUrl: string) => {
		const imageMatch = wixImageUrl.match(/wix:image:\/\/v1\/([^/]+)/)
		const imageId = imageMatch ? imageMatch[1] : null
		return imageId
			? `https://static.wixstatic.com/media/${imageId}/v1/fit/w_1000,h_1498,q_90/file.webp`
			: ''
	}

	useEffect(() => {
		const checkLoginStatus = async () => {
			const loggedIn = await wixClient.auth.loggedIn()
			setIsLoggedIn(loggedIn)
		}
		checkLoginStatus()
	}, [wixClient])

	useEffect(() => {
		getCart()
	}, [getCart])

	console.log(cart)

	return (
		<section className="py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex gap-16">
			<article className="w-1/2">
				{isLoggedIn === null ? (
					<div>Loading...</div>
				) : !isLoggedIn ? (
					<div>
						<p>Have an account? Log in</p>
					</div>
				) : (
					<div className="flex justify-between">
						<p>Logged in as asd@asd.com</p>
						<p>Log out</p>
					</div>
				)}
			</article>
			<article className="flex flex-col items-center w-1/2 bg-gray-100">
				<div className="flex justify-between w-full">
					<h3>Order summary ({cart.lineItems?.length})</h3>
					<Link className="underline hover:text-blue-400" href="/">
						Edit Cart
					</Link>
				</div>
				<div className="h-[2px] w-11/12 bg-gray-200"></div>
				{cart.lineItems?.map((item, index) => (
					<div key={index} className="flex justify-between w-full">
						<div>
							<Image src={getImageUrl(item.image)} alt="alt" width={50} height={50} />
						</div>
						<div></div>
						<div></div>
					</div>
				))}
			</article>
		</section>
	)
}
