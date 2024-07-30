'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
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
	const pathname = usePathname()
	const isLoggedIn = wixClient.auth.loggedIn()
	const { counter, getCart } = useCartStore()
	const profileRef = useRef<HTMLDivElement>(null)
	const cartRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		void getCart(wixClient)
	}, [wixClient, getCart])

	useEffect(() => {
		setIsProfileOpen(false)
		setIsCartOpen(false)
	}, [pathname])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (profileRef.current != null && !profileRef.current.contains(event.target as Node)) {
				setIsProfileOpen(false)
			}
			if (cartRef.current != null && !cartRef.current.contains(event.target as Node)) {
				setIsCartOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [profileRef, cartRef])

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
		const { logoutUrl } = await wixClient.auth.logout(
			'https://attire-ecommerce-app.vercel.app/',
		)
		setIsLoading(false)
		setIsProfileOpen(false)
		router.push(String(logoutUrl))
	}

	return (
		<section className="flex items-center gap-4 xl:gap-6 relative">
			{/* PROFILE */}
			<Image
				onClick={handleProfile}
				className="cursor-pointer"
				src="/assets/icons/profile-icon.png"
				alt="profile icon"
				width={22}
				height={22}
			/>
			{isProfileOpen && (
				<div
					ref={profileRef}
					className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20"
				>
					<Link href="/profile">Profile</Link>
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
			{isCartOpen && (
				<div ref={cartRef}>
					<CartModal />
				</div>
			)}
		</section>
	)
}
