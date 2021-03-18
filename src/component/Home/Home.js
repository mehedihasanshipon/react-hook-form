import React, { useContext } from 'react';
import { UserContext } from '../../App';

const Home = () => {
    const[loggedInUser] = useContext(UserContext);
    return (
        <div className="container text-primary mt-5" >
            <h2>This is home</h2>
            <h4>Email: {loggedInUser.email} </h4>
        </div>
    );
};

export default Home;