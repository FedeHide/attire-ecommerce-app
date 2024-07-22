import type { WixClient } from './../context/wixContext'
import type { currentCart } from '@wix/ecom'
import { create } from 'zustand'

interface ExtendedCart extends currentCart.Cart {
	subtotal?: {
		amount: string
		formattedAmount: string
	}
}

interface CartState {
	cart: ExtendedCart
	isLoading: boolean
	counter: number
	getCart: (WixClient: WixClient) => Promise<void>
	addItem: (
		WixClient: WixClient,
		productId: string,
		variantId: string,
		quantity: number,
	) => Promise<void>
	removeItem: (WixClient: WixClient, itemId: string) => Promise<void>
	deleteCart: (WixClient: WixClient) => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
	cart: {} satisfies ExtendedCart,
	isLoading: true,
	counter: 0,
	getCart: async (wixClient) => {
		try {
			const cart = await wixClient.currentCart.getCurrentCart()
			set({
				cart: cart ?? ({} satisfies ExtendedCart),
				isLoading: false,
				counter: cart?.lineItems.length ?? 0,
			})
		} catch (err) {
			set((prev) => ({ ...prev, isLoading: false }))
		}
	},
	addItem: async (wixClient, productId, variantId, quantity) => {
		set((state) => ({ ...state, isLoading: true }))
		const response = await wixClient.currentCart.addToCurrentCart({
			lineItems: [
				{
					catalogReference: {
						appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
						catalogItemId: productId,
						...(variantId !== '' && { options: { variantId } }),
					},
					quantity,
				},
			],
		})

		set({
			cart: response.cart as ExtendedCart,
			counter: response.cart?.lineItems.length,
			isLoading: false,
		})
	},
	removeItem: async (wixClient, itemId) => {
		set((state) => ({ ...state, isLoading: true }))
		const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId])

		set({
			cart: response.cart as ExtendedCart,
			counter: response.cart?.lineItems.length,
			isLoading: false,
		})
	},
	deleteCart: async (wixClient) => {
		set((state) => ({ ...state, isLoading: true }))
		await wixClient.currentCart.deleteCurrentCart()

		set({
			cart: {} satisfies ExtendedCart,
			counter: 0,
			isLoading: false,
		})
	},
}))
