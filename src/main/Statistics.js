import { useEffect } from 'react'
import { useState } from "react";
import {link} from "../usables/baseLink.js";
import Graph from "../microComponents/Graph.js";

const Statistics = () => {

    const [error, setError] = useState("")
    const [stats, setStats] = useState({})

    useEffect(() => { // Used to avoid the infinite loop issue
        fetch(`${link}/user/statistics`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then((response) => {
            if(response.success){
                console.log(response);
                setStats(response.data);
            }else{
                setError("Impossible de trouver vos jours pour le moment. | " + response.message)
            }
        })
    }, [])
                

    
    return ( 
        <div className="stats">
            <Graph stats={stats}/>
            {error && <p>Erreur: {error}</p>}
        </div>
     );
}
 
export default Statistics;