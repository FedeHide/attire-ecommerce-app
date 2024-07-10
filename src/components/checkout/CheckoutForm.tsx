'use client'
import { useState } from 'react'

const countries = [
	'United States',
	'Canada',
	'Mexico',
	'Brazil',
	'United Kingdom',
	'Germany',
	'France',
	'Italy',
	'Spain',
	'Australia',
	'India',
	'China',
	'Japan',
]

interface CheckoutFormProps {
	updateShippingCost: (cost: string) => void // Prop para actualizar shippingCost en CheckoutPage
}

export default function CheckoutForm({ updateShippingCost }: CheckoutFormProps): JSX.Element {
	const [dataName, setDataName] = useState('')
	const [dataEmail, setDataEmail] = useState('')
	const [dataAddress, setDataAddress] = useState('')
	const [dataPhone, setDataPhone] = useState('')
	const [dataShipping, setDataShipping] = useState('')
	const [dataShippingCost, setDataShippingCost] = useState('')

	const [shippingSelected, setShippingSelected] = useState('free')
	const [selectedCountry, setSelectedCountry] = useState('')
	const [isPlaceOrder, setIsPlaceOrder] = useState(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()

		let shippingCost = ''
		if (shippingSelected === 'free') {
			shippingCost = 'Free'
		} else if (shippingSelected === 'standard') {
			shippingCost = '$10'
		} else if (shippingSelected === 'express') {
			shippingCost = '$25'
		}

		const formData = {
			firstName: event.currentTarget.firstName.value,
			lastName: event.currentTarget.lastName.value,
			email: event.currentTarget.email.value,
			phone: event.currentTarget.phone.value,
			country: selectedCountry,
			address: event.currentTarget.address.value,
			city: event.currentTarget.city.value,
			postalCode: event.currentTarget.postal.value,
			shippingMethod: shippingSelected,
			shippingCost,
		}

		console.log('Form Data:', formData)
		setDataName(formData.firstName + ' ' + formData.lastName)
		setDataEmail(formData.email)
		setDataAddress(
			`${formData.address}, ${formData.city}, ${formData.country}, ${formData.postalCode}`,
		)
		setDataPhone(formData.phone)
		setDataShipping(formData.shippingMethod)
		setDataShippingCost(formData.shippingCost)
		setIsPlaceOrder(true)
	}

	const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSelectedCountry(event.target.value)
	}

	const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setShippingSelected(event.target.value)
		updateShippingCost(
			event.target.value === 'free'
				? '--'
				: event.target.value === 'standard'
					? '$10'
					: '$25',
		)
	}

	return (
		<div className="flex justify-between">
			{!isPlaceOrder ? (
				<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full" action="">
					<h2 className="text-xl font-bold">Delivery details</h2>
					<div className="flex flex-col gap-2">
						<label htmlFor="firstName">First name *</label>
						<input
							id="firstName"
							type="text"
							name="firstName"
							className="ring-2 ring-gray-300 rounded-md p-2 w-full"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="lastName">Last name *</label>
						<input
							id="lastName"
							type="text"
							name="lastName"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="email">Email *</label>
						<input
							id="email"
							type="email"
							name="email"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="phone">Phone *</label>
						<input
							id="phone"
							type="tel"
							name="phone"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="country">Country/Region *</label>
						<select
							value={selectedCountry}
							onChange={handleCountryChange}
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						>
							<option value="">Select Country</option>
							{countries.map((country, index) => (
								<option key={index} value={country}>
									{country}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="address">Address *</label>
						<input
							id="address"
							type="text"
							name="address"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="city">City *</label>
						<input
							id="city"
							type="text"
							name="city"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="postal">Zip / Postal code *</label>
						<input
							id="postal"
							type="text"
							name="postal"
							className="ring-2 ring-gray-300 rounded-md p-2"
							required
						/>
					</div>
					<div className="h-[2px] w-full bg-gray-200 my-4"></div>
					<h2 className="text-xl font-bold">Delivery method</h2>
					<section className="flex flex-col gap-4">
						<div
							className={`flex justify-between gap-2 ring-2 ring-gray-300 rounded-md p-2 ${
								shippingSelected === 'free' ? 'bg-blue-50' : 'bg-white'
							}`}
						>
							<label htmlFor="free" className="flex flex-1 gap-2 cursor-pointer">
								<div className="flex gap-2 flex-1">
									<input
										value="free"
										id="free"
										type="radio"
										name="shipping"
										checked={shippingSelected === 'free'}
										onChange={handleShippingChange}
									/>
									<span>Free Shipping</span>
									<span className="italic text-gray-500">(10-15 days)</span>
								</div>
								<p>Free</p>
							</label>
						</div>
						<div
							className={`flex justify-between gap-2 ring-2 ring-gray-300 rounded-md p-2 ${
								shippingSelected === 'standard' ? 'bg-blue-50' : 'bg-white'
							}`}
						>
							<label htmlFor="standard" className="flex flex-1 gap-2 cursor-pointer">
								<div className="flex gap-2 flex-1">
									<input
										value="standard"
										id="standard"
										type="radio"
										name="shipping"
										checked={shippingSelected === 'standard'}
										onChange={handleShippingChange}
									/>
									<span>Standard Shipping</span>
									<span className="italic text-gray-500">(4-7 days)</span>
								</div>
								<p>$10</p>
							</label>
						</div>
						<div
							className={`flex justify-between gap-2 ring-2 ring-gray-300 rounded-md p-2 ${
								shippingSelected === 'express' ? 'bg-blue-50' : 'bg-white'
							}`}
						>
							<label htmlFor="express" className="flex flex-1 gap-2 cursor-pointer">
								<div className="flex gap-2 flex-1">
									<input
										value="express"
										id="express"
										type="radio"
										name="shipping"
										checked={shippingSelected === 'express'}
										onChange={handleShippingChange}
									/>
									<span>Express Shipping</span>
									<span className="italic text-gray-500">(1-3 days)</span>
								</div>
								<p>$25</p>
							</label>
						</div>
					</section>
					<button
						type="submit"
						className="w-full bg-black hover:bg-slate-700 text-white p-2 rounded-sm mt-6"
					>
						Continue
					</button>
				</form>
			) : (
				// <section className="flex flex-col gap-6">
				<section className="flex flex-col gap-6 justify-between w-full">
					<div className="flex justify-between">
						<h2 className="text-xl font-bold">Delivery details</h2>
						<button
							onClick={() => {
								setIsPlaceOrder(false)
							}}
							className="underline hover:text-blue-400"
						>
							Change
						</button>
					</div>
					<div>
						<p className="text-slate-500">{dataName}</p>
						<p className="text-slate-500">{dataEmail}</p>
						<p className="text-slate-500">{dataAddress}</p>
						<p className="text-slate-500">{dataPhone}</p>
					</div>
					<div className="h-[2px] w-full bg-gray-200"></div>
					<h2 className="text-xl font-bold">Delivery details</h2>
					<div className="flex justify-between">
						<p className="text-slate-500">{dataShipping}</p>
						<p className="text-slate-500">{dataShippingCost}</p>
					</div>
				</section>
			)}
		</div>
	)
}
