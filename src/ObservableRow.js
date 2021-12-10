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
  rowOptions = {
    padding: '4px 8px',

  }
}) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [firstRender, setFirstRender] = useState(false)
  const [inView, setInView] = useState(false)

  // useEffect(() => {
  //   if (inView
  //     && isScrollable
  //     && (index >= currentIndex - updateGranularity * 3.5)
  //     && (index <= currentIndex + updateGranularity * 1.5)
  //     && index % updateGranularity === 0) {
  //     isViewed(index)
  //   }

  //   if (inView) {
  //     isViewed(index)
  //     console.log(index)
  //   }
  // }, [inView, isViewed, isScrollable, index, currentIndex, updateGranularity])
  useEffect(() => firstRender && isViewedNg(index), [inView, index, firstRender])
  useEffect(() => !firstRender && inView && setFirstRender(true), [inView, firstRender])

  return <>

    <InView
      as='div'
      threshold={0.2}
        onChange={setInView}
        style={{
          padding: '20px'
        }}
        key={index}
        {...{ onClick }}
        data-index={index}
      >
      text {inView ? 'viewed' : 'not viewed'} {index}
    </InView>

    {/* {(isScrollable
      ? !((index >= currentIndex + updateGranularity * 1.5) || (index <= Math.max(-1, currentIndex - updateGranularity * 4)))
      : true)
      && <InView
        as='div'
        className={`${classes.wrapper} ${isSelected && classes.isSelected}`}
        onChange={setInView}
        style={{
          padding: rowOptions.padding,
          gridTemplateColumns: gridSpacing
        }}
        key={index}
        {...{ onClick }}
        data-index={index}
      >
        {(inView || isScrollable) && children && cloneElement(children, { inView, index })}
      </InView>} */}




    {/* {(isScrollable
      ? !((index >= currentIndex + updateGranularity * 1.5) || (index <= Math.max(-1, currentIndex - updateGranularity * 4)))
      : true)
      && <div
        className={`${classes.wrapper} ${isSelected && classes.isSelected}`}
        style={{
          padding: rowOptions.padding,
          gridTemplateColumns: gridSpacing
        }}
        key={index}
        {...{ ref, onClick }}
        data-index={index}
      >
        {(inView || isScrollable) && children && cloneElement(children, { inView, index })}
      </div>} */}
  </>
}

ObservableRow.defaultProps = {
  isScrollable: true,
}

ObservableRow.propTypes = {
  isScrollable: PropTypes.bool,
}

export default ObservableRow