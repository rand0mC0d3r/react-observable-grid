import React from 'react';
import { InView } from 'react-intersection-observer';

const GridObservable = ({ index, children, defaultStyle, inViewClassName, className, sample = false, sampleViability, style, ...rest }) => {
	return <InView>{({ inView, ref }) => <div {...{
		ref,
		className: inView ? inViewClassName : className,
		style: { ...inView ? { ...style } : { ...defaultStyle } },
		...rest
	}}>
		{inView && children}
	</div>}</InView>
}

export default GridObservable