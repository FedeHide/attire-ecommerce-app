'use client'

import { createClient, OAuthStrategy } from '@wix/sdk'
import { products, collections } from '@wix/stores'
import { currentCart } from '@wix/ecom'
import type { RefreshToken } from '@wix/sdk'
import Cookies from 'js-cookie'
import { createContext } from 'react'
import type { ReactNode } from 'react'

const refreshToken = JSON.parse(Cookies.get('refreshToken') ?? '{}') as RefreshToken

const wixClient = createClient({
	modules: {
		products,
		collections,
		currentCart,
	},
	auth: OAuthStrategy({
		clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID ?? '',
		tokens: {
			refreshToken,
			accessToken: {
				value: '',
				expiresAt: 0,
			},
		},
	}),
})

export type WixClient = typeof wixClient

export const WixClientContext = createContext<WixClient>(wixClient)

export const WixClientProvider = ({ children }: { children: ReactNode }): JSX.Element => {
	return <WixClientContext.Provider value={wixClient}>{children}</WixClientContext.Provider>
}
