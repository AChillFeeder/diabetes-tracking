import { useEffect, useState } from "react";
import {link} from "../usables/baseLink.js";

const Home = () => {

    const [error, setError] = useState("")
    const [days, setDays] = useState([])
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch(`${link}/user/getUserInformation`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
        .then((response) => {
            if(response.success){
                setDays(response.data.userDays)
                setUserData(response.data.userData)
            }else{
                setError("Impossible de trouver vos jours pour le moment. | " + response.message)
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
    const handleDelete = (idday) => {
        fetch(`${link}/day/delete/${idday}`)
        .then(response => response.json())
        .then(
            (response) => {
                console.log(response);
                setDays(response.data);
            }
        )}

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
                                <th>Humeur</th>
                                <th>Repas</th>
                                <th>Notes</th>
                                <th>Options</th>
                            </tr>
                        </thead>

                        <tbody>
                        {days.map(day => (
                            <tr key={day.idday}>
                                <td>{day.idday}</td>
                                <td>{day.time}</td>
                                <td>{day.weight}</td>
                                <td>{day.sugarLevel}</td>
                                <td>{day.mood}</td>
                                <td>{day.meals.map(
                                    (meal, index) => {
                                        return (<p key={index}>- {meal}</p>)
                                    }
                                )}</td>
                                <td>{day.notes.map(
                                    (note, index) => {
                                        return (<p key={index}>- {note}</p>)
                                    }
                                )}</td>
                                <td className="table-options">
                                    <ul>
                                        {/* <li onClick={() => handleEdit(day.id)}>Changer</li> */}
                                        <li onClick={() => handleDelete(day.idday)}>Supprimer</li>
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