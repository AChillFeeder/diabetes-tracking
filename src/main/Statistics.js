import { useEffect } from 'react'
import { useState } from "react";
import {link} from "../usables/baseLink.js";
import WeightGraph from "../microComponents/WeightGraph.js";

const Statistics = () => {

    const [error, setError] = useState("");
    const [stats, setStats] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { // Used to avoid the infinite loop issue
        setIsLoading(true);
        fetch(`${link}/user/statistics`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then((response) => {
            if(response.success){
                setStats(response.data);
                setIsLoading(false);
            }else{
                setError("Impossible de trouver vos jours pour le moment. | " + response.message)
            }
        })
    }, [])
                

    
    return ( 
        <div className="stats">
            {isLoading && <p>Loading...</p>}
            {!isLoading && <WeightGraph stats={stats}/>}
            {error && <p>Erreur: {error}</p>}
        </div>
     );
}
 
export default Statistics;