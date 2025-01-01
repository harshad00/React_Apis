import React, { useEffect, useState } from 'react';

const Get = () => {
    const [jokes, setJokes] = useState([]); // State to store jokes
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchJokes = async () => {
            const url = 'https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%252Cid%252Ccontent&page=1';
            const options = { method: 'GET', headers: { accept: 'application/json' } };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setJokes(data.data.data);
                console.log(data.data.data);
                // Store the fetched data in the state
            } catch (error) {
                setError(error.message); // Handle the error
            }
        };

        fetchJokes(); // Call the function
    }, []); // Empty dependency array to run only once on mount

    return (
        <div>
            <h1>Random Science Jokes</h1>
            {error ? (
                <p style={{ color: 'red' }}>Error: {error}</p>
            ) : jokes.length > 0 ? (
                <ul>
                    {jokes.map((joke, index) => (
                        <li style={{ margin: '4px', backgroundColor: '#ff666f', padding: '1pc', borderRadius: '3px' }} key={joke.id || index}>{joke.content || 'No content available'}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading jokes...</p>
            )}
        </div>
    );
};

export default Get;
