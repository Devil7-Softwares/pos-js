import './styles.scss';

import React, { useEffect, useState } from 'react';

import { Cloud, Moon, Stars, Sun } from '../Icons';

export const ThemeSwitch: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(
        window.localStorage && window.localStorage.getItem('darkTheme')
            ? window.localStorage.getItem('darkTheme') === 'true'
            : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? true
            : false
    );

    useEffect(() => {
        const root = document.getElementById('root');

        if (isDarkTheme) {
            root.classList.remove('light');
            root.classList.add('dark');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }

        if (window.localStorage) {
            window.localStorage.setItem('darkTheme', String(isDarkTheme));
        }
    }, [isDarkTheme]);

    return (
        <label className='switch'>
            <input
                type='checkbox'
                checked={isDarkTheme}
                onClick={(e) => {
                    setIsDarkTheme(e.currentTarget.checked);
                }}
            />
            <span className='slider round'>
                <Sun />
                <Moon />
                <Cloud />
                <Stars />
            </span>
        </label>
    );
};
