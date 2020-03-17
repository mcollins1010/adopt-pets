import React, { useState, useEffect, useContext } from 'react';
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import Themecontext from './ThemeContext';

const SearchParams = () => {
	//using a usestate to set the location
	//setlocation is an updater fo the state
	//use of hooks: all hooks begin with a 'use' and
	//they dont go inside if/for loop cuz they called in the order of creation so they can be distorted
	const [ location, setLocation ] = useState('Seattle, WA');
	const [ breeds, setBreeds ] = useState([]); //set it to an empty array, change as per user selection
	const [ pets, setPets ] = useState([]);
	const [ theme, setTheme ] = useContext(Themecontext);
	//location => current state and setlocation=> updater
	//below are custom hooks
	const [ animal, AnimalDropdown ] = useDropdown('Animal', 'dog', ANIMALS);
	const [ breed, BreedDropdown, setBreed ] = useDropdown('Breed', '', breeds);

	async function requestPets() {
		//an asyns guarentees to ret a promise
		const { animals } = await pet.animals({
			location,
			breed,
			type: animal
		});
		console.log('animals', animals);
		setPets(animals || []);
	}

	//to run after the render happens,u nid user to see smtx while waiting den go to API to get data
	//effect does nt run ONLy on 1st render, only after the return below
	//useeffect renders if only there are changes to the animal,
	//if animal selection changes den breed has to change too
	//breed selection depends on animal and nt other way round
	//it checks for any change den runs/renders it

	useEffect(
		() => {
			//ret a Promise
			setBreeds([]);
			setBreed(''); //brings breed back to default('All') anytime animal changes

			//any update/change,go back to the API and grab info to re-render
			pet.breeds(animal).then(({ breeds: apiBreeds }) => {
				const breedStrings = apiBreeds.map(({ name }) => name);
				setBreeds(breedStrings);
			}, console.error);
		},
		//animal has power to setbreeds/setbreed but not vice versa
		//if u remove animal frm here then breed does depen on it to switch as per animal type
		//breed becames independent frm animal=> wrong to do
		[ animal, setBreed, setBreeds ]
	);

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestPets();
				}}
			>
				<label htmlFor="location">
					Location
					<input
						id="location"
						value={location}
						placeholder="Location"
						/*event handler=> getting the value whenever an event happens */
						onChange={(event) => setLocation(event.target.value)}
					/>
				</label>
				<AnimalDropdown />
				<BreedDropdown />
				<label htmlFor="theme">
					Theme
					<select
						value={theme}
						onChange={(e) => setTheme(e.target.value)}
						onBlur={(e) => setTheme(e.target.value)}
					>
						<option value="peru">Peru</option>
						<option value="darkblue">Dark blue</option>
						<option value="mediumorchid">Medium Orchid</option>
						<option value="chartreuse">Chartreuse</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
			</form>
			<Results pets={pets} />
		</div>
	);
};
export default SearchParams;
