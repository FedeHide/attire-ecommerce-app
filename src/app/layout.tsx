import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../scss/main.scss'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { WixClientProvider } from '@/context/wixContext'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
	themeColor: '#ffffff',
}

export const metadata: Metadata = {
	title: 'ATTIRE | ecommerce-app',
	description:
		'Practice Ecommerce Project: This repository serves as a sandbox for experimenting with ecommerce website development. It contains dummy data and serves no real-world sales purpose.',
	manifest: '/manifest.json',
	robots: 'index, follow',
	authors: [{ name: 'FedeHide' }],
	keywords: ['attire', 'clothes', 'shop'],
	icons: {
		apple: '/apple-touch-icon.png',
		icon: '/favicon.ico',
	},
	openGraph: {
		url: 'https://palindrome-checker.vercel.app/' /* cambiar */,
		type: 'website',
		title: 'ATTIRE | ecommerce-app',
		description:
			'Practice Ecommerce Project: This repository serves as a sandbox for experimenting with ecommerce website development. It contains dummy data and serves no real-world sales purpose.',
		images: [
			'https://raw.githubusercontent.com/FedeHide/attire-ecommerce-app/main/public/assets/attire-ecommerce-app-ss.webp',
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
				<meta name="apple-mobile-web-app-title" content="ATTIRE | ecommerce-app" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
			</head>
			<body className={inter.className}>
				<WixClientProvider>
					<Navbar />
					{children}
					<Footer />
				</WixClientProvider>
			</body>
		</html>
	)
}
