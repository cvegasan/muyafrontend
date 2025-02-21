// importar prop-types
// para definir que numero debe ser un número y es requerido (isRequired).
// PropTypes.number.isRequired: Define que la propiedad numero debe ser un número y no puede ser null ni undefined.
import PropTypes from 'prop-types';

const FormatoMiles = ({ numero }) => (
  <span>{new Intl.NumberFormat('es-CL').format(numero)}</span>
);

FormatoMiles.propTypes = {
  numero: PropTypes.number.isRequired,
};
export default FormatoMiles;