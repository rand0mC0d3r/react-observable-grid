import clsx from 'clsx';
import { parse, stringify } from 'css';
import PropTypes from 'prop-types';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import DataProvider from '../GridStore';

export default ({ upComponent, downComponent, fallbackComponent }) => {
  const { uniqueId, headerTemplate, stats, onSort } = useContext(DataProvider)

  const renderDirectionComponent = (key) => stats.sort.column === key
    ? stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')
    : <></>

  return <>{headerTemplate.columns.length > 0 && headerTemplate.columns
    .map(key => fallbackComponent
      ? fallbackComponent(
        key, {
          key,
          onSort: () => onSort(String(key)),
          sort: { isActive: stats.sort.column === key },
          directionComponent: renderDirectionComponent(key)
        }
      )
      : <span {...{
          key: `${uniqueId}.${key}`,
          onClick: () => onSort(key),
          onContextMenu: (e) => { e.preventDefault(); stats.sort.column !== '' && onSort('') },
          className: clsx([
            `${uniqueId}-header`,
            `${uniqueId}-header-ellipsis`,
            stats.sort.column === key && `${uniqueId}-header-sorting`
          ])
        }}>
          {stats.sort.column === key ? <span className={`${uniqueId}-header-inner-ellipsis`}>{key}</span> : key}
          {renderDirectionComponent(key)}
      </span>)}
  </>
}
