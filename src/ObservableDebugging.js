import { Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

/**
 * Adds a wrapper that allows to show debug information in the UI.
 * @param { children } The React Node to be rendered
 */
const ObservableDebugging = ({ items }) => <div style={{
  flex: '1 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  gap: '16px',
  right: '20px',
  zIndex: '1',
}}>
  {items.map(({ label, value }) => <Chip color="primary" label={`${label.toUpperCase()}: ${value}`} key={`${label}: ${value}`} />)}
</div>

ObservableDebugging.defaultProps = {
  items: [],
}
ObservableDebugging.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ObservableDebugging