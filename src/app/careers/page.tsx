'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function Careers(): JSX.Element {
	const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false)
	const [formData, setFormData] = useState({ name: '', email: '', position: '', resume: '' })
	const [errors, setErrors] = useState({ name: '', email: '', position: '', resume: '' })
	const router = useRouter()

	const validateData = (): boolean => {
		let nameError = ''
		let emailError = ''
		let positionError = ''
		let resumeError = ''

		if (formData.name === '') {
			nameError = 'Name is required'
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (formData.email === '') {
			emailError = 'Email is required'
		} else if (!emailRegex.test(formData.email)) {
			emailError = 'Invalid email address'
		}

		if (formData.position === '') {
			positionError = 'Position is required'
		}

		if (formData.resume === '') {
			resumeError = 'Resume is required'
		}

		if (nameError !== '' || emailError !== '' || positionError !== '' || resumeError !== '') {
			setErrors({
				name: nameError,
				email: emailError,
				position: positionError,
				resume: resumeError,
			})
			return false
		}

		setErrors({ name: '', email: '', position: '', resume: '' })
		return true
	}

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault()
		if (validateData()) {
			setIsApplicationSubmitted(true)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	useEffect(() => {
		if (!isApplicationSubmitted) return
		const timer = setTimeout(() => {
			router.push('/')
		}, 5000)

		return () => {
			clearTimeout(timer)
		}
	}, [router, isApplicationSubmitted])

	return (
		<div className="flex flex-col items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-[calc(100vh-80px)] justify-center">
			{!isApplicationSubmitted ? (
				<div className="w-full md:w-2/3 lg:w-1/2 text-center">
					<h1 className="text-2xl mb-8">Join Our Team</h1>
					<p className="text-gray-700 mb-4">
						We&apos;re looking for passionate individuals to join our team. Explore our
						current openings and apply today!
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

						<label className="text-sm text-gray-700">Position</label>
						<select
							name="position"
							value={formData.position}
							onChange={handleChange}
							className={`ring-1 rounded-md p-2 ${errors.position !== '' ? 'ring-red-500' : 'ring-gray-300'}`}
						>
							<option value="">Select a position</option>
							<option value="Sales Associate">Sales Associate</option>
							<option value="Marketing Specialist">Marketing Specialist</option>
							<option value="Customer Service Representative">
								Customer Service Representative
							</option>
							<option value="Visual Merchandiser">Visual Merchandiser</option>
						</select>
						{errors.position !== '' && (
							<p className="text-red-500 text-sm">{errors.position}</p>
						)}

						<label className="text-sm text-gray-700">Resume</label>
						<input
							type="text"
							name="resume"
							placeholder="Link to your resume or portfolio"
							value={formData.resume}
							onChange={handleChange}
							className={`ring-1 rounded-md p-2 ${errors.resume !== '' ? 'ring-red-500' : 'ring-gray-300'}`}
						/>
						{errors.resume !== '' && (
							<p className="text-red-500 text-sm">{errors.resume}</p>
						)}

						<button
							type="submit"
							className="bg-blue-500 text-white rounded-md p-2 mt-4"
						>
							Submit Application
						</button>
					</form>
				</div>
			) : (
				<div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)]">
					<Confetti width={2000} height={1000} />
					<h1 className="text-6xl text-green-700">Application Submitted</h1>
					<h2 className="text-xl font-medium">Thank you for applying!</h2>
					<h3 className="">
						We will review your application and get back to you shortly.
					</h3>
				</div>
			)}
		</div>
	)
}
