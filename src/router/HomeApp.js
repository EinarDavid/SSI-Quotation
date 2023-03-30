import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Cotizacion } from '../views/Cotizacion'
import { CotizaciónBloqued } from '../views/CotizaciónBloqued'
import { ViewCotización } from '../views/ViewCotización'

export const HomeApp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/cotizacion' element={< Cotizacion />} />
                    <Route path='/view/cotizacion/:id_quotation' element={<ViewCotización />} />
                    <Route path='/view/blocked/:id_quotation' element={<CotizaciónBloqued />} />

                    <Route path='/' element={<Navigate to='/cotizacion' />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}
