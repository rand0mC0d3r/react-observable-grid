import { Avatar, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import stringToColor from 'string-to-color';

const AvatarRow = ({ row: { name, surname, fullName }, selectedAvatars, onSelectAvatar = () => { } }) => {
  const theme = useTheme()
  const classes = avatarStyles(theme)
  return <div style={{display:'flex', justifyContent: "center"}}><Avatar
    onClick={() => onSelectAvatar(fullName)}
    variant="rounded"
    className={[classes.avatar, selectedAvatars?.some(sa => sa === fullName) && classes.selectedAvatar].join(' ')}
    style={{
      fontSize: '16px',
      backgroundColor: stringToColor(fullName)
  }}>
    {name?.substr(0, 1)}{surname?.substr(0, 1)}
  </Avatar>
  </div>
}

const NamesRow = ({
  row: { name, surname, nickname, streetname } }) => {
  return <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Typography
        style={{ cursor: 'pointer' }}
        variant='subtitle2'>
        {name} {surname}
      </Typography>
    </div>
  </div>
}

const Card = ({ row, selectedTiles, onSelectTile = () => {} }) => {
  return <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      border: '1px solid #CCC',
      padding: '8px 12px',
      borderRadius: '8px'
    }}>
    <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
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

const DescriptionRow = ({ row: { description } }) => {
  const theme = useTheme()
  const classes = descriptionStyles(theme)
  return <Typography className={classes.description} style={{userSelect: 'text'}} variant='body2'>{description}</Typography>
}

const TilesRow = ({ row: { tiles }, selectedTiles, onSelectTile = () => {} }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  return <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 8px', padding: '4px 0px' }}>
    {tiles.map(({ id, name }) => <div
      onClick={() => onSelectTile(id)}
      className={[classes.tile, selectedTiles?.some(st => st === id) && classes.selectedTile].join(' ')}
      key={name}
    >{name}</div>)}
  </div>
}

const CurrencyRow = ({ row: { price, currency } }) => {
  // console.log(price)
  return <Typography style={{ display: 'flex', justifyContent: 'flex-end' }} variant='subtitle2'>{price} {currency}</Typography>
}

const ActionsRow = () => {
  const theme = useTheme()
  const classes = actionStyles(theme)
  return <div className={classes.actionContainer}>
    <TuneIcon color="primary" />
    <DeleteOutlineIcon color="secondary" />
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

const descriptionStyles = makeStyles(() => ({
  description: {
    '&::selection': {
      background: '#d4ebffad',
      color: 'black'
    }
  },
}))

const tileStyles = makeStyles((theme) => ({
  tile: {
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '12px',
    padding: '4px 8px',
    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
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

export { AvatarRow, ActionsRow, CurrencyRow, TilesRow, DescriptionRow, NamesRow, Card };
