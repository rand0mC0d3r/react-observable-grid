import React, { useContext } from 'react';
import { InView } from 'react-intersection-observer';
import DataProvider from './GridStore';

const sampleStepping = 5

export default ({ index, id, children, defaultStyle, inViewClassName, className, sample = false, sampleViability, style, ...rest }) => {
	const { visibleIndexes, averageHeight, initialHeight } = useContext(DataProvider)

	const updateIndexes = (inView, index) => {
		visibleIndexes.current = (index % sampleStepping === 0) && (inView && !visibleIndexes?.current?.some(vi => vi === index))
			? [...new Set([...visibleIndexes.current, index])].sort((a, b) => a - b)
			: (!inView && visibleIndexes?.current?.some(vi => vi === index))
				? [...new Set([...visibleIndexes.current.filter(vi => vi !== index)])].sort((a, b) => a - b)
				: visibleIndexes.current
	}

	const getHeight = (id) => {
		const elementHeight = document.getElementById(id)?.getBoundingClientRect()?.height
		if (elementHeight && ![initialHeight, averageHeight].some(e => e === elementHeight)) {
			averageHeight.current = elementHeight
		}
	}

	return <InView>
		{({ inView, ref }) => <div
			{...{
				id, ref,
				className: inView ? inViewClassName : className,
				style: { ...inView ? { ...style } : { ...defaultStyle, minHeight: `${averageHeight.current}px` } },
				...rest
			}}
		>
			{getHeight(id)}
			{updateIndexes(inView, index, id)}
			{(inView && children) && children}
		</div>}
	</InView>
}
