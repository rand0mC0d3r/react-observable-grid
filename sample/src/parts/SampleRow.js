import { Typography } from '@material-ui/core';

const SampleRow = ({
  inView = false,
  setSelected = () => { },
  row: { name, description, price, currency, nickname, streetname } }) => <>
    {inView && <>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <Typography
          style={{ cursor: 'pointer' }}
          onClick={setSelected}
          variant='subtitle2'>
          {name}
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px'}}>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        button
      </div>
    </>}
</>

export default SampleRow;