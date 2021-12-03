import PropTypes from 'prop-types'

/**
 * Adds a wrapper that allows to center the content of the component.
 * @param { children } The React Node to be rendered
 */
const ObservableDebugging = ({ children }) => <div style={{ flex: '1 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  {children}
</div>

ObservableDebugging.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ObservableDebugging