type OfferGalleryProps = {
  images: string[];
}

const OfferGallery = ({images}: OfferGalleryProps) => (
  <div className="offer__gallery-container container">
    <div className="offer__gallery">
      {
        images.map((url) => (
          <div key={`${url}${Math.random()}`} className="offer__image-wrapper">
            <img className="offer__image" src="img/room.jpg" alt="Photo studio"/>
          </div>
        ))
      }
    </div>
  </div>
);

export default OfferGallery;
