import { Button, Chip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles(theme => ({
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: "8px",
    opacity: '0.3',
    filter: 'grayscale(70%)',
    '&:hover': {
      opacity: '1',
      filter: 'grayscale(0%)',
    }
  }
}))

const SampleRow = ({
  inView = false,
  setSelected = () => { },
  row: { name, surname, description, price, tiles, tilesHash, currency, nickname, streetname } }) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  return <>
    {inView && <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          style={{ cursor: 'pointer' }}
          onClick={setSelected}
          variant='subtitle2'>
          {name} {surname}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <Typography
            style={{ cursor: 'pointer' }}
            variant='caption'
            color="textSecondary"
          >
            {nickname}
          </Typography>
          <Typography
            style={{ cursor: 'pointer' }}
            variant='caption'
            color="textSecondary"
          >
            {streetname}
          </Typography>
        </div>
      </div>
      <Typography variant='body2'>{description}</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '8px 4px', padding: '4px 0px' }}>
        {tiles.map(({ name }) => <Chip variant="outlined" size="small" key={name} label={name} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant='subtitle2'>{price} {currency}</Typography>
      </div>
      <div className={classes.actionContainer}>
        <Button variant="outlined" size="small" color="primary"><TuneIcon /></Button>
        <Button variant="outlined" size="small" color="secondary"><DeleteOutlineIcon /></Button>
      </div>
    </>}
  </>
}

export default SampleRow;