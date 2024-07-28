import { createClient, OAuthStrategy, TokenRole } from '@wix/sdk'
import type { IOAuthStrategy, RefreshToken, WixClient } from '@wix/sdk'
import { products, collections } from '@wix/stores'
import { cookies } from 'next/headers'
import { members } from '@wix/members'

export const wixClientServer = async (): Promise<
	WixClient<
		undefined,
		IOAuthStrategy,
		{ products: typeof products; collections: typeof collections; members: typeof members }
	>
> => {
	let refreshToken: RefreshToken = { value: '', role: TokenRole.VISITOR }

	try {
		const cookieStore = cookies()
		refreshToken = JSON.parse(cookieStore.get('refreshToken')?.value ?? '{}') as RefreshToken
	} catch (err) {}

	const wixClient = createClient({
		modules: {
			products,
			collections,
			members,
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
	return wixClient
}
