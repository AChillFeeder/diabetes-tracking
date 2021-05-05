import { useEffect, useState } from "react";
import {link} from "../usables/baseLink.js";

const Home = () => {

    const [error, setError] = useState("")
    const [days, setDays] = useState([])
    const [reload, setReload] = useState(false)

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

    function handleEdit(ID){
        fetch(`${link}/day/edit`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": ID,
                "weight": 85.5,
                "sugar_amount": 0.99
            })
        }).then(window.location.reload(true))
    }
    function handleDelete(ID){
        console.log(ID)
        fetch(`${link}/day/delete`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": ID
            })
        }).then(window.location.reload(true))
    }

    return(
        <div className="home-content">
            <h3>Vos jours: </h3>
            {
                days 
                &&
                <div className="days"> 
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Poids</th>
                                <th>Glycemie</th>
                                <th>Options</th>
                            </tr>
                        </thead>

                        <tbody>
                        {days.map(day => (
                            <tr key={day.id}>
                                <td>{day.id}</td>
                                <td>{day.date}</td>
                                <td>{day.weight}</td>
                                <td>{day.sugar_amount}</td>
                                <td class="table-options">
                                    <ul>
                                        {/* <li onClick={() => handleEdit(day.id)}>Changer</li> */}
                                        <li onClick={() => handleDelete(day.id)}>Supprimer</li>
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            }
            {error && <p className="error">Erreur: {error}</p>}
        </div>
    )
}
 
export default Home;