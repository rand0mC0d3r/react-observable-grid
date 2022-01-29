import { makeStyles } from '@material-ui/core/styles'
// import useIdleCallback from '@react-hook/idle-callback'
import throttle from 'lodash/throttle'
import React, { useCallback, useContext } from 'react'
import DataProvider from './GridStore'
import ObservableRow from './ObservableRow'

const ObservableRowList = ({
  rowOptions,
  pageSize = 25,
  minRows = 25,
  canvasDrawing = false,
  isGrid = false,
  // setSelectedIndex,
  isSelectable = true,
  isScrollable = true,
}) => {
  const classes = useStyles()
  const useThrottled = (callback, delay) => (useCallback(throttle((...args) => callback(...args), delay), [delay]))
  const throttledLoadMore = useThrottled((index) => {
    setCurrentRow(index)
    // console.log("tiggered throttle")
  }, 2500)

  const {
    currentRow, setCurrentRow,
    setSelectedIndex, selectedIndex,
    startEnd, throttling,
    innerRows, gridTemplateColumns,
    innerHeaders
  } = useContext(DataProvider)


  const idValue = (index) => {
    let result = null
    if (index === 0) { result = 'first'
    } else if (index === selectedIndex) { result = 'selected' }
    return result
  }

  return (innerRows || [])
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
          gridTemplateColumns,
          backgroundColor: (isSelectable && !isGrid && selectedIndex === row.__origIndex)
            ? '#44444422'
            : '',
        }}
        className={`${isGrid ? classes.observableGrid : classes.observableRow} ${(isSelectable && selectedIndex === row.__origIndex) ? 'Row-isSelected' : ''}`}
        index={row.__index}
        onMouseEnter={() => throttledLoadMore(row.__index)}
        forceRender={!throttling}
        isRelevant={throttling
          ? row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))
          : true
        }
        onClick={() => isSelectable && !isGrid && setSelectedIndex(selectedIndex === row.__origIndex ? null : row.__origIndex)}
      >
        {innerHeaders.filter(ih => ih.visible).map(header =>
          <React.Fragment key={`${header.property}_${header.label}_${header.tooltip}_${header.width}`}>
            {row.__index === currentRow && header.onHover ? header.onHover(row) : header.row(row)}
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