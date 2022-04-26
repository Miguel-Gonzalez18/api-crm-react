import React from 'react'
import {useNavigate} from 'react-router-dom'
    const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()
    const {nombre, empresa, email, telefono, nota, id} = cliente
    return (
        <tr className='border-b hover:bg-gray-100'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 font-bold uppercase'>Email:</span> {email}</p>
                <p><span className='text-gray-800 font-bold uppercase'>Telefono:</span> {telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td>
                <button onClick={()=> navigate(`/clientes/${id}`)}className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs rounded-md shadow mt-3 mb-3' type='button'>Ver mas</button>

                <button onClick={() => navigate(`/clientes/editar/${id}`)} className='bg-blue-600 hover:bg-blue-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-md shadow mt-3 mb-3' type='button'>Editar</button>

                <button onClick={()=> handleEliminar(id)} className='bg-red-600 hover:bg-red-800 block w-full text-white p-2 uppercase font-bold text-xs rounded-md shadow mt-3 mb-3' type='button'>Eliminar</button>
            </td>
        </tr>
    )
}

export default Cliente