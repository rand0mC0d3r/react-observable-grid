import { Checkbox, Chip, Popover, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';

const defaultOptions = {
  ascArrow: '▲',
  descArrow: '▼',
  padding: '10px 20px',
}

const ObservableHeaderItem = ({
  property,
  label,
  noHightlight,
  align,
  preHeaders,
  order,
  orderBy,
  icon,
  noSort,
  noSearch,
  postHeaders,
  handleRequestSort,
  selected,
  handleResetSort,
  extension,
  options: {ascArrow, descArrow, padding },
  onSelect,
  secondaryHeaders,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchString, setSearchString] = useState('');
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };
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
      <div style={{ padding: '12px 16px'}}>
        <TextField value={searchString} onChange={(e) => setSearchString(e.target.value)} id="outlined-basic" label="Search" variant="outlined" />
      </div>
    </Popover>}
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
    <div
    onMouseEnter={() => !noHightlight && onSelect(property)}
    className={classes.headersWrapper}
    style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
      flexDirection: align === 'flex-end' ? 'row-reverse' : 'row',
  }}>
    <div
      key={`${label}_${property}`}
      id="Header-header"
      className={`${classes.headers} ${!noHightlight ? classes.headersSelectable : ''}`}
      style={{
        alignItems: align ? 'flex-end' : 'flex-start',
    }}>
      <div className={`${classes.flexbox} ${classes.maxiFlexbox}`}>
        {preHeaders && <>{renderAdditionalHeader(preHeaders)}</>}
        {renderMainHeader({ noSort, property, label, icon, align })}
        {postHeaders && <>{renderAdditionalHeader(postHeaders)}</>}
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
          {!noSort && renderArrows({property, label, align, secondary: true})}
        </div>)}
      </div>}
    </div>
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap', alignItems: 'center'}}>
        {extension && extension}
        {searchString.length > 0 && <Chip label={searchString} size="small" variant="outlined" onDelete={() => setSearchString('')} />}
        {selected && !noSearch && <Tooltip arrow title="Search in column"><SearchIcon
          onClick={(e) => { handleClick(e) }}
          color="disabled"
          style={{
            cursor: 'pointer',
            fontSize: '16px',
          }} /></Tooltip>}
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


export default ObservableHeaderItem