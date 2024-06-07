'use client'
import { useState } from 'react'

export default function AddItem(): JSX.Element {
	const [quantity, setQuantity] = useState(1)

	const stock = 4

	const handleQuantity = (type: 'd' | 'i'): void => {
		if (type === 'd' && quantity > 1) {
			setQuantity((prev) => prev - 1)
		}

		if (type === 'i' && quantity < stock) {
			setQuantity((prev) => prev + 1)
		}
	}

	return (
		<div className="flex flex-col gap-4">
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
						Only <span className="text-orange-500">4 items</span> left!
					</div>
				</div>
				<button className="w-36 text-sm rounded-3xl ring-1 ring-clrPrimary text-clrPrimary py-2 px-4 hover:bg-clrPrimary md:active:bg-clrPrimary hover:text-white md:active:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none">
					Add to Cart
				</button>
			</div>
		</div>
	)
}
