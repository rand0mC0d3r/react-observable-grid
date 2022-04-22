import clsx from 'clsx';
import PropTypes, { string } from 'prop-types';
import { Fragment, useContext, useEffect, useState } from 'react';
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
  const { data, gridTemplateColumns, grid, global } = useContext(DataProvider)
  const [presentColumns, setPresentColumns] = useState([])

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

  const classes = `
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
    .grid-rows-grid {
      display: grid;
      z-index: 1;
      align-items: center;
    }
    ${grid?.filter(gridItem => gridItem?.header?.visible === undefined  ? true : gridItem?.header?.visible)
      .map((gridItem, index) => !gridItem?.header?.noColumn
      ? `
        .grid-rows-grid > *:nth-child(${index + 1}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          padding: ${global?.style?.rowPadding.split(" ")[0]} ${(global?.style?.gap || '0')}px;
          margin: -${(global?.style?.gap || '0')}px 0px;
        }
        .grid-rows-grid > *:nth-child(${index + 1}) {
          justify-content: ${gridItem?.header?.align || 'flex-start'};
          justify-items: ${gridItem?.header?.align || 'flex-start'};
          align-items: ${gridItem?.header?.align || 'flex-start'};
          ${gridItem?.row?.noWrapper ? `text-align: ${(textMap.find(tm => tm.id === gridItem?.header?.align || '') || []).text}` : ''}
        }
        .grid-rows-grid > *:nth-child(${index + 1}) > * {
          justify-content: ${gridItem?.header?.align || 'flex-start'};
          justify-items: ${gridItem?.header?.align || 'flex-start'};
          text-align: ${(textMap.find(tm => tm.id === gridItem?.header?.align || '') || []).text};
        }
    ` : `
        .grid-rows-grid > *:nth-child(${index + 1}) {
          display: ${gridItem?.row?.noWrapper ? 'flex' : 'inline-block'};
          margin: ${index !== 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} ${index === 0 ? '0' : `-${global.style.rowPadding.split(" ")[0]}`} -${global.style.rowPadding.split(" ")[1]} !important;
        }
    `).join('')}
    ${grid?.filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
    .map((gridItem, index) => gridItem?.header?.noColumn ? `
    .grid-rows-grid > *:nth-child(${index + 1}) {
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
  `

  return <>
    <style>{classes}</style>
    <div style={wrapperStyle}>
      <div style={scrollerStyle}>
        {children
          ? data && children({
            styleProps: {
              display: 'grid',
              alignItems: 'center',
              padding: global?.style?.rowPadding || '0',
              gridTemplateColumns,
            },
            className: clsx(['grid-rows-grid', className]),
            rows: (data.length ? data : []).map((dataItem, index) => ({
              index,
              alternating: global?.alternatingRows?.stepping(index),
              data: dataItem,
              key: `${index}.${generateKey(dataItem)}`,
              component: presentColumns.map(({ component, key }) => componentTypeCheck(
                typeof component !== 'string'
                  ? component(dataItem, index)
                  : jsonPathToValue(dataItem, key),
                `${index}.${key}.${generateKey(dataItem)}`,
                index))
            }))
          })
          : <>{!grid
            ? <>{!!data?.length && data.map((data, index) => <div key={Object.values(data).filter(d => typeof d === 'string').join("")} style={{
                  display: 'grid',
                  alignItems: 'center',
                  backgroundColor: global?.alternatingRows?.stepping(index) ? global?.alternatingRows?.color : 'transparent',
                  padding: global?.style?.rowPadding || '0',
                  gridTemplateColumns,
              }}>
                {presentColumns.map(({ component, key }) => <div key={key} style={{padding: global?.style?.rowPadding || '0',}} className='grid-row-inferred'>
                  {data[key] && typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key], null, 2)}
                </div>)}
              </div>)}
            </>
            : <>
              {data.map((dataItem, index) => <div
                className={clsx(['grid-rows-grid', className])}
                key={Object.values(dataItem).filter(d => typeof d === 'string').join("")}
                style={{
                  display: 'grid',
                  alignItems: 'center',
                  backgroundColor: global?.alternatingRows?.stepping(index) ? global?.alternatingRows?.color : index % 2 === 0 ? '#f0f0f0' : 'transparent',
                  padding: global?.style?.rowPadding || '0',
                  gridTemplateColumns,
              }}>
                {grid.map((gridItem, index) => <>
                  {gridItem.row.component !== undefined
                    ? <>{typeof gridItem.row.component === 'function'
                        ? <>{gridItem?.row?.component(dataItem, index)}</>
                        : <div id="b">{gridItem?.row?.component}</div>
                      }
                    </>
                    : <div className='grid-row-inferred' style={{padding: global?.style?.rowPadding || '0'}} >{JSON.stringify(jsonPathToValue(dataItem, gridItem.key))}</div>}
                </>)}
              </div>)}
            </>
          }
        </>}
      </div>
    </div>
  </>
}

GridRows.propTypes = { children: PropTypes.func }

export default GridRows