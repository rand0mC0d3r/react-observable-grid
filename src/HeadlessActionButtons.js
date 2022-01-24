import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import DataProvider from './GridStore';

const HeadlessActionButtons = ({ children }) => {
  const { facts } = useContext(DataProvider)
  const { total, filtered, selectedIndex} = facts

  const focusElement = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const goToTop = () => focusElement('first')
  const goToSelectedIndex = () => focusElement('selected')

  return <>{children({ total, filtered, selectedIndex, goToTop, goToSelectedIndex })}</>
}

HeadlessActionButtons.propTypes = { children: PropTypes.func.isRequired }

export default HeadlessActionButtons