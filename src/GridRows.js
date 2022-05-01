import clsx from 'clsx';
import { parse, stringify } from 'css';
import PropTypes, { string } from 'prop-types';
import { createRef, Fragment, useContext, useEffect, useRef, useState } from 'react';
import { useLayoutEffect } from 'react/cjs/react.development';
// import { useRef } from 'react/cjs/react.production.min';
import GridObservable from './GridObservable';
import DataProvider from './GridStore';

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

const GridRows = ({ children, className, style, generateKey, selectedRow }) => {
  const { uniqueId, data, rowHeight, gridTemplateColumns, grid, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])
  const [minHeight, setMinHeight] = useState(100)
  const [totalHeight, setTotalHeight] = useState('100px')
  const defaultMinHeight = 100

  const jsonPathToValue = (jsonData, path) => {
    if (!(jsonData instanceof Object) || typeof (path) === "undefined") {
      throw "Not valid argument:jsonData:" + jsonData + ", path:" + path;
    }
      path = path.replace(/\[(\w+)\]/g, '.$1');
      path = path.replace(/^\./, '');
      var pathArray = path.split('.');
      for (var i = 0, n = pathArray.length; i < n; ++i) {
        var key = pathArray[i];
        if (key in jsonData) {
          if (jsonData[key] !== null) {
            jsonData = jsonData[key];
          } else {
            return null;
          }
        } else {
          return key;
        }
      }
      return jsonData;
  }

  const componentTypeCheck = (component, key, index) => {
    if (component === null) {
      return <div key={key} style={{ margin: '0px', padding: '0px'}} id="auto-generated" />
    }
    if (!!component?.length) {
      return <div key={key} id={component.length} className="grid-row-inferred-array">
        {typeof component !== 'string' && component.length > 0 ? JSON.stringify(component) : component}
      </div>
    }
    if (!!!component?.$$typeof) {
      return <div key={key} className="grid-row-inferred-object">{JSON.stringify(component, null, 2)}</div>
    }
    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <div className='grid-row-inferred'>{component}</div>
      : <Fragment key={key}>{component}</Fragment>
  }

  useEffect(() => {
    if (grid) {
      setPresentColumns(grid?.filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
        .map(gridItem => ({
          component: gridItem?.row?.component !== undefined ? gridItem?.row?.component : gridItem.key,
          key: gridItem.key
        })))
    } else {
      if (!!data?.length) {
        setPresentColumns([...new Set(data.map(item => Object.keys(item).map(key => key)).flat())].sort().map((key, index) => ({ component: key, key })))
      }
    }
  }, [grid, data])

  const textMap = [
    { id: 'flex-start', text: 'left' },
    { id: 'flex-end', text: 'right' },
    { id: 'center', text: 'center' },
  ]

  const halfGap = () => {
    const gap = global?.style?.gap
    if (gap === undefined) {
      return '0px'
    } else {
      const gapValue = parseInt(gap.replace(/\D/g, ''))
      const gapUnit = gap.replace(/\d/g, '')
      return `${gapValue / 2}${gapUnit}`
    }
  }

  const classes = parse(`
    .${uniqueId}-row-discovered {
      word-break: break-word;
      white-space: pre-wrap;
      margin: 0px ${halfGap()} 0px 0px;
    }
    .${uniqueId}-row-scrollable {
      overflow: hidden scroll;
      position: absolute;
      width: 100%;
      height: 100%;
    },
    ${uniqueId}-row-scrollable::-webkit-scrollbar {
      display: none;
    },
    .grid-row-inferred {
      word-break: break-word;
      white-space: pre-wrap;
    }
    .grid-row-inferred-array {
      word-break: break-word;
      white-space: pre-wrap;
    }
    .grid-row-inferred-object {
      word-break: break-word;
      white-space: pre-wrap;
    }
    .${uniqueId}-rows-grid {
      display: grid;
      z-index: 1;
      align-items: center;
    }
    ${(grid || [])
      .filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
      .map((gridItem, index) => !gridItem?.header?.noColumn
      ? `
        .${uniqueId}-rows-grid > *:nth-child(${index + 1}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          padding: ${global?.style?.rowPadding.split(" ")[0]} ${(global?.style?.gap || '0px')};
          margin: 0px 0px 0px -${(global?.style?.gap || '0px')};
          justify-content: ${gridItem?.header?.align || 'flex-start'};
          justify-items: ${gridItem?.header?.align || 'flex-start'};
          align-items: ${gridItem?.header?.align || 'flex-start'};
          ${gridItem?.row?.noWrapper ? `text-align: ${(textMap.find(tm => tm.id === gridItem?.header?.align || '') || []).text}` : ''}
        }
    ` : `
        .${uniqueId}-rows-grid > *:nth-child(${index + 1}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          margin: ${index !== 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} ${index === 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} !important;
        }
    `).join('')}
    .${uniqueId}-rows-grid > *:last-child {
      padding: ${global?.style?.rowPadding.split(" ")[0]} 0px ${global?.style?.rowPadding.split(" ")[0]} ${(global?.style?.gap || '0px')};
    }
    ${(grid || [])
      .filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
      .map((gridItem, index) => gridItem?.header?.noColumn ? `
    .${uniqueId}-rows-grid > *:nth-child(${index + 1}) {
      ${gridItem.row.component !== null && `
      margin:
        ${index !== 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`}
        -${(gridItem?.row?.columnEnd && gridItem?.row?.columnEnd !== 'none') ? 0 : global.style.rowPadding.split(" ")[1]}
        ${index === 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`}
        -${(gridItem?.row?.columnStart && gridItem?.row?.columnStart !== 0) ? 0 : global.style.rowPadding.split(" ")[1]} !important;
      `
      }
      grid-column-start: ${gridItem?.row?.columnStart || '1'};
      grid-column-end: ${gridItem?.row?.columnEnd || 'none'};
      grid-row-start: ${gridItem?.row?.rowStart || '0'};
      grid-row-end: ${gridItem?.row?.rowEnd || '0'};
      z-index: 1;
    }
    `:'').join('')}
  `)

  const renderDOMWithGrid = () => {
    return <>
      {data.map((dataItem, index) => <div
        className={clsx([`${uniqueId}-rows-grid`, className])}
        key={Object.values(dataItem).map(di => JSON.stringify(di)).join('').replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, '')}
        style={{
          display: 'grid',
          alignItems: 'center',
          gap: global?.style?.gap || '0',
          backgroundColor: global?.alternatingRows?.stepping(index) ? global?.alternatingRows?.color : index % 2 === 0 ? '#f0f0f0' : 'transparent',
          padding: global?.style?.rowPadding || '0px',
          gridTemplateColumns,
      }}>
        {grid.map((gridItem, index) => <Fragment key={`column.${gridItem?.row?.key || gridItem.key}`}>
          {gridItem?.row?.component !== undefined
            ? <Fragment key={gridItem.row.key || gridItem.key}>
                {typeof gridItem.row.component === 'function'
                ? gridItem?.row?.component(dataItem, index)
                  : gridItem?.row?.component}
              </Fragment>
            : <div
              id={`${gridItem.key}`}
              key={gridItem.key}
              className={`${uniqueId}-row-discovered`}
              // style={{ padding: global?.style?.rowPadding || '0' }}
            >
              {JSON.stringify(jsonPathToValue(dataItem, gridItem.key))}
            </div>}
        </Fragment>)}
      </div>)}
    </>
  }

  const renderDOMWithDiscovery = () => {
    // const rowRef = useRef()

    // useLayoutEffect(() => {
      // console.log('rendering', rowRef, rowRef?.current?.clientHeight)
      // setMinHeight(rowRef?.current?.clientHeight)
    // }, [rowRef])


    return <>{!!data?.length && data.map((data, index) => <GridObservable
      // ref={rowRef}
      key={Object.values(data).filter(d => typeof d === 'string').join("")}
      defaultStyle={{
        // minHeight: `${Math.max(minHeight, defaultMinHeight)}px`,
        minHeight: `${Math.max(rowHeight || defaultMinHeight)}px`,
      }}
      style={{
          display: 'grid',
          alignItems: 'center',
          backgroundColor: global?.alternatingRows?.stepping(index) ? global?.alternatingRows?.color : index % 2 === 0 ? '#f0f0f0' : 'transparent',
          padding: global?.style?.rowPadding || '0',
          gap: `${parseInt(global?.style?.gap?.replace('px', '')) || 0}px`,
          gridTemplateColumns,
      }}>
      {presentColumns.map(({ key }, index) => <GridObservable
        {...{ key }}
        sample={index === 0}
        sampleViability={value => !!value && minHeight !== value && defaultMinHeight !== value}
        className={`${uniqueId}-row-discovered`}
      >
          {data[key] && typeof data[key] === 'string' ? data[key] : String(JSON.stringify(data[key]) || '').substring(0, 250)}
        </GridObservable>)}
      </GridObservable>)}
    </>
  }

  const renderChildren = () => {
    return children({
      styleProps: {
        display: 'grid',
        gap: `${parseInt(global?.style?.gap?.replace('px', '')) || 0}px`,
        alignItems: 'center',
        padding: global?.style?.rowPadding || '0',
        gridTemplateColumns,
      },
      className: clsx([`${uniqueId}-rows-grid`, className]),
      rows: (data.length ? data : []).map((dataItem, index) => ({
        index,
        alternating: global?.alternatingRows?.stepping(index) || index % 2 === 0,
        data: dataItem,
        key: Object.values(dataItem).map(di => JSON.stringify(di)).join('').replace(/[^a-z0-9]/gmi, " ").replace(/\s+/g, ''),
        component: presentColumns.map(({ component, key }) => componentTypeCheck(
          typeof component !== 'string'
            ? component(dataItem, index)
            : jsonPathToValue(dataItem, key),
          `${index}.${key}.${generateKey(dataItem)}`,
          index))
      }))
    })
  }

  return <>
    <style>{stringify(classes, { compress: true })}</style>
    <div style={wrapperStyle}>
      <div className={`${uniqueId}-row-scrollable`}>
        <div style={{ height: `${(totalHeight)}px`}}>
          {children
            ? data && <>{renderChildren()}</>
            : <>{grid ? renderDOMWithGrid() : renderDOMWithDiscovery()}</>}
        </div>
      </div>
    </div>
  </>
}

GridRows.propTypes = { children: PropTypes.func }

export default GridRows