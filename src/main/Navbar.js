import {Link, useHistory} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

const Navbar = () => {
    return ( 
        <div className="nav-bar">
            <h1>Traqueur</h1>
            <ul>
                <Link to='/home'>Home</Link>
                <Link to='/new-day'>Nouveau jour</Link>
                <Link to='/stats'>Statistiques</Link>
                <Link to='/settings'>Options</Link>
                <Link to='/' onClick={() => ReactSession.set("username", null)}>Se deconnecter</Link>
            </ul>
        </div>
     );
}
 
export default Navbar;