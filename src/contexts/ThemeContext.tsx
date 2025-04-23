import React, { createContext, useState, useEffect, useContext } from 'react';
import { ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Get initial theme from localStorage or default to dark mode
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme ? JSON.parse(savedTheme): true;
    });

    // Toggle between dark and light
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    }

    // Update DOM and localStorage when theme changes
    useEffect(() => {
        const htmlElement = document.documentElement;
        if(isDarkMode){
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }

        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    // Context Value
    const contextValue: ThemeContextType = {
        isDarkMode,
        toggleDarkMode
    };

    return (
        <ThemeContext.Provider value = {contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);

    if(context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};