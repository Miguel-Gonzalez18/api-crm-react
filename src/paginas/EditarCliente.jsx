import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'

const EditarCliente = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)
    useEffect(()=>{
        const obtenerClienteAPI = async () => {
            setCargando(!cargando)
            try {
                const url = `${import.meta.env.VITE_API_URL}/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    },[])
    return (
        <>
            <div className='p-5'>
                <h1 className='text-4xl text-blue-900 font-black'>Editar cliente</h1>
                <p className='mt-3'>Utiiza este formulario para editar el cliente</p>
            </div>

            {cliente?.nombre ? (
                <Formulario cliente = {cliente} cargando={cargando} />
            ) : <p>Cliente ID no valido</p>}
        </>
    )
}

export default EditarCliente