import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import throttle from 'lodash/throttle'
import React, { useCallback } from 'react'
import ObservableRow from './ObservableRow'
import ObservableSnapshot from './ObservableSnapshot'


const ObservableRowList = ({
  rows = [],
  rowOptions,
  pageSize = 25,
  startEnd,
  selectedIndex,
  minRows = 25,
  innerHeaders,
  canvasDrawing = false,
  gridTemplateColumns,
  isGrid = false,
  throttling,
  setSelectedIndex,
  setCurrentRow,
  currentRow,
  isSelectable = true,
  isScrollable = true,
}) => {
  const classes = useStyles()
  const useThrottled = (callback, delay) => (useCallback(throttle((...args) => callback(...args), delay), [delay]))
  const throttledLoadMore = useThrottled((index) => setCurrentRow(index), 1500)

  const idValue = (index) => {
    let result = null
    if (index === 0) { result = 'first'
    } else if (index === selectedIndex) { result = 'selected' }
    return result
  }

  const renderRow = (row, currentRow, header) => {
    return row.__index === currentRow && header.onHover
      ? header.onHover(row)
      : header.row
        ? header.row(row)
        : <Typography
            style={{ wordBreak: 'break-all' }}
            variant="subtitle2"
            color="textPrimary"
          >
            {typeof row[header.property] === 'string' ? row[header.property] : JSON.stringify(row[header.property])}
          </Typography>
  }

  return (rows || [])
      .filter(row => throttling
        ? row.__index <= (selectedIndex === null
          ? (startEnd.end * pageSize)
          : Math.max(selectedIndex, startEnd.end * pageSize))
        : true)
      .map(row => <ObservableRow
        {...{ minRows, rowOptions, isScrollable }}
        key={row.__index}
        id={idValue(row.__index)}
        style={{
          padding: rowOptions.padding,
          gridTemplateColumns,
          backgroundColor: (isSelectable && !isGrid && selectedIndex === row.__origIndex)
            ? '#44444422'
            : '',
        }}
        className={`${isGrid ? classes.observableGrid : classes.observableRow} ${(isSelectable && selectedIndex === row.__origIndex) ? 'Row-isSelected' : ''}`}
        index={row.__index}
        onMouseEnter={() => {
          throttledLoadMore(row.__index)
        }}
        forceRender={!throttling}
        isRelevant={throttling
          ? row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))
          : true
        }
        onClick={() => isSelectable && !isGrid && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex)}
      >
        {innerHeaders.filter(header => header.visible).map(header =>
          <React.Fragment key={`${header.property}_${header.label}_${header.tooltip}_${header.width}`}>
            {(!throttling && canvasDrawing && header.canCanvas)
              ? <ObservableSnapshot origIndex={row.__origIndex} index={row.__index} id={`${row.__origIndex}_${header.property}_${header.label}`}>
                {renderRow(row, currentRow, header)}
              </ObservableSnapshot>
              : renderRow(row, currentRow, header)}
          </React.Fragment>)}
      </ObservableRow>)
}

const useStyles = makeStyles(() => ({
  observableRow: {
    alignSelf: 'stretch',
    breakInside: 'avoid',
    fontSize: '12px',
    alignItems: 'center',
    gridColumnGap: '16px',
    display: 'grid',
  },
  observableGrid: {
    breakInside: 'avoid',
    fontSize: '12px',
    gridColumnGap: '16px',
    display: 'grid',
  },
}))

export default ObservableRowList