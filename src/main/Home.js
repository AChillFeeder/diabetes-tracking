import { useEffect, useState } from "react";
import {link} from "../usables/baseLink.js";

const Home = () => {

    const [error, setError] = useState("")
    const [days, setDays] = useState([])

    useEffect(() => { // Used to avoid the infinite loop issue
        fetch(`${link}/user/days`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
        .then((data) => {
            if(data.retrieved){
                setDays(data.days)
            }else{
                setError("Impossible de trouver vos jours pour le moment. | " + data.message)
            }
                
            })
    }, [])

    return(
        <div className="home-content">
            <h3>Vos jours: </h3>
            {
                days 
                &&
                <div className="days"> 
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Poids</th>
                            <th>Sucre</th>
                        </tr>
                        {days.map(day => (
                            <tr>
                                <td>{day.id}</td>
                                <td>{day.date}</td>
                                <td>{day.weight}</td>
                                <td>{day.sugar_amount}</td>
                            </tr>
                        ))}
                    </table>

                </div>
            }
            {error && <p className="error">Erreur: {error}</p>}
        </div>
    )
}
 
export default Home;