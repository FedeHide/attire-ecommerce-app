'use client'
import { useWixClient } from '@/hooks/useWixClient'
import { useEffect, useState } from 'react'

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

	const addItem = async (): Promise<void> => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		const response = await wixClient.currentCart.addToCurrentCart({
			lineItems: [
				{
					catalogReference: {
						appId: process.env.NEXT_PUBLIC_WIX_APP_ID ?? '',
						catalogItemId: productId,
						...(variantId !== '' && { options: { variantId } }),
					},
					quantity,
				},
			],
		})
		console.log(response)
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
						void addItem()
					}}
					className="w-36 text-sm rounded-3xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
				>
					Add to Cart
				</button>
			</div>
		</section>
	)
}
