import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { cloneElement, useEffect, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    alignSelf: 'stretch',
    breakInside: 'avoid',
    minHeight: '44px',
    fontSize: '12px',
    alignItems: 'center',
    gridColumnGap: '16px',
    gridRowGap: '16px',

    '&:hover': {
      backgroundColor: theme.palette.augmentColor({ main: theme.palette.divider }).light,
    }
  },
  isSelected: {
    backgroundColor: `${theme.palette.augmentColor({ main: theme.palette.divider }).main} !important`,
  },
}))

const ObservableRow = ({
  innerIndex,
  innerOriginalIndex,
  isScrollable = true,
  isSelected = false,
  gridSpacing,
  onClick,
  children,
  isRelevant = true,
  rowOptions = {
    padding: '4px 8px',
  },
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [inView, setInView] = useState(false)

  return isRelevant
    ? <InView
      as='div'
      threshold={0}
      onChange={setInView}
      className={[
        classes.wrapper,
        (inView && isSelected) ? classes.isSelected : false,
        inView ? 'observableGrid' : false,
      ].filter(c => c !== false).join(' ')}
      key={innerIndex}
      {...{
        ...inView
          ? {
            // style: {
            //   display: 'grid',
            //   padding: rowOptions.padding,
            //   gridTemplateColumns: gridSpacing
            // },
            'data-i': innerIndex,
            'data-o': innerOriginalIndex,
          }
          : {
          },
        onClick
      }}

    >
      <style>{`
        .grid: {
          display: 'grid',
          padding: ${rowOptions.padding},
          gridTemplateColumns: ${gridSpacing}
        }
      `}</style>
      {(inView || isScrollable) && children && cloneElement(children, { inView })}
    </InView>
    : null
}

ObservableRow.defaultProps = {
  isScrollable: true,
}

ObservableRow.propTypes = {
  isScrollable: PropTypes.bool,
}

export default ObservableRow