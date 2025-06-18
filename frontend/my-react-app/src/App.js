import React from 'react';
import Footer from './components/footer';
import Header from './components/header';   
import navbar from './components/navbar';

const App = () => {
    return (
        <div>
            <Header />
            <navbar />
            <h1>Welcome to My React App</h1>
            <p>This is a simple React application.</p>
            <button>Learn More</button>
            <Footer />
        </div>
    );
};

export default App;
