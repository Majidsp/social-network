import React, { useState, useEffect } from 'react';
import axios from "../../axios";


function FindPeople() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get('api/users')
            .then(( {data}) => {
                console.log(data);
                setUsers(data);
            })
            .catch(err => {
                console.error(err);
                setError(true);
            });
    }, []);

    return (
        <div style={{backgroundColor: 'grey'}}>
            <h1>Find People</h1>
            {error && <p>Something went wrong.</p>}
            {users.map(
                user => (
                    <div key={user.id}>
                        <img src={user.profile_pic_url} />
                        <h1>{user.firstname} {user.lastname}</h1>
                        <p>{user.bio}</p>
                    </div>
                )
            )}
        </div>
    );
}

export default FindPeople;
