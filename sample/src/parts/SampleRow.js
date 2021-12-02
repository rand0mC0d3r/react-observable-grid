import { Typography } from '@material-ui/core';

const SampleRow = ({ inView = false, setSelected = () => { }, row: { name, description, price }}) => <>
    {inView && <>
      <Typography style={{cursor: 'pointer'}} onClick={setSelected} variant='h6'>{name}</Typography>
      <Typography variant='body2'>{description}</Typography>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant='subtitle2'>{price}</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        button
      </div>
    </>}
</>

export default SampleRow;