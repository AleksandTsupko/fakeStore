import React, { useEffect, useState } from 'react';
import { IProduct } from "../models"
import axios, { AxiosError } from "axios"

export function useProducts() {
    const [products, setProducts] = useState<IProduct[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    function addProduct(product: IProduct) {
        setProducts(prev => [...prev, product])
    }

    useEffect(() => {
        async function fetchData() {
            try {
                setError("")
                setLoading(true)
                const response = await axios.get<IProduct[]>("https://fakestoreapi.com/products?limit=5")
                setProducts(response.data)
                setLoading(false)
            } catch (e: unknown) {
                const error = e as AxiosError
                setLoading(false)
                setError(error.message);
            }
        }
        fetchData()

    }, [])

    return { products, error, loading , addProduct}
}
