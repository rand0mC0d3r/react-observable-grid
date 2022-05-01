import React, { useContext } from 'react';
import { InView } from 'react-intersection-observer';
import DataProvider from './GridStore';

const GridObservable = ({ children, defaultStyle, sample = false, sampleViability, style, ...rest }) => {
  const { updateDeterminedHeight } = useContext(DataProvider)

	return <InView>{({ inView, ref, entry }) => <div  {...{ ref, style: { ...inView ? { ...style } : {}, ...defaultStyle }, ...rest }}>
		{inView && children}
		{inView
			&& sample
			&& sampleViability(entry?.target?.parentElement?.offsetHeight)
			&& updateDeterminedHeight(entry?.target?.parentElement?.offsetHeight)}
	</div>}</InView>
}

export default GridObservable