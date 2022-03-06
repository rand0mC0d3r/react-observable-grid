/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/jsx-no-undef */
export default () => {
	const data = [
		{
			key1: 'value1',
			key2: 'value2',
			key3: 'value3',
		},
	]

	const global =  {
		alternatingRows: {
			enabled: true,
			stepping: () => { },
		}
	}

	const grid = [
		{
			header: {
				width: 'size in px | fr | minmax | ...',
				visible: true,
				label: 'key1',
			},
			row: {
				component: (row) => row.key1,
			}
		}
	]


	return <>
		{/* grid container with vertical stacking, fully spread  */}
		<Grid {...{ data, grid, global }}>
			<Grid.Headers>
				{(headers) => <>{headers.map(h => <div>{h.label}</div>)}</>}
			</Grid.Headers>

			<Grid.Rows>
				{/* Grid Rows returns to children an infusion of chilren with rows and alternating info. the rows is the rendered sparse div structure wrapped in a inView wrapper internally controlled  */}
				{({ rows, alternating }) => <>
					<MyFancyDiv onClick={() => { }} {...{ alternating }}>{rows}</MyFancyDiv>
				</>}
			</Grid.Rows>
		</Grid>
		</>
}

// 	<HeadlessDebugging>{items => <div>{JSON.stringify(items)}</div>}</HeadlessDebugging>
// 	dd
// 	 <GridDebug>{(debug) => <>{ JSON.stringify(debug) }</>}</GridDebug>
//  <GridDebug>{(debug) => <>{debug.map(debugItem => <>{debug}</>)}</>}</GridDebug>
// 	 <HeadlessActionButtons>{({ total, filtered, selectedIndex, goToTop, goToSelectedIndex }) => <>
// 		<ActionButtons {...{total, filtered, selectedIndex, goToTop, goToSelectedIndex}} />
// 	</>}</HeadlessActionButtons>