import { Checkbox, Popover, Tooltip, Typography } from '@material-ui/core';
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
  options: {ascArrow, descArrow, padding },
  order,
  onSelect = () => { },
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
    className={classes.arrowColor}
    style={{
      transform: 'scaleY(0.75)',
      order: align ? -1 : 1,
      fontSize: '13px',
      opacity: secondary ? 0.75 : 1,
    }}>
      {(ascArrow === undefined && descArrow === undefined)
        ? order === 'asc' ? defaultOptions.ascArrow : defaultOptions.descArrow
        : cloneElement(<>{order === 'asc' ? ascArrow : descArrow}</>)
      }
    </div>}
  const renderMainHeader = ({tooltip, noSort, property, label, icon, align}) => {
    return <div
        key={`${property}_${label}_${align}`}
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
          color={evaluateOrderBy({ property, label }) ? 'primary' : 'textSecondary'}
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
      </div>}

  return <>
    {renderPopover()}
    <div id="Header-root" className={classes.root}>
      <div
        id="Header-wrapper"
        onContextMenu={(e) => { e.preventDefault(); handleClick(e) }}
        className={classes.wrapper}
        style={{
          padding: padding || defaultOptions.padding,
          paddingTop: '0px',
          paddingBottom: '0px',
          gridTemplateColumns: gridTemplateColumns}}
      >
        {headers?.filter(header => header.visible).map(({
          noHightlight, align, label,
          icon, tooltip, property,
          secondaryHeaders, additionalHeaders, noSort
        }) =>
          <div
            onDoubleClick={() => !noHightlight && onSelect(label)}
            key={`${label}`}
            id="Header-header"
            className={`${classes.headers} ${!noHightlight ? classes.headersSelectable : ''}`}
            style={{
              alignItems: align ? 'flex-end' : 'flex-start',
              margin: '0px -4px',
              padding: '0px 4px',
              alignSelf: 'center',
              height: '100%',
              justifyContent: 'center'
            }}>
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
                  color={evaluateOrderBy({ property, label }) ? 'primary' : 'textSecondary'}
                  style={{
                    flexOrder: 0,
                    lineHeight: '1.5',
                    userSelect: 'none',
                    fontWeight: evaluateOrderBy({property, label}) ? 'bold' : 'normal'
                  }}
                  onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
                  onDoubleClick={() => !noSort && handleResetSort()}
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
  root: {
    width: '100%',
  },
  wrapper: {
    display: 'grid',
    fontSize: '12px',
    minHeight: '56px',
    alignItems: 'stretch',
    gridColumnGap: '16px',
    gridRowGap: '16px',

    boxShadow: '0px 5px 3px -5px #00000029',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  arrowColor: {
    color: theme.palette.primary.main
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
  headersSelectable: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    alignSelf: 'stretch',
    gap: '4px',
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