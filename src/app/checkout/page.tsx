'use client'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/hooks/useCartStore'
import Link from 'next/link'
import Image from 'next/image'
import { LockIcon } from '../../../public/assets/icons/LockIcon'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { useWixClient } from '@/context/wixContext'
import { useRouter } from 'next/navigation'

export default function CheckoutPage(): JSX.Element {
	const { cart, getCart } = useCartStore()
	const [shippingCost, setShippingCost] = useState('--')
	const [total, setTotal] = useState(0)
	const wixClient = useWixClient()
	const router = useRouter()

	useEffect(() => {
		void getCart(wixClient)
	}, [wixClient, getCart])

	useEffect(() => {
		if (cart?.lineItems == null || cart?.lineItems.length <= 0) {
			router.push('/')
		}
	}, [cart, router])

	const updateShippingCost = (cost: string): void => {
		setShippingCost(cost)
	}

	useEffect(() => {
		// Calcular total basado en cart.subtotal?.amount y shippingCost
		const calculateTotal = (): number => {
			const subtotal = parseFloat(cart.subtotal?.amount ?? '0')
			const formattedShippingCost = formatShippingCost(shippingCost)
			return subtotal + formattedShippingCost
		}

		// Actualizar el total cuando cambie cart.subtotal?.amount o shippingCost
		const newTotal = calculateTotal()
		setTotal(newTotal)
	}, [cart.subtotal?.amount, shippingCost])

	const formatShippingCost = (shippingCost: string): number => {
		return shippingCost === '--' ? 0 : parseFloat(shippingCost.replace('$', ''))
	}

	const getImageUrl = (wixImageUrl: string): string => {
		const imageMatch = wixImageUrl.match(/wix:image:\/\/v1\/([^/]+)/)
		const imageId = imageMatch != null ? imageMatch[1] : null
		return imageId != null
			? `https://static.wixstatic.com/media/${imageId}/v1/fit/w_1000,h_1498,q_90/file.webp`
			: ''
	}

	return (
		<section>
			{cart?.lineItems == null || cart?.lineItems.length <= 0 ? (
				<div className="flex flex-col gap-6 items-center justify-center">
					<h1 className="text-6xl text-red-700">Error</h1>
					<h2 className="text-xl font-medium">
						You are being redirected to the main page...
					</h2>
				</div>
			) : (
				<section className="flex flex-col gap-4 py-18 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
					<div className="flex justify-between">
						<div>
							<span className="text-xl font-bold tracking-wide">ATTIRE </span>
							<span className="text-lg tracking-wide">CHECKOUT</span>
						</div>
						<Link className="underline hover:text-blue-300" href="/">
							Continue Browsing
						</Link>
					</div>
					<div className="h-[2px] w-full bg-gray-200 my-4"></div>
					<section className="flex flex-col sm:flex-row gap-16">
						<article className="flex flex-col gap-3 md:w-1/2">
							<div className="flex flex-col items-center gap-4 bg-gray-100 p-4 rounded-lg">
								<div className="flex justify-between w-full">
									<h3>Order summary ({cart.lineItems?.length})</h3>
									<Link className="underline hover:text-blue-400" href="/">
										Edit Cart
									</Link>
								</div>
								<div className="h-[2px] w-11/12 bg-gray-200"></div>
								{cart.lineItems?.map((item, index) => (
									<div key={index} className="flex gap-2 w-full">
										<div>
											<Image
												className="rounded-sm"
												src={getImageUrl(item.image ?? '')}
												alt="Product Image"
												width={50}
												height={50}
											/>
										</div>
										<div className="flex gap-2 w-full justify-between">
											<div className="flex flex-col">
												<div>{item.productName?.translated}</div>
												<div>Qty: {item.quantity}</div>
											</div>

											{item.fullPrice?.formattedAmount !==
											item.price?.formattedAmount ? (
												<div className="flex flex-col items-end">
													<div className="line-through text-gray-500">
														{item.fullPrice?.formattedAmount}
													</div>
													<div>{item.price?.formattedAmount}</div>
												</div>
											) : (
												<div>{item.price?.formattedAmount}</div>
											)}
										</div>
									</div>
								))}
								<div className="h-[2px] w-11/12 bg-gray-200"></div>
								<div className="flex justify-between w-full">
									<p>Subtotal</p>
									<p>{cart.subtotal?.formattedAmount}</p>
								</div>
								<div className="flex justify-between w-full">
									<p>Shipping</p>
									<p>{shippingCost}</p>
								</div>
								<div className="h-[2px] w-11/12 bg-gray-200"></div>
								<div className="flex justify-between w-full font-bold">
									<h3>Total</h3>
									<p>${total}</p>
								</div>
							</div>
							<div className="flex items-center justify-center gap-2">
								<LockIcon />
								<p className="mt-1">Secure Checkout</p>
							</div>
						</article>
						<article className="sm:w-1/2">
							<CheckoutForm updateShippingCost={updateShippingCost} />
						</article>
					</section>
				</section>
			)}
		</section>
	)
}
