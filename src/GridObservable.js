import React, { useContext, useEffect } from 'react';
import { InView, useInView } from 'react-intersection-observer';
import DataProvider from './GridStore';

const GridObservable = ({ children, defaultStyle, sample = false, sampleViability, style, ...rest }) => {
	const { updateDeterminedHeight } = useContext(DataProvider)
	const [height, setHeight] = React.useState(null)

	useEffect(() => {
		if (height !== null && height > 0) {
			updateDeterminedHeight(height)
		}
	}, [height])

	return <InView>{({ inView, ref, entry }) => <div {...{ ref, style: { ...inView ? { ...style } : { ...defaultStyle } }, ...rest }}>
		{inView && children}
		{inView
			&& entry?.target?.parentElement
			&& height !== entry.target.parentElement.offsetHeight
			&& sample
			&& sampleViability(entry.target.parentElement.offsetHeight)
			&& setHeight(() => entry.target.parentElement.offsetHeight)}
	</div>}</InView>
}

export default GridObservable