import React from "react";
import pet from "@frontendmasters/pet";

class Details extends React.Component {
  constructor(props) {
    super(props);

    //only withing the class,serves as hooks
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    pet
      .animal(this.props.id) //this.props here are immutable,used as inherite from parent class
      .then(({ animal }) => {
        this.setState({
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        });
      }, console.error);
  }
  render() {
    if (this.state.loading) {
      return <h1> loading ..</h1>;
    }

    const { animal, breed, location, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h1>{`${animal} - ${breed} - ${location}`}</h1>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;
