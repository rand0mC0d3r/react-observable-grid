import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
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
    gap: '2px'
  },
  secondaryHeaders: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px'
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    gap: '4px'
  },

  flipped: {
    transform: 'rotate(180deg)'
  }

}))

const ObservableHeader = ({ headers, order, orderBy, handleRequestSort, handleResetSort, rowOptions }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label.toLowerCase())

  return <div className={classes.wrapper}>
    <div className={classes.header}
      style={{
        gridTemplateColumns: rowOptions.template,
        padding: rowOptions.padding,
      }}
    >
      {headers?.map(({ align, label, property, secondaryHeaders, additionalHeaders, noSort }) =>
        <div
          className={classes.headers}
          style={{
              alignItems: align ? 'flex-end' : 'flex-start',
            }}>
        <div
          key={`${label}`}
          className={classes.flexbox}
          onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
          onDoubleClick={() => !noSort && handleResetSort()}
          style={{
              cursor: noSort ? 'default' : 'pointer',
              justifyContent: align ? 'flex-end' : 'flex-start',
              flexDirection: align === 'right' ? 'row-reverse' : 'row',
            }}
        >
          <Typography
            title={!noSort ? 'Click to toggle sorting direction for column' : ''}
            variant='subtitle2'
            style={{
              lineHeight: '16px',
              userSelect: 'none',
              fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
            }}
          >
            {label}
          </Typography>
        {evaluateOrderBy({ property, label }) && <ArrowDropDownIcon
          className={order === 'asc' ? classes.flipped : null}
          style={{ fontSize: 16 }}
          />}

        </div>
        {secondaryHeaders && <div className={classes.secondaryHeaders}>
            {secondaryHeaders.map(({ label, property, noSort }) => <div
              className={classes.flexbox}
              style={{
                cursor: noSort ? 'default' : 'pointer',
              }}
              key={`${label}_subHeader`}
            >
              <Typography
                variant='caption'
                style={{
                  lineHeight: '1.5',
                  userSelect: 'none',
                  fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
                }}
                onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
                onDoubleClick={() => !noSort && handleResetSort()}
                color="textSecondary">
                {label}
              </Typography>
              {evaluateOrderBy({ label, property }) && <ArrowDropDownIcon
                color="action"
                className={order === 'asc' ? classes.flipped : null}
                style={{ fontSize: 12 }}
              />}
            </div>)}
          </div>}
      </div>)}
    </div>
  </div>
}

ObservableHeader.propTypes = {
  headers: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleResetSort: PropTypes.func.isRequired,
  rowOptions: PropTypes.object
}

export default ObservableHeader