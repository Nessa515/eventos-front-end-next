'use client';
import { useEffect } from "react";

export default function EventosPage(){

    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    async function getData(){
    await fetch('http://localhost:3000/eventos')
    .then((response) => {
      if(!response.ok){
        throw new Error('Não foi possível obter os dados')
      }
      return response.json()
    })
    .then((dados) => setEventos(dados))
    .catch((error) => setError(error))
    .finally(() => setLoading(false))
    }
    getData()
  }, [])

    return (
        <div className="m-4">
            <h1 className="text-2xl">Listagem de eventos</h1>
            {setLoading && <div className="bg-yellow-200 text-zinc-900 p-2">Carregando...</div>}
            {error && <div className="bg-red-500 p-2">{error.toString()}</div>}
            {eventos.length > 0 &&
            <table>
                <tr>
                    <th>Id</th>
                    <th>Titulo</th>
                    <th>Data</th>    
                </tr>    
                {eventos.map((e) => (
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.titulo}</td>
                        <td>{e.data}</td>
                    </tr>
                ))}
            </table>}
        </div>
    )
}