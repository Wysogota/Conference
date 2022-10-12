import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../../Map';

const MapInput = (props) => {
  const { lat, lng, setFieldValue } = props;
  const [coord, setCoord] = useState({ lat, lng });

  useEffect(() => {
    setCoord({ lat, lng }); // If values was updated from input form
  }, [lat, lng]);
  
  useEffect(() => {
    setFieldValue('lat', coord.lat); // If new coord value was select, update formik state
    setFieldValue('lng', coord.lng); // ^
  }, [coord]);

  return <Map coord={coord} setCoord={setCoord} className='mb-3' />;
};

MapInput.propTypes = {
  lat: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  lng: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default MapInput;
