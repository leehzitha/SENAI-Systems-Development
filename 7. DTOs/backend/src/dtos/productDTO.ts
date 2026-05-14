export interface registerProductDTO {
    name : string
    description: string
    price : number
    stock : number
    category : string
}

export interface findDTO {
    id? : number
    name? : string
    category? : string
    minPrice? : number
    maxPrice? : number
}

export interface findByIdDTO {
    id: number
}