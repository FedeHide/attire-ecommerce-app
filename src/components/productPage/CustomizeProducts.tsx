'use client'

import type { products } from '@wix/stores'
import { useEffect, useState } from 'react'
import AddItem from './AddItem'

type Choices = Record<string, string>

export default function CustomizeProducts({
	productId,
	variants,
	productOptions,
}: {
	productId: string | undefined
	variants: products.Variant[] | undefined
	productOptions: products.ProductOption[] | undefined
}): JSX.Element {
	const [selectedOptions, setSelectedOptions] = useState<Choices>({})
	const [selectedVariant, setSelectedVariant] = useState<products.Variant>()

	useEffect(() => {
		const variant = variants?.find((variant) => {
			const variantChoices = variant.choices

			if (variantChoices == null) return false
			return Object.entries(selectedOptions).every(
				([key, value]) => variantChoices[key] === value,
			)
		})
		setSelectedVariant(variant)
	}, [selectedOptions, variants])

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

	const isVariantInStock = (choices: Choices): boolean => {
		return (
			variants?.some((variant) => {
				const variantChoices = variant.choices

				if (variantChoices == null) return false

				return (
					Object.entries(choices).every(([key, value]) => {
						return variantChoices[key] === value
					}) &&
					variant.stock?.inStock === true &&
					typeof variant.stock.quantity === 'number' &&
					variant.stock.quantity > 0
				)
			}) ?? false
		)
	}

	return (
		<section className="flex flex-col gap-6">
			{productOptions?.map((option) => {
				if (option.name == null) return null
				return (
					<article key={option.name} className="flex flex-col gap-4">
						<h4 className="font-bold">Choose a {option.name}</h4>
						<ul className="flex items-center gap-3">
							{option.choices?.map((choice) => {
								if (choice.description == null) return null
								const currentOptionName = option.name ?? ''
								const currentChoiceDescription = choice.description ?? ''
								const disabled = !isVariantInStock({
									...selectedOptions,
									[currentOptionName]: currentChoiceDescription,
								})
								const selected =
									selectedOptions[currentOptionName] === currentChoiceDescription

								const clickHandler = disabled
									? undefined
									: () => {
											handleOptionSelect(
												currentOptionName,
												currentChoiceDescription,
											)
										}

								return option.name === 'Color' ? (
									<li
										key={choice.value}
										className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative select-none"
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
										className="ring-1 ring-clrPrimary text-clrPrimary rounded-md py-1 px-4 text-sm select-none"
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
					</article>
				)
			})}
			<AddItem
				productId={productId}
				variantId={selectedVariant?._id ?? '00000000-0000-0000-0000-000000000000'}
				stockNumber={selectedVariant?.stock?.quantity ?? 0}
			/>
		</section>
	)
}
