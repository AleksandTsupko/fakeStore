import axios from 'axios'
import React, { useState } from 'react'
import { IProduct } from '../models'
import { ErrorMessage } from './ErrorMessage'

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
    const [value, setValue] = useState<IProduct>({
        title: "",
        price: 0,
        description: "",
        image: "",
        category: "",
        rating: {
            rate: 0,
            count: 0
        }
    })
    const [error, setError] = useState("")

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        if (value.title.trim().length === 0 || typeof value.title !== "string") {
            setError("Invalid title")
            return
        }

        const response = await axios.post<IProduct>("https://fakestoreapi.com/products", value)

        onCreate(response.data)
    }

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" className='w-full outline-0 border py-2 px-4 mb-2' placeholder='Enter product title' name="title" value={value.title} onChange={inputHandler} />
            <input type="text" className='w-full outline-0 border py-2 px-4 mb-2' placeholder='Enter product price' name="price" value={value.price !== 0 ? value.price : ""} onChange={inputHandler} />
            <input type="text" className='w-full outline-0 border py-2 px-4 mb-2' placeholder='Description' name="description" value={value.description} onChange={inputHandler} />
            <input type="text" className='w-full outline-0 border py-2 px-4 mb-2' placeholder='Image URL' name="image" value={value.image} onChange={inputHandler} />
            <input type="text" className='w-full outline-0 border py-2 px-4 mb-2' placeholder='Category' name="category" value={value.category} onChange={inputHandler} />
            <button type='submit' className='py-2  px-4 border bg-yellow-400 hover:text-white'>Create</button>
            {error && <ErrorMessage error={error} />}
        </form>
    )
}