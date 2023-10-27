import React from 'react'
import { Routes, Route } from "react-router-dom"
import { Home } from '../Home/Home'
import { Details } from '../../pages/details/Details'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { CartDetails } from '../cart/CartDetails'

export const AllRoute = () => {
    return (
        <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Details />} path='/product/details/:id' />
            <Route element={<Login />} path='/login' />
            <Route element={<Register />} path='/register' />
            <Route element={<CartDetails />} path='/get/cart/list/:id' />
        </Routes>
    )
}
