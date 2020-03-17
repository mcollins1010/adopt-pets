import { createContext } from 'react';

//used to set color context ,so that it can be used in other pages
const ThemeContext = createContext([ 'blue', () => {} ]);

export default ThemeContext;
