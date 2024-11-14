'use client';

import { useEffect, useState } from "react";

export default function EventosPage(){

    const [eventos, setEventos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    async function getData(){
      await fetch('http://localhost:3000/eventos')
      .then((response) => {
        if(!response.ok){
          // Como tratar 500, 404, 401, 403?
          throw new Error('Erro ao listar os eventos!')
        }
        return response.json()
      })
      .then((dados) => setEventos(dados))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
    }
    getData()
  }, [])

    return (
        <div className="m-4">
            <h1 className="text-2xl">Listagem de eventos</h1>
            {isLoading && <div className="bg-yellow-200 text-zinc-900 p-2">Carregando...</div>}
            {error && <div className="bg-red-500 p-2">{error.toString()}</div>}
            {eventos.length == 0 && !isLoading && !error && <div className="bg-blue-500 p-2">Não existem eventos cadastrados!</div>}
            {eventos.length > 0 &&
            <table>
              <thead>
                <tr>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Data</th>    
                </tr>
                </thead>
                <tbody>
                {eventos.map(e => (
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.titulo}</td>
                        <td>{e.data}</td>
                    </tr>
                ))}
                </tbody>
            </table>}
        </div>
    )
}