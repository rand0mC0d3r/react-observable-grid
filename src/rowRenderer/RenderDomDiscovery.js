import React, { useContext } from 'react';
import GridObservable from '../GridObservable';
import DataProvider from '../GridStore';

export default ({ presentColumns }) => {
  const { uniqueId, data, gridTemplateColumns, global } = useContext(DataProvider)

  const renderDOMWithDiscoveryItem = ({ dataItem }) => presentColumns.map(({ key }) => <div {...{
    key: `${dataItem.__signature}.${key}`,
    className: `${uniqueId}-row-discovered`
  }}>
    {dataItem[key] && typeof dataItem[key] === 'string'
      ? dataItem[key]
      : String(JSON.stringify(dataItem[key]) || '').substring(0, 250)}
  </div>)

  return <>{!!data?.length && data.map((dataItem, index) => <GridObservable
    {...{ index }}
    id={`${uniqueId}.${index}`}
    key={dataItem.__signature}
    inViewClassName={`${uniqueId}-row-discovered-wrapper`}
    style={{
      backgroundColor: global?.alternatingRows?.stepping(index)
        ? global?.alternatingRows?.color
        : index % 2 === 0 ? '#f0f0f0' : 'transparent',
      padding: global?.style?.rowPadding || '0',
      gap: `${parseInt(global?.style?.gap?.replace('px', '')) || 0}px`,
      gridTemplateColumns,
    }}
  >{renderDOMWithDiscoveryItem({ dataItem })}</GridObservable>)}</>
}
