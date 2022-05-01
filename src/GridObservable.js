import React, { useContext } from 'react';
import { InView } from 'react-intersection-observer';
import DataProvider from './GridStore';

const GridObservable = ({ index, id, children, defaultStyle, inViewClassName, className, sample = false, sampleViability, style, ...rest }) => {
	const { visibleIndexes } = useContext(DataProvider)

	const addIndexes = index => [...new Set([...visibleIndexes.current, index])].sort((a,b) => a - b)
	const removeIndexes = index => [...new Set([...visibleIndexes.current.filter(vi => vi !== index)])].sort((a,b) => a - b)

	const updateIndexes = (inView, index) => {
		if (index % 5 === 0) {
			if (inView && !visibleIndexes?.current?.some(vi => vi === index)) {
				visibleIndexes.current = addIndexes(index)
			}
			if (!inView && visibleIndexes?.current?.some(vi => vi === index)) {
				visibleIndexes.current = removeIndexes(index)
			}
			console.log(visibleIndexes.current)
		}
	}

	return <InView>
		{({ inView, ref }) => <div
			{...{
				id,
				ref,
				className: inView ? inViewClassName : className,
				style: { ...inView ? { ...style } : { ...defaultStyle } },
				...rest
			}}
		>
			{updateIndexes(inView, index)}
			{(inView && children) && children}
		</div>}
	</InView>
}

export default GridObservable