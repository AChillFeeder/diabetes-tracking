import { useHistory } from "react-router";
import {link} from "../usables/baseLink.js";

const NewDay = () => {

    const history = useHistory()

    function handleSubmit(event){
        event.preventDefault()

        fetch(`${link}/day/add`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "weight": document.getElementById("weight").value,
                "sugar_amount": document.getElementById("sugar_amount").value,
            })
        }).then(() => {
            event.target.reset()
            history.push('/home')
        })
    }

    return ( 
        <div className="newDay-content">
            <h3>Ajouter un nouveau jour:</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="weight">Poids: </label>
                <input type="number" name="weight" min="0" id="weight"/>

                <label htmlFor="sugar-amount">Sucre: </label>
                <input type="number" step="0.01" min="0" name="sugar_amount" id="sugar_amount"/>

                <button>Envoyer</button>
            </form>
        </div>
    );
}
 
export default NewDay;