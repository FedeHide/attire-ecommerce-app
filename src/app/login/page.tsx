'use client'
import { useWixClient } from '@/context/wixContext'
import type { AuthenticationStrategy } from '@wix/sdk'
import { LoginState } from '@wix/sdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface CustomAuth extends Omit<AuthenticationStrategy<undefined>, 'loggedIn'> {
	auth: any
}

enum MODE {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	RESET_PASSWORD = 'RESET_PASSWORD',
	EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export default function LoginPage(): JSX.Element {
	const wixClient = useWixClient() as unknown as CustomAuth
	const router = useRouter()

	const [mode, setMode] = useState(MODE.LOGIN)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailCode, setEmailCode] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	useEffect(() => {
		const isLoggedIn = wixClient.auth.loggedIn()
		if (isLoggedIn === true) {
			router.push('/')
		}
	}, [wixClient, router])

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

			if (response?.loginState === LoginState.SUCCESS) {
				setMessage('Logged in successfully')
				const sessionToken = response.data.sessionToken
				if (sessionToken !== undefined && sessionToken !== null) {
					const tokens = await wixClient.auth.getMemberTokensForDirectLogin(sessionToken)
					Cookies.set('refreshToken', JSON.stringify(tokens.refreshToken), { expires: 2 })
					wixClient.auth.setTokens(tokens)
					router.push('/')
				} else {
					setError('Session token is missing')
				}
			} else if (response?.loginState === LoginState.FAILURE) {
				if (
					response.errorCode === 'invalidEmail' ||
					response.errorCode === 'invalidPassword'
				) {
					setError('Invalid email or password')
				} else if (response.errorCode === 'emailAlreadyExists') {
					setError('Email already exists')
				} else if (response.errorCode === 'resetPassword') {
					setError('You need to reset your password')
				} else {
					setError('Something went wrong')
				}
			} else if (response?.loginState === LoginState.EMAIL_VERIFICATION_REQUIRED) {
				setMode(MODE.EMAIL_VERIFICATION)
			} else if (response?.loginState === LoginState.OWNER_APPROVAL_REQUIRED) {
				setMessage('Your account is pending approval')
			}
		} catch (err) {
			console.error(err)
			setError('Something went wrong')
		} finally {
			setIsLoading(false)
			router.refresh()
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
				{error !== '' && <div className="text-red-600">{error}</div>}
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
				{message !== '' && <div className="text-green-600 text-sm">{message}</div>}
			</form>
		</section>
	)
}
