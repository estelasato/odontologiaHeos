import PropTypes from 'prop-types';

import { StyledSpinner } from './styles';

export default function Spinner({ size = 32 }) {
  return <StyledSpinner id="spinner" size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
