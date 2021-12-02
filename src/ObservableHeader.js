import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
  },
  header: {
    display: 'grid',
    fontSize: '12px',
    minHeight: '50px',
    alignItems: 'center',
    gridColumnGap: '16px',
    gridRowGap: '16px',

    boxShadow: '0px 0px 1px 0px rgba(0,0,0,0.2)',
    borderBottom: `2px solid ${theme.palette.divider}`,
  },
  flexbox: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '4px'
  },
  flipped: {
    transform: 'rotate(180deg)'
  }
}))

const ObservableHeader = ({ headers, gridSpacing, order, orderBy, handleRequestSort, handleResetSort, rowOptions }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label.toLowerCase())

  return <div className={classes.wrapper}>
    <div
      className={classes.header}
      style={{
        gridTemplateColumns: gridSpacing,
        padding: rowOptions.padding,
      }}
    >
      {headers?.map(({ align, label, property, noSort }) => <div
          key={`${label}`}
          className={classes.flexbox}
          onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
          onDoubleClick={() => !noSort && handleResetSort()}
          style={{
              cursor: noSort ? 'default' : 'pointer',
              justifyContent: align || 'flex-start'
            }}
        >
          <Typography
            title={!noSort ? 'Click to toggle sorting direction for column' : ''}
            variant='subtitle2'
            color={evaluateOrderBy({ property, label }) ? 'primary' : 'initial'}
            style={{
              lineHeight: '1',
              fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
            }}
          >
            {label}
          </Typography>
        {evaluateOrderBy({ property, label }) && <ArrowDropDownCircleOutlinedIcon
          className={order === 'asc' ? classes.flipped : null}
          style={{ fontSize: 18 }}
          color='primary' />}
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
  handleResetSort: PropTypes.func.isRequired,
  rowOptions: PropTypes.object
}

export default ObservableHeader