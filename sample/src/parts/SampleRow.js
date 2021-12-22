import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';
import { ObservableGrid } from 'react-observable-grid';

const NamesRow = ({
  row: { name, surname, nickname, streetname } }) => {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Typography
      style={{ cursor: 'pointer' }}
      variant='subtitle2'>
      {name} {surname}
    </Typography>
    <Typography
      style={{ cursor: 'pointer' }}
      variant='caption'
      color="textSecondary"
    >
      {nickname} {streetname}
    </Typography>
  </div>
}

const DescriptionRow = ({ row: { description } }) => {
  return <Typography variant='body2'>{description}</Typography>
}

const TilesRow = ({ row: { tiles }, selectedTiles, onSelectTile = () => {} }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  return <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 8px', padding: '4px 0px' }}>
    {tiles.map(({ id, name }) => <div
      onClick={() => onSelectTile(id)}
      className={[classes.tile, selectedTiles.some(st => st === id) && classes.selectedTile].join(' ')}
      key={name}
    >{name}</div>)}
  </div>
}

const CurrencyRow = ({ row: { price, currency } }) => {
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
    flexWrap: 'wrap',
    opacity: '0.3',
    filter: 'grayscale(70%)',
    '&:hover': {
      opacity: '1',
      filter: 'grayscale(0%)',
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

export { ActionsRow, CurrencyRow, TilesRow, DescriptionRow, NamesRow };