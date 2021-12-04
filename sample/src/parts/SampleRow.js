import { Button, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import TuneIcon from '@material-ui/icons/Tune';


const useStyles = makeStyles(theme => ({
  // wrapper: {
  //   '&:hover': {
  //     "& $actionContainer": {
  //       display: 'block',
  //     }
  //   }
  // },
  actionContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: "8px"
  }
}))


const SampleRow = ({
  inView = false,
  setSelected = () => { },
  row: { name, surname, description, price, currency, nickname, streetname } }) => {
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
      <Typography variant='body2'>tiles</Typography>
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