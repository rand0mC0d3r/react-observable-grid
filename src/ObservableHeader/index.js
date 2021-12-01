import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
  },
  header: {
    display: 'grid',
    padding: '0px 12px',
    fontSize: '12px',
    minHeight: '50px',
    alignItems: 'center',
    gridColumnGap: '16px',
    gridRowGap: '16px',

    borderBottom: `1px solid ${theme.palette.augmentColor({ main: theme.palette.primary.main }).light}`,
    backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.primary.light }).light}`
  },
  flexbox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '0px'
  }
}))

const ObservableHeader = ({ headers, gridSpacing, order, orderBy, handleRequestSort }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label.toLowerCase())

  return <div className={classes.wrapper}>
    <div className={classes.header} style={{ gridTemplateColumns: gridSpacing }}>
      {headers?.map(({ align, label, property, noSort }) => <div
          key={`${label}`}
          className={classes.flexbox}
          style={{
            justifyContent: align || 'flex-start'
          }}
        >
          <Typography
            title={!noSort ? 'Click to toggle sorting direction for column' : ''}
            onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
            variant='subtitle2'
            color={evaluateOrderBy({ property, label }) ? 'primary' : 'initial'}
            style={{
              cursor: noSort ? 'default' : 'pointer',
              fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
            }}
          >
            {label}
          </Typography>
          {evaluateOrderBy({ property, label }) &&
            (order === 'asc' ? <ArrowDownwardIcon color='primary' /> : <ArrowUpwardIcon color='primary' />)}
      </div>)}
    </div>
  </div>
}

ObservableHeader.propTypes = {
  headers: PropTypes.array.isRequired,
  gridSpacing: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
}

export default ObservableHeader