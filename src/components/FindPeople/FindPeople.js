import React, { useState, useEffect } from 'react';
import axios from "../../axios";
import { Link } from 'react-router-dom';



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
        <div className="findPeople">
            <div>
                <h2>Checkout who just joined Connect!</h2>
            </div>
            <div>
                Or Find People: <input onChange={e => setSearchInput(e.target.value)} />
            </div>
            {users.map(
                user => (
                    <div className="findPeople-user" key={user.id}>
                        <Link to={'user/'+user.id}>
                            <img src={user.profile_pic_url = user.profile_pic_url || '../../assets/images/default_profile_pic.jpg'} alt="Image!"/>
                        </Link>
                        <h5>{user.firstname} {user.lastname}</h5>
                    </div>
                )
            )}

        </div>
    );
}

export default FindPeople;
