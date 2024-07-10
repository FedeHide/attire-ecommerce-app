'use client'
import { useCartStore } from '@/hooks/useCartStore'
import { useWixClient } from '@/context/wixContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddItem({
	productId,
	variantId,
	stockNumber,
}: {
	productId: string | undefined
	variantId: string
	stockNumber: number
}): JSX.Element {
	const [quantity, setQuantity] = useState(1)
	const wixClient = useWixClient()
	const { addItem, isLoading } = useCartStore()
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
	const router = useRouter()

	useEffect(() => {
		const checkLoginStatus = async () => {
			const loggedIn = await wixClient.auth.loggedIn()
			setIsLoggedIn(loggedIn)
		}
		checkLoginStatus()
	}, [wixClient])

	useEffect(() => {
		setQuantity(1)
	}, [variantId])

	const handleQuantity = (type: 'd' | 'i'): void => {
		if (type === 'd' && quantity > 1) {
			setQuantity((prev) => prev - 1)
		}

		if (type === 'i' && quantity < stockNumber) {
			setQuantity((prev) => prev + 1)
		}
	}

	return (
		<section className="flex flex-col gap-4">
			<h4 className="font-medium">Choose a Quantity</h4>
			<div className="flex justify-between">
				<div className="flex items-center gap-4">
					<div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
						<button
							onClick={() => {
								handleQuantity('d')
							}}
							className="cursor-pointer text-xl"
						>
							-
						</button>
						{quantity}
						<button
							onClick={() => {
								handleQuantity('i')
							}}
							className="cursor-pointer text-xl"
						>
							+
						</button>
					</div>
					<div className="text-xs">
						Only <span className="text-orange-500">{stockNumber} items</span> left!
					</div>
				</div>
				<button
					onClick={() => {
						if (isLoggedIn === true) {
							if (productId != null) {
								addItem(wixClient, productId, variantId, quantity)
							}
						} else {
							router.push('/login')
						}
					}}
					disabled={isLoading}
					className="w-36 text-sm rounded-3xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
				>
					Add to Cart
				</button>
			</div>
		</section>
	)
}
