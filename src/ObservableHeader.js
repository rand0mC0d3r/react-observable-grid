import { Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';

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
  miniFlexbox: {
    gap: '2px',
  },
  maxiFlexbox: {
    gap: '8px',
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

const ObservableHeader = ({
  gridTemplateColumns,
  headers,
  order,
  orderBy,
  handleRequestSort,
  handleResetSort,
  rowOptions
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label?.toLowerCase())

  const renderMainHeader = ({tooltip, noSort, property, label, icon, align}) => {
    return <Tooltip key={`${property}_${label}_${align}_${tooltip}`} arrow placement="left" title={tooltip || (!noSort ? 'Click to toggle sorting direction for column' : '')}>
      <div
        className={classes.flexbox}
        onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
        onDoubleClick={() => !noSort && handleResetSort()}
        style={{
          cursor: noSort ? 'default' : 'pointer',
          justifyContent: align ? 'flex-end' : 'flex-start',
          flexDirection: align === 'right' ? 'row-reverse' : 'row',
        }}
      >
        {icon && cloneElement(icon, { style: { fontSize: 16 } })}
        <Typography
          variant='subtitle2'
          style={{
            lineHeight: '16px',
            flexOrder: 0,
            userSelect: 'none',
            fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
          }}
        >
          {label}
        </Typography>
        {evaluateOrderBy({ property, label }) && <ArrowDropDownIcon
          className={order === 'asc' ? classes.flipped : null}
            style={{
              fontSize: 16,
              order: align ? -1 : 1,
            }}
        />}
      </div>
    </Tooltip>
  }

  return <div className={classes.wrapper}>
    <div className={classes.header} style={{ padding: rowOptions.padding, gridTemplateColumns: gridTemplateColumns}}>
      {headers?.map(({ align, label, icon, tooltip, property, secondaryHeaders, additionalHeaders, noSort }) =>
        <div key={`${label}`} className={classes.headers} style={{ alignItems: align ? 'flex-end' : 'flex-start' }}>

          <div className={`${classes.flexbox} ${classes.maxiFlexbox}`}>
            {renderMainHeader({tooltip, noSort, property, label, icon, align})}
            {additionalHeaders && <div className={classes.secondaryHeaders}>
              {additionalHeaders.map(({ label, property, noSort, icon }) => renderMainHeader({tooltip, noSort, property, label, icon, align}))}
            </div>}
          </div>
        {secondaryHeaders && <div className={classes.secondaryHeaders}>
            {secondaryHeaders.map(({ label, property, noSort }) => <div
              className={`${classes.flexbox} ${classes.miniFlexbox}`}
              style={{ cursor: noSort ? 'default' : 'pointer', }}
              key={`${label}_subHeader`}
            >
              <Typography
                variant='caption'
                style={{
                  flexOrder: 0,
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
                style={{ fontSize: 12, order: align ? -1 : 1, }}
              />}
            </div>)}
          </div>}
      </div>)}
    </div>
  </div>
}

ObservableHeader.propTypes = {
  gridTemplateColumns: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleResetSort: PropTypes.func.isRequired,
  rowOptions: PropTypes.object
}

export default ObservableHeader