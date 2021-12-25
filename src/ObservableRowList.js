import { makeStyles, useTheme } from '@material-ui/core/styles'
import React, { useState } from 'react'
import ObservableRow from './ObservableRow'
import ObservableSnapshot from './ObservableSnapshot'

const ObservableRowList =  ({
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
  isSelectable = true,
  isScrollable = true,
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [currentRow, setCurrentRow] = useState(null)

  const idValue = (index) => {
    let result = null
    result = index === 0 && 'first'
    result = index === selectedIndex && 'selected'
    return result || null
  }

  return <>
    {rows
      .filter(row => throttling
        ? row.__index <= (selectedIndex === null ? (startEnd.end * pageSize) : Math.max(selectedIndex, startEnd.end * pageSize))
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
        onMouseEnter={() => setCurrentRow(row.__index)}
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
                {row.__index === currentRow && header.onHover ? header.onHover(row) : header.row(row)}
              </ObservableSnapshot>
              : row.__index === currentRow && header.onHover ? header.onHover(row) : header.row(row)}
          </React.Fragment>)}
      </ObservableRow>)}
  </>
}

const useStyles = makeStyles((theme) => ({
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
  observableRowSelected: {
    backgroundColor: "#4442"
  },
  observableColumnRight: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // borderRight: `1px solid blue`,
  },
  observableColumnLeft: {
    // borderLeft: `1px solid ${theme.palette.divider}`,
    // borderLeft: `1px solid red`,
  },
  observableColumn: {
    margin: '0px -8px',
    // borderRight: `1px solid ${theme.palette.divider}`,

    '&:last-child': {
      borderRight: '0px none'
    },
  }
}))


export default ObservableRowList