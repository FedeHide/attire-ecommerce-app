'use client'
import { useWixClient } from '@/hooks/useWixClient'
import { LoginState } from '@wix/sdk'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

enum MODE {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	RESET_PASSWORD = 'RESET_PASSWORD',
	EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export default function LoginPage(): JSX.Element {
	const [mode, setMode] = useState(MODE.LOGIN)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailCode, setEmailCode] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	const pathname = usePathname()
	const router = useRouter()

	const formTitle =
		mode === MODE.LOGIN
			? 'Log in'
			: mode === MODE.REGISTER
				? 'Register'
				: mode === MODE.RESET_PASSWORD
					? 'Reset Your Password'
					: 'Email Verification'

	const buttonTitle =
		mode === MODE.LOGIN
			? 'Login'
			: mode === MODE.REGISTER
				? 'Register'
				: mode === MODE.RESET_PASSWORD
					? 'Reset'
					: 'Verify'

	const wixClient = useWixClient()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setIsLoading(true)
		setError('')

		try {
			let response

			switch (mode) {
				case MODE.LOGIN:
					response = await wixClient.auth.login({
						email,
						password,
					})
					break
				case MODE.REGISTER:
					response = await wixClient.auth.register({
						email,
						password,
						profile: { nickname: username },
					})
					break
				case MODE.RESET_PASSWORD:
					response = await wixClient.auth.sendPasswordResetEmail(
						email,
						window.location.href,
					)
					setMessage('Password reset email sent. Please check your e-mail.')
					break
				case MODE.EMAIL_VERIFICATION:
					response = await wixClient.auth.processVerification({
						verificationCode: emailCode,
					})
					break
				default:
					break
			}
			console.log(response)

			switch (response?.loginState) {
				case LoginState.SUCCESS:
					setMessage('Logged in successfully')
					const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
						response.data.sessionToken!,
					)
					console.log(tokens)
					Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), { expires: 2 })
					wixClient.auth.setTokens(tokens)
					router.push('/')
					break
			}
		} catch (err) {
			console.error(err)
			setError('Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="flex items-center justify-center h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
			<form
				className="flex flex-col gap-8"
				onSubmit={(e) => {
					void handleSubmit(e)
				}}
				action=""
			>
				<h1 className="text-2xl font-semibold">{formTitle}</h1>
				{mode === MODE.REGISTER ? (
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">Username</label>
						<input
							className="ring-2 ring-gray-300 rounded-md p-4"
							name="username"
							type="text"
							placeholder="John"
							onChange={(e) => {
								setUsername(e.target.value)
							}}
						/>
					</div>
				) : null}
				{mode !== MODE.EMAIL_VERIFICATION ? (
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">Email</label>
						<input
							className="ring-2 ring-gray-300 rounded-md p-4"
							name="email"
							type="email"
							placeholder="John@gmail.com"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
					</div>
				) : (
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">Verification Code</label>
						<input
							className="ring-2 ring-gray-300 rounded-md p-4"
							name="emailCode"
							type="text"
							placeholder="code"
							onChange={(e) => {
								setEmailCode(e.target.value)
							}}
						/>
					</div>
				)}
				{mode === MODE.LOGIN || mode === MODE.REGISTER ? (
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">password</label>
						<input
							className="ring-2 ring-gray-300 rounded-md p-4"
							name="password"
							type="password"
							placeholder="Enter your password"
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
					</div>
				) : null}
				{mode === MODE.LOGIN && (
					<div
						className="text-sm underline cursor-pointer"
						onClick={() => {
							setMode(MODE.RESET_PASSWORD)
						}}
					>
						Forgot Password?
					</div>
				)}
				<button
					disabled={isLoading}
					className="bg-clrPrimary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
				>
					{isLoading ? 'Loading...' : buttonTitle}
				</button>
				{error ?? <div className="text-red-600">{error}</div>}
				{mode === MODE.LOGIN && (
					<div
						className="text-sm underline cursor-pointer"
						onClick={() => {
							setMode(MODE.REGISTER)
						}}
					>
						{"Don't"} have an account?
					</div>
				)}
				{mode === MODE.REGISTER && (
					<div
						className="text-sm underline cursor-pointer"
						onClick={() => {
							setMode(MODE.LOGIN)
						}}
					>
						Have an account?
					</div>
				)}
				{mode === MODE.RESET_PASSWORD && (
					<div
						className="text-sm underline cursor-pointer"
						onClick={() => {
							setMode(MODE.LOGIN)
						}}
					>
						Go back to login
					</div>
				)}
				{message ?? <div className="text-green-600 text-sm">{message}</div>}
			</form>
		</section>
	)
}
