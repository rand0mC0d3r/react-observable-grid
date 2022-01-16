import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const Columns = ({ gridTemplateColumns, rowOptions, innerHeaders }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

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
      .map(innerHeader => <div key={`${innerHeader.property}-${innerHeader.label || ''}`} className={classes.observableColumn} />)}
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
    zIndex: -1,
	},
	observableColumn: {
		margin: '0px -8px',
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