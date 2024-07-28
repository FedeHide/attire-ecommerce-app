'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function Contact(): JSX.Element {
	const [isMessageSent, setIsMessageSent] = useState(false)
	const [formData, setFormData] = useState({ name: '', email: '', message: '' })
	const [errors, setErrors] = useState({ name: '', email: '', message: '' })
	const router = useRouter()

	const validateData = (): boolean => {
		let nameError = ''
		let emailError = ''
		let messageError = ''

		if (formData.name === '') {
			nameError = 'Name is required'
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (formData.email === '') {
			emailError = 'Email is required'
		} else if (!emailRegex.test(formData.email)) {
			emailError = 'Invalid email address'
		}

		if (formData.message === '') {
			messageError = 'Message is required'
		}

		if (nameError !== '' || emailError !== '' || messageError !== '') {
			setErrors({ name: nameError, email: emailError, message: messageError })
			return false
		}

		setErrors({ name: '', email: '', message: '' })
		return true
	}

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		if (validateData()) {
			setIsMessageSent(true)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		if (!isMessageSent) return
		const timer = setTimeout(() => {
			router.push('/')
		}, 5000)

		return () => {
			clearTimeout(timer)
		}
	}, [router, isMessageSent])

	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-80px)] justify-center">
			{!isMessageSent ? (
				<div className="w-full md:w-2/3 lg:w-1/2 text-center">
					<h1 className="text-2xl mb-8">Contact Us</h1>
					<p className="text-gray-700 mb-4">
						We would love to hear from you! Whether you have a question about our
						products, need assistance with your order, or just want to share your
						experience, feel free to reach out to us.
					</p>
					<p className="text-gray-700 mb-4">You can visit us at our store located at:</p>
					<p className="text-gray-700 font-semibold mb-4">
						1234 Maple Street, Oakwood Center, Pineville, TX 75001, United States
					</p>
					<p className="text-gray-700 mb-4">
						Or email us at:{' '}
						<Link
							href="mailto:info@ATTIRE.com"
							target="_blank"
							className="text-blue-500 underline"
						>
							info@ATTIRE.com
						</Link>
					</p>
					<form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
						<label className="text-sm text-gray-700">Name</label>
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							className={`ring-1 rounded-md p-2 ${errors.name !== '' ? 'ring-red-500' : 'ring-gray-300'}`}
						/>
						{errors.name !== '' && (
							<p className="text-red-500 text-sm">{errors.name}</p>
						)}

						<label className="text-sm text-gray-700">Email</label>
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							className={`ring-1 rounded-md p-2 ${errors.email !== '' ? 'ring-red-500' : 'ring-gray-300'}`}
						/>
						{errors.email !== '' && (
							<p className="text-red-500 text-sm">{errors.email}</p>
						)}

						<label className="text-sm text-gray-700">Message</label>
						<textarea
							name="message"
							placeholder="Your Message"
							value={formData.message}
							onChange={handleChange}
							className={`ring-1 rounded-md p-2 h-32 ${errors.message !== '' ? 'ring-red-500' : 'ring-gray-300'}`}
						></textarea>
						{errors.message !== '' && (
							<p className="text-red-500 text-sm">{errors.message}</p>
						)}

						<button
							type="submit"
							className="bg-blue-500 text-white rounded-md p-2 mt-4"
						>
							Send Message
						</button>
					</form>
				</div>
			) : (
				<div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
					<Confetti width={2000} height={1000} />
					<h1 className="text-6xl text-green-700">Message Sent</h1>
					<h2 className="text-xl font-medium">Thank you for reaching out to us!</h2>
					<h3 className="">We will get back to you shortly.</h3>
				</div>
			)}
		</div>
	)
}
