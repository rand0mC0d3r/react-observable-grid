import { Chip, InputAdornment, Popover, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FunctionsIcon from '@material-ui/icons/Functions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import PropTypes from 'prop-types';
import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import ObservableHeaderFilter from './ObservableHeaderFilter';

const defaultOptions = {
  ascArrow: '▲',
  descArrow: '▼',
  padding: '10px 20px',
}

const ObservableHeaderItem = ({
  property,
  label,
  rows,
  noHightlight,
  align,
  suggestions,
  preHeaders,
  order,
  orderBy,
  icon,
  noSort,
  noSearch,
  postHeaders,
  handleRequestSort,
  extraFilters,
  selected,
  handleResetSort,
  extension,
  handleSearchTerm = () => { },
  triggerReload,
  options: {ascArrow, descArrow, padding },
  onSelect,
  secondaryHeaders,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const updateSearchString = ({ term }) => {
    setSearchString(term)
    handleSearchTerm({ key: property, term: term, isRegex, isCaseSensitive })
  }

  const appendToSearchString = ({ term }) => {
    setSearchString(`${searchString}${term}`)
    handleSearchTerm({ key: property, term: `${searchString}${term}`, isRegex, isCaseSensitive })
  }

  const callbackExtraFilters = useCallback((func) => {
    return func(rows)
  }, [rows])

  const handleClick = (event) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };
  const renderPopover = () => {
    return <Popover
      id={id}
      open={open}
      elevation={1}
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
      <div style={{
        display: 'flex',
        gap: '8px',
        backgroundColor: theme.palette.background.paper,
        width: '350px',
        borderRadius: '4px',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <div style={{
          backgroundColor: theme.palette.background.default,
          padding: '16px 16px',
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}>
          <TextField
            autoFocus
            fullWidth
            value={searchString}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
              endAdornment: <>
                <TextFieldsIcon
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setIsCaseSensitive(!isCaseSensitive)
                    handleSearchTerm({ key: property, term: searchString, isRegex, isCaseSensitive: !isCaseSensitive })
                  }}
                  color={isCaseSensitive ? 'primary' : 'disabled'}
                />

                <FunctionsIcon
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                    setIsRegex(!isRegex)
                    handleSearchTerm({ key: property, term: searchString, isRegex: !isRegex, isCaseSensitive })
                  }}
                  color={isRegex ? 'primary' : 'disabled'}
                />
                {searchString.length > 0 && <InputAdornment onClick={() => updateSearchString({ term: '' })} position="end"><DeleteOutlineIcon style={{cursor: 'pointer'}} /></InputAdornment>}

              </>,
            }}
            onChange={(e) => updateSearchString({ term: e.target.value })}
            id="outlined-basic" label="Search" variant="outlined"
          />
        </div>
        {!!suggestions && <div style={{ display: 'flex', padding: '12px 16px', gap: '8px', flexWrap: 'wrap' }}>
          {suggestions(rows).map(suggestion => <Chip
            variant='outlined'
            onClick={() => isRegex
              ? appendToSearchString({ term: suggestion })
              : updateSearchString({ term: suggestion })}
            key={suggestion}
            label={suggestion}
          />)}
        </div>}
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
    {open && renderPopover()}
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
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap', alignItems: 'center', flexDirection: !align ? 'row' : 'row-reverse'}}>
        {!noSearch && (selected || searchString !== '') && <Tooltip arrow title={`Search in column: ${label}`}>
          <Chip
            onClick={(e) => { handleClick(e) }}
            icon={searchString !== '' ? <SearchIcon color="action" /> : undefined}
            label={(searchString.length > 6 ? `${searchString.substring(0,6)}...` : searchString) || <SearchIcon color="action" style={{ fontSize: '18px', marginTop: '3px' }} />}
            size="small"
            variant="outlined"
            onDelete={searchString !== '' ? () => {
              handleSearchTerm({ key: property, term: null })
              setSearchString('')
            } : undefined}
          />
        </Tooltip>}

        {rows.length > 0 && extraFilters?.map(extraFilter => <>
          <ObservableHeaderFilter
            key={extraFilter.label}
            label={extraFilter.label}
            variable={extraFilter.variable}
            popover={extraFilter.node(rows)}
            triggerReload={triggerReload}
            icon={extraFilter.icon} />
        </>)}
        {extension && extension}
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