import { Chip } from '@material-ui/core'
import PropTypes from 'prop-types'

/**
 * Adds a wrapper that allows to show debug information in the UI.
 * @param { children } The React Node to be rendered
 */
const ObservableDebugging = ({ items }) => <div style={{
  flex: '1 0 auto',
  display: 'flex',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  alignItems: 'center',
  position: 'absolute',
  bottom: '20px',
  gap: '4px',
  right: '20px',
  zIndex: '1',
  width: '500px'
}}>
  {items.map(({ label, value }) => <Chip
    color="primary"
    size='small'
    label={`${label.toUpperCase()}: ${value}`}
    key={`${label}: ${value}`}
  />)}
</div>

ObservableDebugging.defaultProps = {
  items: [],
}
ObservableDebugging.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ObservableDebugging