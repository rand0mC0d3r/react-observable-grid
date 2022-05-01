import React from 'react'
import { InView } from 'react-intersection-observer'

const GridObservable = ({ children, ...rest }) => {
	return <InView>{({ inView, ref }) => <div id="observable" {...{ ref, ...rest }}>
		{/* {inView && entry.target.parentNode.clientHeight} */}
		{inView && children}
	</div>}</InView>
}

export default GridObservable