import { Avatar, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import { memo } from 'react';
import stringToColor from 'string-to-color';

const AvatarRow = memo(({ name, opacity = 1, surname, fullName, selectedAvatars, onSelectAvatar = () => { } }) => {
  const theme = useTheme()
  const classes = avatarStyles(theme)

  return <div style={{ display: 'flex', justifyContent: "center" }}>
    <Tooltip arrow title={fullName}>
      <Avatar
        onClick={() => onSelectAvatar({ fullName, name, surname })}
        variant="rounded"
        className={[classes.avatar, selectedAvatars?.length > 0 ? selectedAvatars?.some(sa => sa.fullName === fullName) && classes.selectedAvatar : ''].join(' ')}
        style={{
          fontSize: '16px',
          cursor: 'pointer',
          opacity: opacity,
          backgroundColor: stringToColor(fullName)
        }}
      >
      {name?.substr(0, 1)}{surname?.substr(0, 1)}
      </Avatar>
    </Tooltip>
  </div>
})

const NamesRow = ({ name, surname }) => {
  return <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography variant='body2' color="textSecondary">{name} {surname}</Typography>
    </div>
  </div>
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


const CurrencyRow = ({ row: { price} }) => <Typography style={{ display: 'flex', justifyContent: 'flex-end' }} variant='subtitle2'>{price}</Typography>
const DescriptionRow = memo(({ description }) => <Typography variant='body2'>{description}</Typography>)
const RoleRow = memo(({ role }) => <Typography variant='body2' color="textSecondary">{role}</Typography>)
const LastSeenRow = memo(({ lastSeen }) => <Typography style={{display: 'flex', justifyContent: 'flex-end'}} variant='caption' color="textSecondary">Last Seen: {lastSeen}</Typography>)

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

export { AvatarRow, ActionsRow, RowTabs, CurrencyRow, TilesRow, DescriptionRow, NamesRow, RoleRow, Card, LastSeenRow };
