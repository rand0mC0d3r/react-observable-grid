import React from 'react';
import { InView } from 'react-intersection-observer';

const GridObservable = ({ children, defaultStyle, onUpdateHeight, style, ...rest }) => {
	return <InView>{({ inView, ref, entry }) => <div  {...{ ref, style: { ...inView ? { ...style } : {}, ...defaultStyle }, ...rest }}>
		{inView && children}
		{onUpdateHeight && onUpdateHeight(entry?.target?.parentElement?.offsetHeight)}
	</div>}</InView>
}

export default GridObservable