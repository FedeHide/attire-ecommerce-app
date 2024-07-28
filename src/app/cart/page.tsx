'use client'

import Image from 'next/image'
import { useCartStore } from '@/hooks/useCartStore'
import { media as wixMedia } from '@wix/sdk'
import { useWixClient } from '@/context/wixContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CartPage(): JSX.Element {
	const wixClient = useWixClient()
	const { cart, getCart, isLoading, removeItem } = useCartStore()
	const router = useRouter()

	useEffect(() => {
		void getCart(wixClient)
	}, [wixClient, getCart])

	const handleCheckout = (): void => {
		router.push('/checkout')
	}

	return (
		<main className="min-h-screen p-10 bg-gray-100">
			<section className="max-w-2xl mx-auto p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
				{cart?.lineItems == null ? (
					<p className="text-center text-lg">Cart is Empty</p>
				) : (
					<>
						<h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
						{/* LIST */}
						<section className="flex flex-col gap-8">
							{/* ITEM */}
							{cart.lineItems.map((item) => (
								<article key={item._id} className="flex gap-4">
									{item.image != null && (
										<Image
											src={wixMedia.getScaledToFillImageUrl(
												item.image,
												120,
												160,
												{},
											)}
											alt={item.productName?.original ?? 'Product Image'}
											width={120}
											height={160}
											className="object-cover rounded-md"
										/>
									)}
									<section className="flex flex-col justify-between w-full">
										{/* TOP */}
										<article>
											{/* TITLE */}
											<div className="flex items-center justify-between gap-8 mb-2">
												<h2 className="font-semibold text-xl">
													{item.productName?.original}
												</h2>
												<div className="p-1 bg-gray-50 rounded-sm text-lg">
													$
													{Number(item.price?.amount) *
														(item.quantity ?? 0)}
												</div>
											</div>
											{/* DESC */}
											<div className="text-sm text-gray-500 mb-2">
												<p>{item.availability?.status}</p>
											</div>
										</article>
										{/* BOTTOM */}
										<article className="flex justify-between text-sm">
											<span className="text-gray-500">
												Qty. {item.quantity ?? 0}
											</span>
											<button
												className="text-blue-500"
												style={{
													cursor: isLoading ? 'not-allowed' : 'pointer',
												}}
												onClick={() => {
													if (wixClient != null && item._id != null) {
														void removeItem(wixClient, item._id)
													}
												}}
												disabled={isLoading}
											>
												Remove
											</button>
										</article>
									</section>
								</article>
							))}
						</section>
						{/* LIST BOTTOM */}
						<div className="mt-8">
							<div className="flex items-center justify-between font-semibold text-lg mb-4">
								<span>Subtotal</span>
								{/* @ts-expect-error : subtotal no added to Cart type */}
								<span>${cart.subtotal.amount}</span>
							</div>
							<p className="text-gray-500 text-sm mb-4">
								Shipping and taxes calculated at checkout.
							</p>
							<div className="flex justify-between text-sm">
								<button
									className="rounded-md py-3 px-4 ring-1 ring-gray-300 bg-white hover:bg-gray-50 transition"
									onClick={() => {
										router.push('/')
									}}
								>
									Home
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
		</main>
	)
}
