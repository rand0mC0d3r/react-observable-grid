import clsx from 'clsx';
import { createRef, Fragment, useContext, useEffect, useRef, useState } from 'react';
import GridObservable from '../GridObservable';
import DataProvider from '../GridStore';

const wrapperStyle = {
  flex: '1 0 auto',
  position: 'relative',
  alignSelf: 'stretch',
}

const scrollerStyle = {
  overflow: 'hidden scroll',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

export default ({ children, className, style, focusIndex, generateKey, selectedRow }) => {
  const { uniqueId, data, rowHeight, visibleIndexes, gridTemplateColumns, grid, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])
  const [minHeight, setMinHeight] = useState(100)
  const [lastFocusedItem, setLastFocusedItem] = useState(-1)
  const [_visibleIndexes, set_VisibleIndexes] = useState([])
  const [totalHeight, setTotalHeight] = useState('100px')
  const defaultMinHeight = 100

  return <>
    {JSON.stringify(_visibleIndexes)}
    {_visibleIndexes[0] > 0 && <div style={{ height: `${(defaultMinHeight * (_visibleIndexes[0] - 10))}px` }}></div>}
    {!!data?.length && data
      .filter((_, i) => i < (_visibleIndexes.slice(-1)[0] || 10) + 10)
      .map((dataItem, index) => <GridObservable
      index={index}
      id={`${uniqueId}.${index}`}
      defaultStyle={{
        minHeight: `${defaultMinHeight}px`,
      }}
      inViewClassName={clsx([
        `${uniqueId}-rows-grid`,
        (global?.alternatingRows?.stepping(index) ? global?.alternatingRows?.color : index % 2 === 0) && `${uniqueId}-row-alternating`,
        className])}
      key={Object.values(dataItem).map(di => JSON.stringify(di)).join('').replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, '')}
    >
      {grid.map(({ row, key }, index) => <Fragment key={`column.${row?.key || key}`}>
        {row?.component !== undefined
          ? typeof row.component === 'function' ? row?.component(dataItem, index) : row?.component
          : <div {...{ key }} className={`${uniqueId}-row-discovered`}>
            {JSON.stringify(jsonPathToValue(dataItem, key))}
          </div>}
      </Fragment>)}
      </GridObservable>)}
    {(data.length - _visibleIndexes.slice(-1)[0]) > 10 && <div style={{ height: `${(defaultMinHeight * (data.length - _visibleIndexes.slice(-1)[0] - 10))}px` }}></div>}
  </>

}
