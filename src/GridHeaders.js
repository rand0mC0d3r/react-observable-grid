import clsx from 'clsx';
import { parse, stringify } from 'css';
import PropTypes from 'prop-types';
import { Fragment, useContext, useEffect, useState } from 'react';
import DataProvider from './GridStore';

const GridHeaders = ({ children, className, style, upComponent, downComponent, fallbackComponent }) => {
  const { uniqueId, grid, data, headerTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, key, options) => {
    if (component === undefined) return <Fragment>{key}</Fragment>

    return typeof component === 'string' || typeof component.type === 'symbol'
      ? fallbackComponent ? fallbackComponent(component, options) : component
      : typeof component === 'function' && component({ ...options })
  }

  const classes = parse(`
    .${uniqueId}-headers-grid {
      display: grid;
      z-index: 1;
      align-items: center;
    }
    .${uniqueId}-header {
      cursor: pointer;
    }
    .${uniqueId}-header-sorting {
      display: flex;
      gap: ${global?.style?.gap || '0px'};
    }
    .${uniqueId}-headers-grid > * {
      ${grid?.length ? `display: flex;` : ''}
      margin: 0px ${global?.style?.gap || '0px'};
    }
    ${((grid || [])
      .filter(({ header }) => header?.visible === undefined ? true : header.visible)
      .filter(({ header }) => !header?.noColumn)
      .map(({ key, header }, index) => `
        .${uniqueId}-headers-grid > *:nth-child(${index + 1}) {
          content: '${key}';
          justify-content: ${header?.align || 'flex-start'};
        }`).join('') || '').trim()}
    .${uniqueId}-headers-injected {
      display: flex;
      overflow: hidden;
      user-select: none;
      gap: ${global?.style?.gap || '4px'};
      font-size: 0.9em;
      align-items: center;
    }
    .${uniqueId}-header-action {
      cursor: pointer;
    }
  `)

  const renderDirectionComponent = (key) => {
    const { direction, column } = stats.sort
    return column === key
      ? direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')
      : null
  }

  const renderChildrenWithGrid = () => {
    const { direction, column } = stats.sort
    return (grid || [])
      .filter(({ header }) => header?.visible === undefined ? true : gridItem?.header?.visible)
      .filter(({ header }) => !header?.noColumn)
      .map(({ header, key }) => ({
        key,
        extraKeys: header?.extraKeys,
        align: header?.align,
        directionComponent: renderDirectionComponent(key),
        onSort: (path) => !header?.noSort && onSort(path !== undefined && path.length > 0 ? path : key),
        sort: {
          direction,
          column
        },
        component: componentTypeCheck(header?.component, key, {}),
      }))
  }

  const renderChildrenByDiscovery = () => {
    return !!data?.length ? [...new Set(data
      .map(item => Object
        .keys(item)
        .map(key => key))
      .flat())]
      .sort()
      .map(key => ({
        key,
        component: key,
        onSort: (path) => {
          onSort(path !== undefined && path.length > 0 ? path : key)
        },
        directionComponent: renderDirectionComponent(key)
      }))
      : []
  }

  const renderDOMByDiscovery = () => {
    const { column } = stats.sort
    return !!data?.length && [...new Set(data
      .map(item => Object
        .keys(item)
        .map(key => key))
      .flat())]
      .sort()
      .map(key => <Fragment {...{ key }}>
        {fallbackComponent
          ? fallbackComponent(
            key, {
            key,
            onSort: () => onSort(String(key)),
            sort: { isActive: column === key },
            directionComponent: renderDirectionComponent(key)
          }
          )
          : <div {...{ key }} className={clsx([`${uniqueId}-header`, column === key &&`${uniqueId}-header-sorting`])}  onClick={() => onSort(key)}>
              {column === key ? <span>{key}</span> : key}
              {renderDirectionComponent(key)}
          </div>}
      </Fragment>)
  }

  const renderDOMWithGrid = () => {
    const { direction, column } = stats.sort
    return grid
      .filter(({ header }) => header?.visible === undefined ? true : header?.visible)
      .filter(({ header }) => !header?.noColumn)
      .map(({ header, key }) => <div
        {...{ key }}
        className={clsx([
          `${uniqueId}-headers-injected`,
          !header?.noSort && !header?.disableOnClick && `${uniqueId}-header-action`
        ])}
        onClick={() => !header?.noSort && !header?.disableOnClick && onSort(key)}
        onContextMenu={(e) => {
          e.preventDefault()
          !header?.noSort && !header?.disableOnClick && onSort('')
        }}
      >
        {header?.component !== undefined
          ? <>
            {componentTypeCheck(
              header?.component,
              key,
              {
                onSort: (path) => !header?.noSort && onSort(path !== undefined && path.length > 0 ? path : key),
                sort: {
                  direction: !header?.noSort && direction,
                  column: !header?.noSort && column,
                  isActive: !header?.noSort && column === key,
                },
                directionComponent: !header?.noSort && renderDirectionComponent(key)
              }
            )}
            {((typeof header?.component === 'string' || typeof header?.component?.type === 'symbol'))
              && !header?.noSort && renderDirectionComponent(key)}
          </>
          : <>
            {fallbackComponent
              ? fallbackComponent(
                key, {
                directionComponent: renderDirectionComponent(key),
                sort: { isActive: false }
              })
              : <div className={`${uniqueId}-headers-injected`} >
                {key}
                {renderDirectionComponent(key)}
              </div>}
          </>}
      </div>)
  }

  return <>
    <style>{stringify(classes, { compress: true })}</style>
    <div {...{
      className: clsx([`${uniqueId}-headers-grid`, className]),
      style: { ...global?.style, ...style, gap: 0, gridTemplateColumns: headerTemplateColumns }
    }}>
      {children
        ? children({ headers: grid ? renderChildrenWithGrid() : renderChildrenByDiscovery()})
        : grid ? renderDOMWithGrid() : renderDOMByDiscovery()}
    </div>
  </>
}

GridHeaders.propTypes = { children: PropTypes.func }

export default GridHeaders
