import React, { useContext, useState } from 'react';
import GridObservable from '../GridObservable';
import DataProvider from '../GridStore';

export default ({ presentColumns, _visibleIndexes }) => {
  const { uniqueId, data, gridTemplateColumns, global, averageHeight, initialHeight } = useContext(DataProvider)

  const renderDOMWithDiscoveryItem = ({signature, dataItem}) => <>
    {presentColumns.map(({ key }) => <div
      key={`${signature}.${key}`}
      className={`${uniqueId}-row-discovered`}
    >
      {dataItem[key] && typeof dataItem[key] === 'string'
        ? dataItem[key]
        : String(JSON.stringify(dataItem[key]) || '').substring(0, 250)}
    </div>)}
  </>

  const renderDOMWithDiscovery = () => {
    const signature = (data) => Object.values(data).filter(d => typeof d === 'string').join("")
    return <>
      {!!data?.length && data.map((dataItem, index) => <GridObservable
        {...{ index }}
        id={`${uniqueId}.${index}`}
        key={signature(dataItem)}
        defaultStyle={{
          minHeight: `${averageHeight.current || initialHeight}px`,
        }}
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
      </GridObservable>)}
    </>
  }

  return renderDOMWithDiscovery()
}
