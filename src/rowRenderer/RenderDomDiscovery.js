import React, { useContext } from 'react';
import GridObservable from '../GridObservable';
import DataProvider from '../GridStore';

const color0 = '#f0f0f0'
const color1 = 'transparent'
const stringLimit = 250

export default ({ presentColumns, _visibleIndexes }) => {
  const { uniqueId, data, averageHeight, gridTemplateColumns, global } = useContext(DataProvider)

  const renderDOMWithDiscoveryItem = ({ dataItem }) => presentColumns.map(({ key }) => <div {...{
    key: `${dataItem.__signature}.${key}`,
    className: `${uniqueId}-row-discovered`
  }}>
    {dataItem[key] && typeof dataItem[key] === 'string'
      ? dataItem[key]
      : String(JSON.stringify(dataItem[key]) || '').substring(0, stringLimit)}
  </div>)

  return <>
    {data?.length > 0 && data
      // .filter((_, i) => i < (_visibleIndexes.slice(-1)[0] || 10) + 10)
      .map((dataItem, index) => <GridObservable {...{
        index,
        id: `${uniqueId}.${index}`,
        key: dataItem.__signature,
        inViewClassName: `${uniqueId}-row-discovered-wrapper`,
        style: {
          backgroundColor: global?.alternatingRows?.stepping(index)
            ? global?.alternatingRows?.color
            : index % 2 === 0 ? color0 : color1,
          padding: global?.style?.rowPadding || '0',
          gap: `${parseInt(global?.style?.gap?.replace('px', '')) || 0}px`,
          gridTemplateColumns,
          }
        }}
      >
        {renderDOMWithDiscoveryItem({ dataItem })}
      </GridObservable>)}
    {/* {JSON.stringify(_visibleIndexes)} */}
    {/* {JSON.stringify(averageHeight.current)} */}
    {/* {<div style={{ height: `${data.length * averageHeight.current}px` }} />} */}
     {/* {(data.length - _visibleIndexes.slice(-1)[0]) > 10 && <div style={{ height: `${(averageHeight.current * (data.length - _visibleIndexes.slice(-1)[0] - 10))}px` }}></div>} */}
  </>
}
