'use client'

import type { products } from '@wix/stores'
import { useState } from 'react'

export default function CustomizeProducts({
	productId,
	variants,
	productOptions,
}: {
	productId: string | undefined
	variants: products.Variant[] | undefined
	productOptions: products.ProductOption[] | undefined
}): JSX.Element {
	const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

	const handleOptionSelect = (optionType: string, choice: string): void => {
		setSelectedOptions((prev) => {
			if (prev[optionType] === choice) {
				const { [optionType]: _, ...newState } = prev
				return newState
			} else {
				return { ...prev, [optionType]: choice }
			}
		})
	}

	const isVariantInStock = (choices: { [key: string]: string }) => {
		return variants.some((variant) => {
			const variantChoices = variant.choices

			if (!variantChoices) return false

			return (
				Object.entries(choices).every(([key, value]) => variantChoices[key] === value) &&
				variant.stock?.inStock &&
				variant.stock?.quantity &&
				variant.stock?.quantity > 0
			)
		})
	}

	return (
		<div className="flex flex-col gap-6">
			{productOptions?.map((option) => (
				<div key={option.name} className="flex flex-col gap-4">
					<h4 className="font-bold">Choose a {option.name}</h4>
					<ul className="flex items-center gap-3">
						{option.choices?.map((choice) => {
							const disabled = !isVariantInStock({
								...selectedOptions,
								[option.name!]: choice.description!,
							})
							const selected = selectedOptions[option.name!] === choice.description

							const clickHandler = disabled
								? undefined
								: () => handleOptionSelect(option.name!, choice.description!)

							return option.name === 'Color' ? (
								<li
									key={choice.value}
									className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
									style={{
										backgroundColor: choice.value,
										cursor: disabled ? 'not-allowed' : 'pointer',
									}}
									onClick={clickHandler}
								>
									{selected && (
										<div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
									)}
									{disabled && (
										<div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
									)}
								</li>
							) : (
								<li
									key={choice.value}
									className="ring-1 ring-clrPrimary text-clrPrimary rounded-md py-1 px-4 text-sm"
									style={{
										cursor: disabled ? 'not-allowed' : 'pointer',
										backgroundColor: selected
											? '#f35c7a'
											: disabled
												? '#FBCFE8'
												: '#fff',
										color: selected || disabled ? '#fff' : '#f35c7a',
										boxShadow: disabled ? 'none' : '',
									}}
									onClick={clickHandler}
								>
									{choice.description}
								</li>
							)
						})}
					</ul>
				</div>
			))}
			{/* 
					<ul className="flex items-center gap-3">
						<li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
							<div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
						</li>
						<li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-purple-800"></li>
						<li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-white">
							<div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
						</li>
					</ul> */}
			{/* <h4 className="font-medium">Choose a size</h4>
			<ul className="flex items-center gap-3">
				<li className="ring-1 ring-clrPrimary text-clrPrimary rounded-md py-1 px-4 text-sm cursor-pointer">
					Small
				</li>
				<li className="ring-1 ring-clrPrimary text-white bg-clrPrimary rounded-md py-1 px-4 text-sm cursor-pointer">
					Medium
				</li>
				<li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
					Large
				</li>
			</ul> */}
		</div>
	)
}

// (
// 	<div
// 		key={choice.value}
// 		onClick={() =>
// 			handleOptionSelect(option.name!, choice.description!)
// 		}
// 	>
// 		{choice.description}
// 		{disabled && ' disabled'}
// 		{selected && ' selected'}
// 	</div>
// )
