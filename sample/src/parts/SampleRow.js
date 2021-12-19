import { Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';

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

const TilesRow = ({ row: { tiles } }) => {
  const theme = useTheme()
  const classes = tileStyles(theme)
  return <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 8px', padding: '4px 0px' }}>
    {tiles.map(({ name }) => <div className={classes.tile} key={name}>{name}</div>)}
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
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: '0px 0px 0px 0.5px rgba(0,0,0,0.5)',
    borderRadius: '12px',
    padding: '4px 8px',
  },
}))

export { ActionsRow, CurrencyRow, TilesRow, DescriptionRow, NamesRow };