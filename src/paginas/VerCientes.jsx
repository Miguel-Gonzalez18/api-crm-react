import React from 'react'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'

const VerCientes = () => {
    const { id } = useParams()
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)
    useEffect(()=>{
        const obtenerClienteAPI = async () => {
            setCargando(!cargando)
            try {
                const url = `http://localhost:4000/clientes/${id}`
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
        cargando ? <Spinner /> :
        Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div>
                <h1 className='text-4xl text-blue-900 font-black'>Ver cliente: {cliente.nombre}</h1>
                <p className='mt-3'>Informacion el cliente</p>

                <p className='text-2xl text-gray-600 mt-4'><span className='uppercase font-bold text-gray-800'>Cliente:</span> {cliente.nombre}</p>
                <p className='text-2xl text-gray-600 mt-4'><span className='uppercase font-bold text-gray-800'>Email:</span> {cliente.email}</p>
                {cliente.telefono && (
                    <p className='text-2xl text-gray-600 mt-4'><span className='uppercase font-bold text-gray-800'>Telefono:</span> {cliente.telefono}</p>
                )}
                <p className='text-2xl text-gray-600 mt-4'><span className='uppercase font-bold text-gray-800'>Empresa:</span> {cliente.empresa}</p>
                {cliente.notas && (
                    <p className='text-2xl text-gray-600 mt-4'><span className='uppercase font-bold text-gray-800'>Notas:</span> {cliente.notas}</p>
                )}
            </div>
        )
    )
}

export default VerCientes