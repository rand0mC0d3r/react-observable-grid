import { Avatar, Chip, CircularProgress, Fade, Popper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import { memo, useState } from 'react';
import stringToColor from 'string-to-color';

export const searchString = (string, query) => {
  const queryParts = query.split(' ')
  let stringTmp = `${string}`
  const parts = []
  queryParts
    .reduce((acc, curr) => {
      acc = acc.toLowerCase().replaceAll(curr, `###${curr}###`)
      return acc
    }, string || '')
    .split('###')
    .filter((part) => part.length > 0)
    .forEach((part, index) => {
      const which = queryParts.find(qp => part.includes(qp))
      if (which) {
        parts.push({ type: 'highlight', id: `${part}-${index}`, string: `${stringTmp.substring(0, which.length)}` })
      } else {
        parts.push({ type: 'string', id: `${query}-${index}`, string: `${stringTmp.substring(0, part.length)}` })
      }
      stringTmp = stringTmp.length !== part.length ? stringTmp.substring(part.length) : stringTmp
    })
  return parts
}

const AvatarRow = memo(({ name, surname }) => <div style={{ display: 'flex', justifyContent: "center" }}>
    <Tooltip arrow title={`${name} ${surname}`}>
      <Avatar
        variant="rounded"
        style={{
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: stringToColor(`${name} ${surname}`)
        }}
      >
      {name?.substr(0, 1)}{surname?.substr(0, 1)}
      </Avatar>
    </Tooltip>
  </div>
)

const MetadataColumn = memo(({ value, searchTerm }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.focusNode.data.substring(selection.anchorOffset, selection.focusOffset)
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      handleClose();
      return;
    }

    fetch(`https://api.npms.io/v2/search/suggestions?q=${selectedText}&size=25`)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data)
      });
    const getBoundingClientRect = () => selection.getRangeAt(0).getBoundingClientRect();

    setOpen(true);
    setSelectedText(selectedText)
    setAnchorEl({
      clientWidth: getBoundingClientRect().width,
      clientHeight: getBoundingClientRect().height,
      getBoundingClientRect,
    });
  };


  return <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap' }}>
    {searchString(value, searchTerm).map(({ type, id, string }) => <div onMouseLeave={handleClose}>
      {type === 'string' && <Typography onMouseUp={handleMouseUp} key={id} variant='body2' color="textSecondary">{string}</Typography>}
      {type === 'highlight' && <Typography onMouseUp={handleMouseUp} style={{ borderBottom: '3px dashed #d6d600' }} key={id} variant='body2' color="textPrimary">{string}</Typography>}
      <Popper {...{ open, anchorEl }} placement="bottom-start">
        <div style={{width: '600px', display: 'flex', padding: '8px', gap: '8px', backgroundColor: '#FFF', flexDirection: "column"}}>
          <Typography>{selectedText}</Typography>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            {suggestions.map(suggestion => <Chip variant="outlined" size="small" label={suggestion.package.name} />)}
          </div>
        </div>
      </Popper>
    </div>)}
  </div>
})

const NamesRow = ({ name, surname }) => {
  return <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant='body2' color="textSecondary">{name} {surname}</Typography>
    </div>
  </div>
}

const CircularProgressBlock = ({ value, title, size = '30px' }) => {
  const computedValue = (parseFloat(value).toFixed(2) * 100).toFixed(0)
  return <Tooltip title={`${title}: ${value}`} arrow>
    <div style={{position: 'relative'}}>
      <CircularProgress
        color={computedValue < 50 ? 'secondary' :  'inherit'}
        style={{ width: size , height: size  }}
        variant="determinate"
        value={computedValue}
      />
      <Typography style={{
        fontSize: '9px',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '0px',
        height: size,
      }} variant='body2' color="textSecondary">{computedValue}%</Typography>
    </div>
  </Tooltip>
}

const TilesRow = ({ row: { tiles }, selectedTiles, onSelectTile = () => {} }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  return <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 8px', padding: '4px 0px' }}>
    {tiles.map(({ id, name, color }) => <div
      onClick={() => onSelectTile(id)}
      className={[classes.tile, selectedTiles?.some(st => st === id) && classes.selectedTile].join(' ')}
      style={{
        textDecoration: 'underline',
        textDecorationColor: color,
        textDecorationThickness: '2px',
        backgroundColor: selectedTiles?.some(st => st === id)
          ? `${color}`
          : ``
        ,
      }}
      key={name}
    >{name}</div>)}
  </div>
}


const CurrencyRow = ({ row: { price } }) => <Typography style={{ display: 'flex', justifyContent: 'flex-end' }} variant='subtitle2'>{price}</Typography>

const DescriptionRow = memo(({ description }) => <Typography variant='body2'>{description}</Typography>)
const RoleRow = memo(({ row: { role }}) => <Typography variant='body2' color="textSecondary">{role}</Typography>)
const LastSeenRow = memo(({ row: { lastSeen } }) => <Typography style={{display: 'flex', justifyContent: 'flex-end'}} variant='caption' color="textSecondary">Last Seen: {lastSeen}</Typography>)

const ActionsRow = memo(() => {
  const theme = useTheme()
  const classes = actionStyles(theme)
  return <div className={classes.actionContainer}>
    <TuneIcon color="primary" />
    <DeleteOutlineIcon color="secondary" />
  </div>
})


const RowTabs = ({ rows, setRows = () => { } }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  const tabs = [
    {
      label: 'All rows',
      description: 'No filtering',
    },
    {
      label: 'Seen last week',
      description: 'Last seen under a week ago',
    },
  ]

  return <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 8px'}}>
    {tabs.map(({ label, description }) => <div key={label}
      style={{
        border: '1px solid #b1b1b1',
        padding: '12px 16px',
        borderBottom: '0px none',
        display: 'flex',
        gap: '8px',
        flexDirection: 'column'
      }}>
      <Typography color="textPrimary" variant='subtitle1'>{label}</Typography>
      <Typography color="textSecondary" variant='caption'>{description}</Typography>
    </div>)}
    {/* {tiles.map(({ id, name, color }) => <div
      onClick={() => onSelectTile(id)}
      className={[classes.tile, selectedTiles?.some(st => st === id) && classes.selectedTile].join(' ')}
      style={{
        textDecoration: 'underline',
        textDecorationColor: color,
        textDecorationThickness: '2px',
        backgroundColor: selectedTiles?.some(st => st === id)
          ? `${color}`
          : ``
        ,
      }}
      key={name}
    >{name}</div>)} */}
  </div>
}


const Card = ({ row, selectedTiles, onSelectAvatar = () => { }, onSelectTile = () => {} }) => {
  return <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      border: '1px solid #CCC',
      padding: '8px 12px',
      borderRadius: '8px'
    }}>
    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
      <AvatarRow row={row} selectedAvatars={selectedTiles} onSelectAvatar={onSelectTile} />
      <NamesRow row={row} />
      <CurrencyRow row={row} />
    </div>
      <DescriptionRow row={row} />
    <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <TilesRow row={row} selectedTiles={selectedTiles} onSelectTile={onSelectTile}/>
      <ActionsRow />
    </div>

  </div>
}

const actionStyles = makeStyles(() => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: "8px",
    flexWrap: 'nowrap',
    opacity: '0.3',
    filter: 'grayscale(70%)',
    '&:hover': {
      opacity: '1',
      filter: 'grayscale(0%)',
    }
  },
}))

// const descriptionStyles = makeStyles(() => ({
//   description: {
//     '&::selection': {
//       background: '#c8e2f9e8',
//       color: 'black',
//     }
//   },
// }))

const tileStyles = makeStyles((theme) => ({
  tile: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '4px 8px',
    '&:hover': {
      background: `${theme.palette.divider}`,
    }
  },
  selectedTile: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  }
}))

const avatarStyles = makeStyles((theme) => ({
  avatar: {

  },
  selectedAvatar: {
    boxShadow: `inset 0px 0px 0px 0.75px #fff, 0px 0px 0px 3px ${theme.palette.primary.main}`,
  }
}))

export {
  AvatarRow, ActionsRow, CircularProgressBlock, RowTabs, CurrencyRow, TilesRow,
  MetadataColumn, DescriptionRow, NamesRow,
  RoleRow, Card, LastSeenRow
};
