import { InputAdornment, TextField, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FunctionsIcon from '@material-ui/icons/Functions';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import clsx from 'clsx';
import React, { cloneElement, useEffect, useRef, useState } from 'react';
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
  width,
  originalRows,
  noHightlight,
  align,
  suggestions,
  preHeaders,
  order,
  orderBy,
  icon,
  checked,
  onChange,
  noSort,
  noSearch,
  postHeaders,
  handleRequestSort,
  extraFilters,
  handleResetSort,
  handleSearchTerm = () => { },
  options: {ascArrow, descArrow, padding },
  onSelect,
  secondaryHeaders,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [searchString, setSearchString] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const divRef = useRef();
  // useEffect(() => {
  //   const currentElement = document.getElementById(`headerItem_${property}`)


  // }, [])

  const updateSearchString = ({ term }) => {
    setSearchString(term)
    handleSearchTerm({ key: property, term: term, isRegex, isCaseSensitive })}

  const appendToSearchString = ({ term }) => {
    const searchTerm = [searchString ? searchString : undefined, term].filter(e => !!e).join('|')
    setSearchString(searchTerm)
    handleSearchTerm({ key: property, term: searchTerm, isRegex, isCaseSensitive })}

  const renderPopover = () => <TextField
    autoFocus
    fullWidth
    value={searchString}
    InputProps={{
      startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
      endAdornment: <>
        <Tooltip title="Toggle case-sensitive aware search" arrow>
          <TextFieldsIcon
            style={{cursor: 'pointer'}}
            onClick={() => {
              setIsCaseSensitive(!isCaseSensitive)
              handleSearchTerm({ key: property, term: searchString, isRegex, isCaseSensitive: !isCaseSensitive })
            }}
            color={isCaseSensitive ? 'primary' : 'disabled'}
          />
        </Tooltip>

        <Tooltip title="Toggle regex aware search" arrow>
          <FunctionsIcon
            style={{cursor: 'pointer'}}
            onClick={() => {
              setIsRegex(!isRegex)
              handleSearchTerm({ key: property, term: searchString, isRegex: !isRegex, isCaseSensitive })
            }}
            color={isRegex ? 'primary' : 'disabled'}
          />
        </Tooltip>
      </>,
    }}
    onChange={(e) => updateSearchString({ term: e.target.value })}
    id="outlined-basic" label="Search" variant="outlined"/>

  const renderPopoverExtras = () => !!suggestions
    ? <>{suggestions(checked ? rows : originalRows).map(suggestion =>
      <div
        className={clsx([
          classes.customChip, (isRegex
            ? searchString.includes(`${suggestion}`)
            : searchString === suggestion)
          && classes.activeChip])}
        onClick={() => {
          return suggestion === searchString
            ? updateSearchString({ term: '' })
            : isRegex
              ? appendToSearchString({ term: suggestion })
              : updateSearchString({ term: suggestion })}
        }
        key={suggestion}
      >
        {suggestion === searchString
          ? <RemoveCircleOutlineIcon className={classes.smallChipIcon} />
          : isRegex
            ? <>
              {searchString.includes(suggestion)
                ? <RemoveCircleOutlineIcon className={classes.smallChipIcon} />
                : <AddCircleOutlineIcon className={classes.smallChipIcon} />}
            </>
            : <SearchIcon className={classes.smallChipIcon} />
        }
        <Typography variant="caption">{suggestion}</Typography>
    </div>)}</>
    : <></>


  const evaluateOrderBy = ({ property, label }) => orderBy === (property || label?.toLowerCase())
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
    </div>}
  const renderAdditionalHeader = (headers) => <div className={classes.secondaryHeaders}>
      {headers.map(({ label, property, noSort, icon }) =>
        renderMainHeader({ noSort, property, label, icon }))
      }</div>
  const renderMainHeader = ({noSort, property, label, icon, align}) => <div
    key={`${property}_${label}_${align}`}
    className={classes.flexbox}
    onClick={() => !noSort && handleRequestSort(property || label.toLowerCase())}
    onDoubleClick={() => !noSort && handleResetSort()}
    style={{
      flexWrap: 'nowrap',
      cursor: noSort ? 'default' : 'pointer',
      justifyContent: align ? 'flex-end' : 'flex-start',
      flexDirection: align === 'right' ? 'row-reverse' : 'row',
    }}>
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
    {!noSort && renderArrows({property, label, align})}</div>


  return <div
    ref={divRef}
    id={`headerItem_${property}`}
    onMouseEnter={() => !noHightlight && onSelect(property)}
    className={classes.headersWrapper}
    style={{
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      gap: '8px',
      justifyContent: 'space-between',
      overflow: 'hidden',
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
    <div id={`headerItemFilters_${property}`} style={{
      display: 'flex',
      gap: '4px',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: align !== 'flex-end' ? 'flex-end' : 'flex-start',
      flexDirection: !align ? 'row' : 'row-reverse'
    }}>
        {!noSearch && <ObservableHeaderFilter {...{ checked, onChange, property }}
          key={`${property}_searchString`}
          tooltip={`Search in column: ${label}${searchString.length > 0 ? ` | Search string: ${searchString}` : ''}`}
        label={searchString}
          title="Search in column"
          popover={<>{renderPopover()}</>}
          divRef={divRef}
          toolbarItems={searchString.length > 0 && <InputAdornment onClick={() => updateSearchString({ term: '' })} position="end"><DeleteOutlineIcon style={{cursor: 'pointer'}} /></InputAdornment>}
          popoverExtras={<>{renderPopoverExtras()}</>}
          onDelete={searchString !== '' ? () => {
            handleSearchTerm({ key: property, term: null })
            setSearchString('')
          } : undefined}
          icon={<SearchIcon />}
          extraIcons={<>
            {isCaseSensitive && <TextFieldsIcon color="action" style={{ fontSize: '12px' }} />}
            {isRegex && <FunctionsIcon color="action" style={{ fontSize: '12px' }} />}
          </>}
        />}

        {extraFilters?.map(extraFilter => <ObservableHeaderFilter {...{ checked, onChange, property }}
          key={`${extraFilter.label}_${property}_extraFilter`}
          label={extraFilter.label}
          title={extraFilter.label}
          width={'400px'}
          tooltip={extraFilter.tooltip}
          popover={extraFilter.node(rows)}
          divRef={divRef}
          icon={extraFilter.icon}
        />)}
    </div>
  </div>
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  customChip: {
    display: 'flex',
    gap: '4px',
    cursor: 'pointer',
    alignItems: 'center',
    border: `1px dotted ${theme.palette.divider}`,
    padding: '2px 8px 2px 4px',
    borderRadius: theme.shape.borderRadius * 4,

    '&:hover': {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: `inset 0px 0px 0px 1px ${theme.palette.divider}`,
    }
  },
  activeChip: {
    backgroundColor: theme.palette.action.selected,
  },
  smallChipIcon: {
    fontSize: '16px',
    color: theme.palette.text.hint,
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
  truncate: {
    minWidth: '35px',
    maxWidth: '65px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  headersSelectable: {
  },
  headersWrapper: {
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