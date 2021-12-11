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
  index,
  currentIndex,
  isScrollable = true,
  isSelected = false,
  gridSpacing,
  onClick,
  updateGranularity,
  children,
  isViewed = () => { },
  isViewedNg = () => { },
  isViewedInitial = () => { },
  rowOptions = {
    padding: '4px 8px',
  },
  minRows,
  startVisibleIndex = 0,
  endVisibleIndex = 0,
  initialVisible = () => { },
  initialHidden = () => { },
  setLimit = () => { },
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [inView, setInView] = useState(false)

  return <>
    <InView
      as='div'
      onChange={setInView}
      style={{
        padding: '20px'
      }}
      className={`${classes.wrapper} ${isSelected && classes.isSelected}`}
      key={index}
      style={{
        padding: rowOptions.padding,
        gridTemplateColumns: gridSpacing
      }}
      {...{ onClick }}
      data-index={index+1}
    >
      {/* {index+1} */}
      {(inView || isScrollable) && children && cloneElement(children, { inView, index })}
    </InView>
  </>
}

ObservableRow.defaultProps = {
  isScrollable: true,
}

ObservableRow.propTypes = {
  isScrollable: PropTypes.bool,
}

export default ObservableRow