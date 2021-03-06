import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {useNavigate} from 'react-router-dom'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {
    const navigate = useNavigate()
    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(20, 'El nombre es muy largo').required('El nombre del cliente es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().required('El email es obligatorio').email('Este no es un correo valido'),
        telefono: Yup.number().integer('Numero no validos').positive('No Agregues numeros negativos').typeError('El numero de telefono no es valido')
    })

    const handleSubmit = async (valores) =>{ 
        try {
            let respuesta
            if(cliente.id){
                // Editando un resgistro
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers:  {
                        'Content-Type': 'application/json'
                    }
                })
            }else{
                //Nuevo resgistro
                const url = import.meta.env.VITE_API_URL
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers:  {
                        'Content-Type': 'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? "Editar cliente" : "Agregar cliente"}</h1>
            <Formik 
                initialValues={{ 
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                enableReinitialize={true}
                onSubmit={ async (values, {resetForm})=>{
                    await handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
                >
                {({errors, touched})=> {
                    return(
                        <Form className='mt-10'>
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="nombre">Nombre</label>
                                <Field name="nombre" id="nombre" type="text" className="mt-2 w-full block p-3 bg-gray-100 rounded-md" placeholder="Escribe el nombre del cliente"/>

                                {errors.nombre && touched.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}
                            </div >
    
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="empresa">Empresa</label>
                                <Field name="empresa" id="empresa" type="text" className="mt-2 w-full block p-3 bg-gray-100 rounded-md" placeholder="Nombre de la empresa"/>

                                {errors.empresa && touched.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null}
                            </div >
    
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="email">E-mail</label>
                                <Field name="email" id="email" type="email" className="mt-2 w-full block p-3 bg-gray-100 rounded-md" placeholder=" Escribe el E-mail del cliete"/>

                                {errors.email && touched.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div >
    
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="telefono">Telefono</label>
                                <Field name="telefono" id="telefono" type="tel" className="mt-2 w-full block p-3 bg-gray-100 rounded-md" placeholder="Numero de telefono del cliente"/>

                                {errors.telefono && touched.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : null}
                            </div >
    
                            <div className='mb-4'>
                                <label className='text-gray-800' htmlFor="notas">Notas</label>
                                <Field as="textarea" name="notas" id="notas" type="text" className="mt-2 w-full block p-3 bg-gray-100 rounded-md h-40" placeholder="Notas del cliente"/>
                            </div >
    
                            <input type="submit" value={cliente?.nombre ? "Editar cliente" : "Agregar cliente"} className='w-full mt-5 bg-blue-800 text-white uppercase font-bold text-lg p-3 hover:cursor-pointer' />
                        </Form>
                    )
                }}
            </Formik>
        </div>
        )
    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}
export default Formulario