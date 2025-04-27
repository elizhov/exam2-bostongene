import './App.css'
import Products from "./components/products.jsx";
import {createContext, useEffect, useState} from "react";

const ThemeContext = createContext(null);

function App() {
    const [theme, setTheme] = useState('light');


    const switchTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={theme}>
        <button onClick={switchTheme}>Switch theme</button>
            <Products />
        </ThemeContext.Provider>
    )
}

export default App
