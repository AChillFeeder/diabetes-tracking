import { useEffect } from 'react'
import { useState } from "react";
import {link} from "../usables/baseLink.js";
import Graph from "../microComponents/Graph.js"

const Statistics = () => {

    const [error, setError] = useState("")
    const [data, setData] = useState(null)

    useEffect(() => { // Used to avoid the infinite loop issue
        fetch(`${link}/user/days`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then((data) => {
            if(data.retrieved){
                setData(data.days)
            }else{
                setError("Impossible de trouver vos jours pour le moment. | " + data.message)
            }
        })
    }, [])
                

    
    return ( 
        <div className="stats">
            {
                data && (data.length && 
                <div className="container">
                    <Graph values={data} error={error}></Graph>
                    <p>La courbe en <span style={{"color": "blue"}}>BLEU</span> represente votre POIDS.</p>
                    <p>La courbe en <span style={{"color": "red"}}>ROUGE</span> represente votre GLYCEMIE.</p>
                </div>
            )}
            {error && <p>Erreur: {error}</p>}
        </div>
     );
}
 
export default Statistics;