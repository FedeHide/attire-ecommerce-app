'use client'

import Image from 'next/image'
import { useCartStore } from '@/hooks/useCartStore'
import { media as wixMedia } from '@wix/sdk'
import { useWixClient } from '@/context/wixContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CartModal(): JSX.Element {
	const wixClient = useWixClient()
	const { cart, getCart, isLoading, removeItem } = useCartStore()
	const isLoggedIn = wixClient.auth.loggedIn()
	const router = useRouter()

	useEffect(() => {
		void getCart(wixClient)
	}, [wixClient, getCart])

	const handleCheckout = (): void => {
		router.push('/checkout')
	}

	return (
		<section className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
			{cart?.lineItems == null ? (
				<p>Cart is Empty</p>
			) : (
				<>
					<h2 className="text-xl">Shopping Cart</h2>
					{/* LIST */}
					<section className="flex flex-col gap-8">
						{/* ITEM */}
						{cart.lineItems.map((item) => (
							<article key={item._id} className="flex gap-4">
								{item.image != null && (
									<Image
										src={wixMedia.getScaledToFillImageUrl(
											item.image,
											72,
											96,
											{},
										)}
										alt=""
										width={72}
										height={96}
										className="object-cover rounded-md"
									/>
								)}
								<section className="flex flex-col justify-between w-full">
									{/* TOP */}
									<article>
										{/* TITLE */}
										<div className="flex items-center justify-between gap-8">
											<h3 className="font-semibold">
												{item.productName?.original}
											</h3>
											<div className="p-1 bg-gray-50 rounded-sm">
												${Number(item.price?.amount) * (item.quantity ?? 0)}
											</div>
										</div>
										{/* DESC */}
										<div className="text-sm text-gray-500">
											<p>{item.availability?.status}</p>
										</div>
									</article>
									{/* BOTTOM */}
									<article className="flex justify-between text-sm">
										<span className="text-gray-500">
											Qty. {item.quantity ?? 0}
										</span>
										<span
											className="text-blue-500"
											style={{
												cursor: isLoading ? 'not-allowed' : 'pointer',
											}}
											onClick={() => {
												if (wixClient != null && item._id != null) {
													void removeItem(wixClient, item._id)
												}
											}}
										>
											Remove
										</span>
									</article>
								</section>
							</article>
						))}
					</section>
					{/* LIST BOTTOM */}
					<div>
						<div className="flex items-center justify-between font-semibold">
							<span>Subtotal</span>
							{/* @ts-expect-error : subtotal no added to Cart type */}
							<span>${cart.subtotal.amount}</span>
						</div>
						<p className="text-gray-500 text-sm mt-2 mb-4">
							Shipping and taxes calculated at checkout.
						</p>
						<div className="flex justify-between text-sm">
							<button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
								View Cart
							</button>
							<button
								className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
								disabled={isLoading}
								onClick={handleCheckout}
							>
								Checkout
							</button>
						</div>
					</div>
				</>
			)}
		</section>
	)
}
