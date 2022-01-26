import React, { useContext } from 'react';
import DataProvider from './GridStore';

export default () => {
  const { gridTemplateColumns, innerHeaders } = useContext(DataProvider)

	return <div
    style={{
      top: '0px', left: '0px', bottom: '0px', right: '0px',
      position: 'absolute', alignSelf: 'stretch', breakInside: 'avoid',
      display: 'grid', alignItems: 'unset', gap: '16px', zIndex: '-1',
      paddingTop: '0', paddingBottom: '0', gridTemplateColumns
		}}
  >
    {innerHeaders
      .filter(ih => ih.visible)
      .map((ih, i, all) => <div
        key={`${ih.property}-${ih.label || ''}`}
        style={{
          margin: '0px -8px',
          borderRight: all.length - 1 === i
            ? '0px none'
            : `1px solid #888`,
        }} />)}
	</div>
}
