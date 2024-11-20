import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    // State for quote, author, and action
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [action, setAction] = useState('');

    // Function to fetch a random quote from the Quotes API
    const fetchQuote = async () => {
        try {
            const response = await fetch('https://quotes.rest/qod?language=en');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
            setAction("Take a moment to reflect on this quote!");
        } catch (error) {
            console.error('Error fetching quote:', error);
            setQuote("Error fetching quote.");
            setAuthor("");
            setAction("");
        }
    };

    // useEffect to fetch a quote on component mount
    useEffect(() => {
        fetchQuote();
    }, []);

    // Function to handle button click
    const handleButtonClick = () => {
        fetchQuote(); // Fetch a new quote when the button is clicked
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Daily Motivation</h1>
                <p>Your daily dose of positivity</p>
            </header>
            
            <main className="quote-section">
                <blockquote className="quote-display">
                    {quote}
                </blockquote>
                <p className="quote-author">- {author}</p>
                
                <button className="action-button" onClick={handleButtonClick}>
                    Take Action!
                </button>
                <p className="feedback-message">{action}</p>
            </main>
            
            <footer className="app-footer">
                <p>© 2024 Daily Motivation. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
