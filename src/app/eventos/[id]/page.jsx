'use client'
import { use } from 'react';

export default function EventosPorId({ params }){

    const { id } = use(params);

    return (
        <div>
            <h1>Eventos por id: {id}</h1>
        </div>
    )
}