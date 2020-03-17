import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0
  };
  //special react method that must be static
  //takes a set of props and give back a set of state
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/300/300"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }

  //use arr fxns when passing events dwn to chldren
  handleIndexClick = event => {
    this.setState({
      //+ turns it from string to number..cuz data-index needs a number
      active: +event.target.dataset.index
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            //elint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbail"
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
