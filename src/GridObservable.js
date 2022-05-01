import React from 'react'
import { InView } from 'react-intersection-observer'

const GridObservable = ({ children, defaultStyle, style,...rest }) => <InView>{({ inView, ref }) => <div {...{ ref, style: { ...inView ? { ...style } : {}, ...defaultStyle },...rest }}>
		{inView && children}
	</div>}</InView>

export default GridObservable