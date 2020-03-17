import React, { useState } from 'react';
import { render } from 'react-dom';
import SearchParams from './SearchParams';
import { Router, Link } from '@reach/router';
import Details from './Details';
import ThemeContext from './ThemeContext';

//first component(App) which ret a markup
const App = () => {
	const themehook = useState('darkblue');
	console.log(themehook[0]);
	//y use function calls instead html below, cuz its imperative code executed
	// it give JS d power to manipulate the data
	return (
		<React.StrictMode>
			<ThemeContext.Provider value={themehook}>
				<div>
					<header>
						<Link to="/">Adop Me</Link>
					</header>

					<Router>
						<SearchParams path="/" />
						<Details path="/details/:id" />
					</Router>
				</div>
			</ThemeContext.Provider>
		</React.StrictMode>
	);
};
//now we render the App component
render(
	<App />,
	document.getElementById('root') //from the div tag in index.html
	//takes either a string or a component
);
