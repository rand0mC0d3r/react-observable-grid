import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { cloneElement, useEffect, useState } from 'react'
import { InView, useInView } from 'react-intersection-observer'
// import { Wrapper } from './styles'

// export const Wrapper = withTheme(styled.div.attrs(props => ({
//   style: {
//     backgroundColor: props['data-is-selected'] && props.theme.palette.augmentColor({ main: props.theme.palette.primary.light }).main,
//     cursor: props['data-on-click'] || props['data-on-double-click'] ? 'pointer' : 'default',
//   },
// }))`
//     padding: ${props => props['data-padding']};
//     grid-template-columns: ${props => props['data-grid']};
//     border-bottom: 1px solid ${props => props.theme.palette.divider};

// `)

const useStyles = makeStyles(theme => ({
  wrapper: {
    alignSelf: 'stretch',
    breakInside: 'avoid',
    minHeight: '44px',
    display: 'grid',
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
  }
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

  return <>
    {isRelevant && <InView
      as='div'
      threshold={0}
      onChange={setInView}
      className={[
        classes.wrapper,
        isSelected ? classes.isSelected : ''].join(' ').trim()}
      key={innerIndex}
      {...{
        ...inView ? {
          style: {
            padding: rowOptions.padding,
            gridTemplateColumns: gridSpacing
          }
        } : {},
        onClick
      }}
      data-i={innerIndex}
      data-o={innerOriginalIndex}
    >
      {(inView || isScrollable) && children && cloneElement(children, { inView })}
    </InView>}
  </>
}

ObservableRow.defaultProps = {
  isScrollable: true,
}

ObservableRow.propTypes = {
  isScrollable: PropTypes.bool,
}

export default ObservableRow