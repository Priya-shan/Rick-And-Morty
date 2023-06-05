import React, { useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import '../components/RickAndMorty.css'

export function RickAndMorty() {
    const [data, setData] = useState();
    const [index,setIndex]=useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("index : "+index);
                const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${index}`);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [index]);
    return (
        <>
        <div>
        <button className='prev-btn' onClick={()=>setIndex(index-1)}>prev</button>
        <button className='next-btn' onClick={()=>setIndex(index+1)}>next</button>
        </div>
        <div className='cards-container'>
            {data && (
                <div className='cards'>
                    {data.results.map((result) => (
                            <div key={result.id} className="card">
                                <img src={result.image} className="card-img-top" alt="Image Alt Text" />
                                <div className="card-body">
                                    <h5  className="card-title">{result.id}. {result.name}</h5>
                                    <div className="card-text">
                                        <span className="badge bg-success">{result.status}</span>
                                        <span className="badge bg-primary">{result.species}</span>
                                    </div>
                                </div>
                            </div>
                    ))}
                </div>
            )}
        </div>
        </>
    );
}
