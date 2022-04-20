/* eslint-disable import/no-anonymous-default-export */
import { faLink, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, TextField } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export default ({ processedGrid, setProcessedGrid }) => {

  const toggleVisibility = (key) => {
    setProcessedGrid(processedGrid.map(({ header, row}) => {
      if (header.key === key) {
        return {
          header: { ...header, visible: header.visible ? !header.visible : true },
          row: row
        }
      }
      return { header, row}
    }))
  }

  const swapWithPreviousIndex = (index) => {
    const newProcessedGrid = [...processedGrid]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index - 1, 0, removed)
    setProcessedGrid(newProcessedGrid)
  }

  const swapWithNextIndex = (index) => {
    const newProcessedGrid = [...processedGrid]
    const [removed] = newProcessedGrid.splice(index, 1)
    newProcessedGrid.splice(index + 1, 0, removed)
    setProcessedGrid(newProcessedGrid)
  }

  return <>
    {processedGrid.map(({ header, row }, index) => <Chip
      variant="outlined"
      size="small"
      label={<div style={{display: 'flex', gap: '8px', flexWrap: 'nowrap'}}>
        <div onClick={() => swapWithPreviousIndex(index)}>UP</div>
        <div onClick={() => swapWithNextIndex(index)}>DOWN</div>
        {index} . {header.key}
      </div>}
      key={header.key}
      onDelete={() => toggleVisibility(header.key)}
      deleteIcon={<>{header.visible === undefined ? <VisibilityIcon /> : (header.visible ? <VisibilityIcon /> : <VisibilityOffIcon />)}</>}
    />)}
  </>
}
