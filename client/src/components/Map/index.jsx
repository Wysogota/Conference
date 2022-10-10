import { useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';

const Map = (props) => {
  const { coord: { lat, lng }, fixed, className } = props;
  const [position, setPosition] = useState({ lat, lng });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onClickHandle = (e) => {
    const { lat, lng } = e.latLng;
    setPosition({
      lat: lat(),
      lng: lng(),
    });
  };

  if (!isLoaded) return <Spinner animation='border' role='status' />;

  return (
    <GoogleMap
      zoom={15} center={position}
      mapContainerStyle={{ aspectRatio: '1/1' }}
      options={{ disableDefaultUI: true }}
      onRightClick={!fixed && onClickHandle}
      mapContainerClassName={className}
    >
      <MarkerF position={position} onRightClick />
    </GoogleMap>
  );
};

Map.propTypes = {
  coord: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  fixed: PropTypes.bool,
  className: PropTypes.string,
};

export default Map;
