import React, { useContext } from 'react';
import GridObservable from '../GridObservable';
import DataProvider from '../GridStore';

export default ({ presentColumns }) => {
  const { uniqueId, data, gridTemplateColumns, global } = useContext(DataProvider)

  const signature = (dataItem) => {
    console.log(dataItem)
    return Object.values(dataItem).filter(d => typeof d === 'string').join("")
  }

  const renderDOMWithDiscoveryItem = ({ signature, dataItem }) => <>
    {presentColumns.map(({ key }) => <div
      key={`${signature}.${key}`}
      className={`${uniqueId}-row-discovered`}
    >
      {dataItem[key] && typeof dataItem[key] === 'string'
        ? dataItem[key]
        : String(JSON.stringify(dataItem[key]) || '').substring(0, 250)}
    </div>)}
  </>

  return <>{!!data?.length && data.map((dataItem, index) => <GridObservable
    {...{ index }}
    id={`${uniqueId}.${index}`}
    key={signature(dataItem)}
    inViewClassName={`${uniqueId}-row-discovered-wrapper`}
    style={{
      backgroundColor: global?.alternatingRows?.stepping(index)
        ? global?.alternatingRows?.color
        : index % 2 === 0 ? '#f0f0f0' : 'transparent',
      padding: global?.style?.rowPadding || '0',
      gap: `${parseInt(global?.style?.gap?.replace('px', '')) || 0}px`,
      gridTemplateColumns,
    }}
  >
    {renderDOMWithDiscoveryItem({ signature: signature(data), dataItem })}
  </GridObservable>)}</>
}
