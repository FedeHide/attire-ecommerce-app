export interface listSearchParamsProps {
	searchParams: {
		cat: string
		name: string
		type: string
		min: number
		max: number
		sort: string
		page: string
	}
}

export interface productListSearchParams {
	name: string
	type: string
	min: number
	max: number
	sort: string
	page: string
	cat: string
}
