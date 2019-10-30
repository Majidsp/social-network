import React, { useState, useEffect } from 'react';
import axios from "../../axios";


function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState(false);



    useEffect(() => {
        let ignore = false;
        (async () => {
            if(!searchInput) {
                const { data } = await axios.get('api/users');
                setUsers(data);
            } else {
                const { data } = await axios.get(`/search/${searchInput}`);
                if(!ignore) {
                    setUsers(data);
                } else {
                    console.log('Ignored');
                }
            }
        })();
        return () => {
            ignore = true;
        };
    }, [ searchInput ]);

    return (
        <div style={{backgroundColor: 'grey'}}>
            <h1>Find People</h1>
            <h4>Checkout who just joined!</h4>
            Find People: <input onChange={e => setSearchInput(e.target.value)} />
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
