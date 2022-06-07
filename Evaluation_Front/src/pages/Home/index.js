import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1> Welcome to the app! </h1>
            <nav>
                <Link to="/department">Department</Link>
            </nav>
        </div>
    );
}
export default Home
