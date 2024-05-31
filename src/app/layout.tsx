import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../scss/main.scss'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
	themeColor: '#ffffff',
}

export const metadata: Metadata = {
	title: 'Palindrome Checker | freeCodeCamp' /* cambiar */,
	description: 'This is a Palindrome checker, a freecodecamp assignment' /* cambiar */,
	manifest: '/manifest.json',
	robots: 'index, follow',
	authors: [{ name: 'FedeHide' }],
	keywords: ['Palindrome', 'Checker', 'freeCodeCamp'] /* cambiar */,
	icons: {
		apple: '/apple-touch-icon.png',
		icon: '/favicon.ico',
	},
	openGraph: {
		url: 'https://palindrome-checker.vercel.app/' /* cambiar */,
		type: 'website',
		title: 'Palindrome Checker | freeCodeCamp' /* cambiar */,
		description: 'This is a Palindrome checker, a freecodecamp assignment' /* cambiar */,
		images: [
			'https://raw.githubusercontent.com/FedeHide/pokemon-search/main/public/assets/pokemon-search-screenshot.webp' /* cambiar */,
		],
	},
	twitter: {
		card: 'summary_large_image',
		site: 'https://palindrome-checker.vercel.app/' /* cambiar */,
	},
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-title"
					content="Pokemon Search App" /* cambiar */
				/>
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			</head>
			<body className={inter.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
