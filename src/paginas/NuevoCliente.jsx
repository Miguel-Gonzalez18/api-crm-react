import React from 'react'
import Formulario from '../components/Formulario'

const NuevoCliente = () => {
    return (
        <>
            <div className='p-5'>
                <h1 className='text-4xl text-blue-900 font-black'>Nuevo cliente</h1>
                <p className='mt-3'>LLenas los siguientes campos para registrar un cliente</p>
            </div>

            <Formulario />
        </>
    )
}

export default NuevoCliente