import PropTypes from 'prop-types';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';
import { isFinite, isFunction } from 'lodash';
import { useState, useEffect } from 'react';

const Map = (props) => {
  const { coord, setCoord, fixed, className } = props;
  const isCoordValid = isFinite(coord.lat) && isFinite(coord.lng);
  const [defaultCoord, setDefaultCoord] = useState();
  
  useEffect(() => {
    if (isCoordValid) {
      setDefaultCoord(coord);
    }
  }, [coord]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const onClickHandle = (e) => {
    const { lat, lng } = e.latLng;

    if (isFunction(setCoord)) {
      setCoord({
        lat: lat(),
        lng: lng(),
      });
    }
  };

  if (!isLoaded) return <Spinner animation='border' role='status' />;
  
  return (
    <GoogleMap
      zoom={15} center={defaultCoord}
      mapContainerStyle={{ aspectRatio: '1/1' }}
      options={{ disableDefaultUI: true }}
      onRightClick={!fixed && onClickHandle}
      mapContainerClassName={className}
    >
      {isCoordValid && <MarkerF position={defaultCoord} onRightClick />}
    </GoogleMap>
  );
};

Map.propTypes = {
  coord: PropTypes.shape({
    lat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    lng: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
  setCoord: PropTypes.func,
  fixed: PropTypes.bool,
  className: PropTypes.string,
};

export default Map;
