import React, { useContext } from 'react';
import { InView } from 'react-intersection-observer';
import DataProvider from './GridStore';

const sampleStepping = 5

export default ({ index, id, children, defaultStyle, inViewClassName, className, sample = false, sampleViability, style, ...rest }) => {
	const { visibleIndexes } = useContext(DataProvider)

	const updateIndexes = (inView, index) => {
		visibleIndexes.current = (index % sampleStepping === 0) && (inView && !visibleIndexes?.current?.some(vi => vi === index))
			? [...new Set([...visibleIndexes.current, index])].sort((a,b) => a - b)
			: (!inView && visibleIndexes?.current?.some(vi => vi === index))
				? [...new Set([...visibleIndexes.current.filter(vi => vi !== index)])].sort((a,b) => a - b)
				: visibleIndexes.current
	}

	return <InView>
		{({ inView, ref }) => <div
			{...{
				id, ref,
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
