import type { currentCart } from '@wix/ecom'

interface Subtotal {
	amount: string
	formattedAmount: string
}

export interface Cart {
	cart: currentCart.Cart
	subtotal?: Subtotal
}
