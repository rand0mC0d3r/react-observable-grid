import { Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

/**
 * Adds a wrapper that allows to center the content of the component.
 * @param { children } The React Node to be rendered
 */
const ObservableDebugging = ({ items }) => <div style={{
  flex: '1 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  zIndex: '1',
  backgroundColor: '#EEE',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #888',
}}>
  {items.map(item => <Chip label={item} />)}
</div>

ObservableDebugging.defaultProps = {
  items: [],
}
ObservableDebugging.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ObservableDebugging