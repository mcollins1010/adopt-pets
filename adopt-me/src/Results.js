import React from 'react';
import Pet from './Pet';

//one-way data flow,search from parent(Pets and pass on to child)
const Results = ({ pets }) => {
	return (
		<div className="search">
			{pets.length === 0 ? (
				<h1>NO Pets Found</h1>
			) : (
				pets.map((pet) => (
					<Pet
						animal={pet.type}
						key={pet.id}
						name={pet.name}
						breed={pet.breeds.primary}
						media={pet.photos}
						location={`${pet.contact.address.city}, ${pet.contact.state}`}
						id={pet.id}
					/>
				))
			)}
		</div>
	);
};

export default Results;
