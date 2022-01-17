import { makeStyles, useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Columns = ({ gridTemplateColumns, rowOptions, innerHeaders }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [indexSelected, setIndexSelected] = useState(null)

	return <div
		className={classes.root}
		style={{
			padding: rowOptions.padding,
			paddingTop: 0,
			paddingBottom: 0,
			gridTemplateColumns: gridTemplateColumns
		}}
  >
    {innerHeaders
      .filter(ih => ih.visible)
      .map((innerHeader, i) => <div
        key={`${innerHeader.property}-${innerHeader.label || ''}`}
        className={clsx([classes.column])}
        // onMouseEnter={() => indexSelected !== i && setIndexSelected(i)}
        // onTouchStart={() => indexSelected !== i && setIndexSelected(i)}
      />)}
	</div>
}

const useStyles = makeStyles(theme => ({
  root: {
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    position: 'absolute',
    alignSelf: 'stretch',
    breakInside: 'avoid',
    fontSize: '12px',
    display: 'grid',
    alignItems: 'unset',
    gap: '16px',
    pointerEvents: 'none',
  },
  // columnDisabled: {
  //   pointerEvents: 'none !important',
  //   boxShadow: `inset 0px 4px 0px 0px ${theme.palette.primary.main}66`,
  // },
	column: {
    margin: '0px -8px',
    // pointerEvents: 'all',
		borderRight: `1px solid ${theme.palette.divider}`,

    '&:last-child': {
      borderRight: '0px none'
    },
	},
}))

Columns.propTypes = {
  innerHeaders: PropTypes.array.isRequired,
  rowOptions: PropTypes.object,
  gridTemplateColumns: PropTypes.string.isRequired,
}

export default Columns