import clsx from 'clsx';
import PropTypes from 'prop-types';
import { cloneElement, Fragment, useContext } from 'react';
import DataProvider from './GridStore';

const GridHeaders = ({ children, className, style, upComponent, downComponent, fallbackComponent }) => {
  const { grid, data, headerTemplateColumns, stats, onSort, global } = useContext(DataProvider)

  const componentTypeCheck = (component, key, options) => {
    if (component === undefined) {
      return <Fragment>{key}</Fragment>
    }
    const theFallback = fallbackComponent
      ? <>{fallbackComponent(component, options)}</>
      : <>{component}</>

    return typeof component === 'string' || typeof component.type === 'symbol'
      ? <>{theFallback}</>
      : component({ ...options })
  }

  const classes = `
    .grid-headers-grid {
      display: grid;
      z-index: 1;
      align-items: center;
    }
    .grid-headers-grid > * {
      display: flex;
      margin: 0px ${global?.style?.gap || '0'}px;
    }
    ${grid?.filter(gridItem => gridItem?.header?.visible === undefined  ? true : gridItem.header.visible)
      .filter(gridItem => !gridItem.header?.noColumn)
      .map((gridItem, index) => `
        .grid-headers-grid > *:nth-child(${index + 1}) {
          content: '${gridItem.key}';
          justify-content: ${gridItem?.header?.align || 'flex-start'};
        }`).join('')}
    .grid-headers-injected {
      display: flex;
      overflow: hidden;
      user-select: none;
      gap: 4px;
      font-size: 0.9em;
      align-items: center;
    }
  `

  return <>
    <style>{classes}</style>
    <div {...{
      className: clsx(['grid-headers-grid', className]),
      style: { ...global?.style, ...style, gap: 0, gridTemplateColumns: headerTemplateColumns }
    }}>
      {children
        ? children({
          headers: grid
          ? grid?.filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
          .filter(gridItem => !gridItem?.header?.noColumn)
          .map(({ header, key }) => ({
            key: key,
            extraKeys: header?.extraKeys,
            align: header?.align,
            directionComponent: <>{stats.sort.column === key ? <>
              {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
            </> : null}</>,
            onSort: (path) => !header?.noSort && onSort(path !== undefined && path.length > 0 ? path : key),
            sort: {
              direction: stats.sort.direction,
              column: stats.sort.column,
            },
            component: componentTypeCheck(header?.component, key, {


            }),
          }))
            : !!data?.length ? [...new Set(data.map(item => Object.keys(item).map(key => key)).flat())].sort().map(key => ({
              key,
              component: key,
              onSort: (path) => {
                onSort(path !== undefined && path.length > 0 ? path : key)

              },
              directionComponent: <>{stats.sort.column === key ? <>
              {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
            </> : null}</>
            })) : []
        })
        : <>
          {grid
            ? grid.filter(gridItem => gridItem?.header?.visible === undefined ? true : gridItem?.header?.visible)
                .filter(gridItem => !gridItem?.header?.noColumn)
                .map(({ header, key }) => <div
                  key={key}
                  className='grid-headers-injected'
                  style={{
                    cursor: !header?.noSort && !header?.disableOnClick ? 'pointer' : 'default'
                  }}
                  onClick={() => !header?.noSort && !header?.disableOnClick && onSort(key)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    !header?.noSort && !header?.disableOnClick && onSort('')
                  }}
                >
                  {header?.component !== undefined ? <>
                    {componentTypeCheck(
                      header?.component,
                      key,
                      {
                        onSort: (path) => !header?.noSort && onSort(path !== undefined && path.length > 0 ? path : key) ,
                        sort: {
                          direction: !header?.noSort && stats.sort.direction,
                          column: !header?.noSort && stats.sort.column,
                          isActive: !header?.noSort && stats.sort.column === key,
                        },
                        directionComponent: <>{!header?.noSort && stats.sort.column === key ? <>
                          {stats.sort.direction === 'asc' ? '↑' : '↓'}
                        </> : null}</>
                      }
                    )}
                    {((typeof header?.component === 'string' || typeof header?.component?.type === 'symbol'))
                        && !header?.noSort && stats.sort.column === key && <span>
                        {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
                      </span>}
                  </> : fallbackComponent ? fallbackComponent(key, {
                    directionComponent: <>{stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}</>,
                    sort: { isActive: false }
                  }) : <div className='grid-headers-injected'>
                      {key}
                      {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
                  </div>}

                  {/* {header?.component === undefined
                    ?
                    <>
                      {((typeof header?.component === 'string' || typeof header?.component?.type === 'symbol'))
                        && !header?.noSort && stats.sort.column === key && <span>
                        {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
                      </span>}
                    </>
                    : <>{stats.sort.column === key && 'x'} </>} */}
                </div>)
            : <>{!!data?.length && [...new Set(data.map(item => Object.keys(item).map(key => key)).flat())]
              .sort()
              .map(key => <Fragment {...{ key }}>
                {fallbackComponent
                  ? fallbackComponent(
                    key, {
                      key,
                      onSort: () => onSort(String(key)),
                      sort: { isActive: stats.sort.column === key },
                      directionComponent: <>{stats.sort.column === key ? <>
                        {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
                      </> : null}</>
                    }
                  )
                  : <div key={key} onClick={() => onSort(key)} style={{ cursor: 'pointer', display: 'flex', gap: '8px' }}>
                    {key}
                    {stats.sort.column === key && <span>
                      {stats.sort.direction === 'asc' ? (upComponent || '↑') : (downComponent || '↓')}
                    </span>}
                  </div>}
            </Fragment>)}</>}
        </>}
    </div>
  </>
}

GridHeaders.propTypes = { children: PropTypes.func }

export default GridHeaders
