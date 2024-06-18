'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CartModal from './CartModal'
import { useWixClient } from '@/context/wixContext'
import Cookies from 'js-cookie'
import { useCartStore } from '@/hooks/useCartStore'

export default function NavIcons(): JSX.Element {
	const wixClient = useWixClient()
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const isLoggedIn = wixClient.auth.loggedIn()
	const { counter, getCart } = useCartStore()

	useEffect(() => {
		getCart(wixClient)
	}, [wixClient, getCart])

	const handleProfile = (): void => {
		if (!isLoggedIn) {
			router.push('/login')
		} else {
			setIsProfileOpen((prev) => !prev)
		}
	}

	const handleLogout = async (): Promise<void> => {
		setIsLoading(true)
		Cookies.remove('refreshToken')
		const { logoutUrl } = await wixClient.auth.logout(window.location.href)
		setIsLoading(false)
		setIsProfileOpen(false)
		router.push(String(logoutUrl))
	}

	// AUTH WITH WIX-MANAGED AUTH

	// const wixClient = useWixClient()
	// const login = async (): Promise<void> => {
	// 	const loginRequestData = wixClient.auth.generateOAuthData('http://localhost:3000/')
	// 	localStorage.setItem('oAuthRedirectData', JSON.stringify(loginRequestData))
	// 	const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData)
	// 	window.location.href = authUrl
	// }

	return (
		<section className="flex items-center gap-4 xl:gap-6 relative">
			{/* PROFILE */}
			<Image
				onClick={handleProfile}
				// onClick={login}
				className="cursor-pointer"
				src="/assets/icons/profile-icon.png"
				alt="profile icon"
				width={22}
				height={22}
			/>
			{isProfileOpen && (
				<div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
					<Link href="/">Profile</Link>
					<div
						className="mt-2 cursor-pointer"
						onClick={() => {
							void handleLogout()
						}}
					>
						{isLoading ? 'Logging out...' : 'Logout'}
					</div>
				</div>
			)}
			{/* NOTIFICATION */}
			<Image
				className="cursor-pointer"
				src="/assets/icons/notification-icon.png"
				alt="notification icon"
				width={22}
				height={22}
			/>
			{/* CART */}
			<div
				className="relative cursor-pointer"
				onClick={() => {
					setIsCartOpen(!isCartOpen)
				}}
			>
				<Image src="/assets/icons/cart-icon.png" alt="cart icon" width={22} height={22} />
				<div className="absolute -top-4 -right-4 w-6 h-6 bg-clrPrimary rounded-full text-white text-sm flex items-center justify-center">
					{counter}
				</div>
			</div>
			{isCartOpen && <CartModal />}
		</section>
	)
}
