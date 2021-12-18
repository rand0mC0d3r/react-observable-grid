import { Tooltip, Typography, Popover, Checkbox } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';

const defaultOptions = {
  ascArrow: '▲',
  descArrow: '▼',
  padding: '10px 20px',
}

const ObservableHeader = ({
  gridTemplateColumns,
  headers = [],
  setHeaders,
  options : {ascArrow, descArrow, padding },
  order,
  orderBy,
  handleRequestSort,
  handleResetSort,
  rowOptions
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };
  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label?.toLowerCase())
  const toggleHeader = (property, label) => {
    setHeaders(headers.map(header => {
      if (header.property === property) {
        return {
          ...header,
          visible: !header.visible
        }
      } else {
        return header
      }
    }))}
  const renderPopover = () => {
    return <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
        <div>
          {headers.map(header => <div key={`${header.property}_${header.label}`} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px'}}>
            <Checkbox color="primary" checked={header.visible} onChange={() => toggleHeader(header.property, header.label)}/>
            {header.icon}
            <Typography color="textSecondary">{header.label} (property: {header.property})</Typography>
          </div>)}
        </div>
    </Popover>}
  const renderArrows = ({property, label, align, secondary = false}) => {
    return evaluateOrderBy({ property, label }) && <div
    style={{
      transform: 'scaleY(0.75)',
      order: align ? -1 : 1,
      fontSize: '13px',
      opacity: secondary ? 0.5 : 1,
    }}>
      {(ascArrow || descArrow) === null
        ? order === 'asc' ? defaultOptions.ascArrow : defaultOptions.descArrow
        : cloneElement(<>{order === 'asc' ? ascArrow : descArrow}</>)
      }
    </div>}
  const renderMainHeader = ({tooltip, noSort, property, label, icon, align}) => {
    return <Tooltip
      key={`${property}_${label}_${align}_${tooltip}`} arrow
      placement="left"
      title={tooltip || (!noSort ? 'Click to toggle sorting direction for this column' : '')}
    >
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

        {renderArrows({property, label, align})}
      </div>
    </Tooltip>}

  return <>
    {renderPopover()}
    <div className={classes.wrapper}>
      <div
      onContextMenu={(e) => { e.preventDefault(); handleClick(e) }}
      className={classes.header}
      style={{
        padding: padding || defaultOptions.padding,
        gridTemplateColumns: gridTemplateColumns}}
      >
        {headers?.filter(header => header.visible).map(({ align, label, icon, tooltip, property, secondaryHeaders, additionalHeaders, noSort }) =>
          <div key={`${label}`} className={classes.headers} style={{ alignItems: align ? 'flex-end' : 'flex-start' }}>
            <div className={`${classes.flexbox} ${classes.maxiFlexbox}`}>
              {renderMainHeader({tooltip, noSort, property, label, icon, align})}
              {additionalHeaders && <div className={classes.secondaryHeaders}>
                {additionalHeaders.map(({ label, property, noSort, icon }) =>
                  renderMainHeader({tooltip, noSort, property, label, icon, align}))
                }
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
                  color="textSecondary"
                >
                  {label}
                </Typography>
                {renderArrows({property, label, align, secondary: true})}
              </div>)}
            </div>}
        </div>)}
      </div>
    </div>
  </>
}

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