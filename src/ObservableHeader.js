import { Checkbox, Popover, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RoomIcon from '@material-ui/icons/Room';
import SearchIcon from '@material-ui/icons/Search';
import SpaceBarIcon from '@material-ui/icons/SpaceBar';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import { ObservableHeaderItem } from '.';

const defaultOptions = {
  ascArrow: '▲',
  descArrow: '▼',
  padding: '10px 20px',
}

const ObservableHeader = ({
  gridTemplateColumns,
  progress,
  headers = [],
  setHeaders,
  options: { ascArrow, descArrow, padding },
  options,
  order,
  onSelect = () => { },
  onDeSelect = () => { },
  orderBy,
  handleSearchTerm,
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
    setHeaders(() => headers.map(header => {
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
      transform: 'scaleY(0.5) scaleX(0.85)',
      order: align === 'flex-end' ? -1 : 1,
      fontSize: '13px',
      opacity: secondary ? 0.75 : 1,
    }}>
      {(ascArrow === undefined && descArrow === undefined)
        ? order === 'asc' ? defaultOptions.ascArrow : defaultOptions.descArrow
        : cloneElement(<>{order === 'asc' ? ascArrow : descArrow}</>)
      }
    </div>
  }
  const renderAdditionalHeader = (headers) => <div className={classes.secondaryHeaders}>
      {headers.map(({ label, property, noSort, icon }) =>
        renderMainHeader({ noSort, property, label, icon }))
      }
  </div>
  const renderMainHeader = ({noSort, property, label, icon, align}) => <div
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
    {icon && cloneElement(icon, {
      style: { fontSize: 16 },
      color: evaluateOrderBy({ property, label }) ? 'primary' : 'action'
    })}
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
    {!noSort && renderArrows({property, label, align})}
  </div>

  return <>
    {renderPopover()}
    <div id="Header-root" className={classes.root}>
      <div
        id="Header-wrapper"
        onContextMenu={(e) => { e.preventDefault(); handleClick(e) }}
        className={classes.wrapper}
        style={{
          padding: padding || defaultOptions.padding,
          // paddingTop: '0px',
          // paddingBottom: '0px',
          gridTemplateColumns: gridTemplateColumns}}
      >
        {headers?.filter(header => header.visible).map(({
          noHightlight, align, label, noSearch, icon, property, extension,
          secondaryHeaders, preHeaders, selected, postHeaders, noSort
        }) => <ObservableHeaderItem key={`${label}_${property}`} {...{
          noSearch, property, handleRequestSort,
          onSelect, selected, extension, secondaryHeaders, handleSearchTerm,
          order, options, orderBy, handleResetSort,
          preHeaders, icon, postHeaders, noSort, label, noHightlight, align
        }} />)}
      </div>
      <div className={classes.progress} style={{ left: `${progress}%` }}><RoomIcon style={{fontSize: '11px'}} color={[0, 25, 50, 70, 100].some(v => v === progress) ? 'primary' : 'disabled'} /></div>
    </div>
  </>
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    flex: '0 0 auto'
  },
  progress: {
    position: 'absolute',
    top: '-9px',
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
    flexWrap: 'wrap',
    gap: '4px'
  },
  miniFlexbox: {
    gap: '2px',
  },
  maxiFlexbox: {
    gap: '4px 12px',
  },
  secondaryHeaders: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: '8px'
  },
  headersSelectable: {
    // backgroundColor: 'red',
  },
  headersWrapper: {
    // '&:hover': {
      // backgroundColor: 'rgba(0,0,0,0.1)',
    // },
  },
  headers: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    position: 'relative',
    alignSelf: 'stretch',
    gap: theme.spacing(1),

    margin: '0px -4px',
    padding: '0px 4px',
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',


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