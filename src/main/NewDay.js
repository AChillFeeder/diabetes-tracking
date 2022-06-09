import { useHistory } from "react-router";
import {link} from "../usables/baseLink.js";
import React from 'react';

const NewDay = () => {

    const history = useHistory()

    const [weight, setWeight] = React.useState(0);
    const [sugarLevel, setSugarLevel] = React.useState(0);
    const [mood, setMood] = React.useState(0);
    const [meals, setMeals] = React.useState([]);
    const [mealsList, setMealsList] = React.useState([]);
    const [notes, setNotes] = React.useState([]);
    const [notesList, setNotesList] = React.useState([]);
 
    function handleSubmit(event){
        event.preventDefault()

        fetch(`${link}/day/add`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "weight": weight,
                "sugarLevel": sugarLevel,
                "mood": mood,
                "meals": mealsList,
                "notes": notesList
            })
        }).then(() => {
            history.push('/home')
        })
    }

    const handleMeals = () => {
        setMealsList([...mealsList, meals]);
        setMeals('');
    }

    const removeMeal = (index) => {
        const rows = [...mealsList];
        rows.splice(index, 1);
        setMealsList(rows);
    }
    
    const handleNotes = () => {
        setNotesList([...notesList, notes]);
        setNotes('');
    }
    const removeNote = (index) => {
        const rows = [...notesList];
        rows.splice(index, 1);
        setNotesList(rows);
    }
    
    return ( 
        <div className="newDay-content">
            <h3>Ajouter un nouveau jour:</h3>
            <div className="form">
                <label htmlFor="weight">Poids: </label>
                <input 
                    type="number" 
                    name="weight" 
                    step="0.1" 
                    min="0" 
                    id="weight" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)}
                />

                <label htmlFor="sugarLevel">Glycemie: </label>
                <input 
                    type="number" 
                    name="sugarLevel" 
                    step="0.1" 
                    min="0" 
                    id="sugarLevel" 
                    value={sugarLevel} 
                    onChange={(e) => setSugarLevel(e.target.value)}
                />
                
                <label htmlFor="mood">Humeur (de 1 a 10): </label>
                <input 
                    type="number" 
                    name="mood" 
                    step="0.1" 
                    min="0" 
                    id="mood" 
                    value={mood} 
                    onChange={
                        (e) => {
                            if(e.target.value < 10 && e.target.value > 0){
                                setMood(e.target.value)
                            }else if (e.target.value < 0){
                                setMood(0)
                            }else if (e.target.value > 10){
                                setMood(10)
                            }
                        }
                    }
                />

                <label htmlFor="meals">Vos repas: </label>
                <input 
                    type="text" 
                    name="meals" 
                    id="meals" 
                    value={meals} 
                    onChange={(e) => setMeals(e.target.value)}
                />
                {mealsList.map(
                    (meal, index) => {
                        return (
                            <span>
                                {meal}
                                <button onClick={() => removeMeal(index)}>x</button>
                            </span>
                    )}
                )}
                <button onClick={handleMeals}>Ajouter Repas</button>


                <label htmlFor="notes">Vos remarques: </label>
                <input 
                    type="text" 
                    name="notes" 
                    id="notes" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)}
                />
                {notesList.map(
                    (note, index) => {
                        return (
                            <span>
                                {note}
                                <button onClick={() => removeNote(index)}>x</button>
                            </span>
                    )}
                )}
                <button onClick={handleNotes}>Ajouter Remarque</button>


                <button onClick={handleSubmit}>Envoyer</button>
            </div>
        </div>
    );
}
 
export default NewDay;