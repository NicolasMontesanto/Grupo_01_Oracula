import React from 'react';
import './css/App.css';
import Sidebar from './components/Sidebar.jsx'
import ContentWrapper from './components/ContentWrapper.jsx'

function App() {
    return (
        <div className="app">
            <Sidebar />
            <ContentWrapper/>
        </div>
    );
}

export default App;