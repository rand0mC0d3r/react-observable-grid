import { Tooltip } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'

const ProgressBar =  ({ selectedIndex, currentRow, count }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const focusElement = () => document.getElementById('selected')?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return <div className={classes.root}>
    <div className={classes.container}>
      <div className={classes.totalProgress} />
      <div className={classes.currentProgress} style={{ width: `${Math.round((currentRow + 1) * 100 / count)}%` }} />
      {selectedIndex && <Tooltip arrow title={`Scroll to row ${selectedIndex + 1} ...`}>
        <div onClick={focusElement} className={classes.selectionProgress} style={{ left: `${Math.round((selectedIndex + 1) * 100 / count)}%` }} />
      </Tooltip>}
    </div>
  </div>
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    height: '4px',
  },
  container: {
    position: 'relative'
  },
  selectionProgress: {
    position: 'absolute',
    borderRadius: '50% 50% 0 0',
    bottom: '0px',
    width: '8px',
    height: '6px',
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.background.default}`,
    borderTop: '0px none',
    borderBottom: '0px none',

    '&:hover': {
      boxShadow: `0px 0px 0px 10px ${theme.palette.primary.main}`,
    }
  },
  currentProgress: {
    position: 'absolute',
    borderRadius: '0px 8px 8px 0px',
    top: '0px',
    left: '0px',
    border: `1px solid ${theme.palette.background.default}`,
    backgroundColor: theme.palette.primary.light,
    width: '0px',
    height: '4px'
  },
  totalProgress: {
    width: '100%',
    backgroundColor: theme.palette.divider,
    height: '4px'
  },
}))

ProgressBar.propTypes = { selectedIndex: PropTypes.number, currentRow: PropTypes.number, count: PropTypes.number }

export default ProgressBar