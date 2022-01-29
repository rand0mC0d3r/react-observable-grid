
```
 <GridProvider {...{ rows, headers }}>
	<UiColumns />
	<HeadlessDebugging>{items => <div>{JSON.stringify(items)}</div>}</HeadlessDebugging>

	<HeadlessContainer>
		<HeadlessRowList />
	</HeadlessContainer>
	<HeadlessActionButtons>{({ total, filtered, selectedIndex, goToTop, goToSelectedIndex }) => <>
	<ActionButtons {...{total, filtered, selectedIndex, goToTop, goToSelectedIndex}} />
	</>}</HeadlessActionButtons>
</GridProvider>
```

Modernized (Headless) and hook driven (React) version of the grid.

```
import { Grid, useGrid, GridHeaders } from 'react-observable-grid';

function App = () => {
  return <Fragment>
    ...
    <Grid {...{ rows, headers }}>
      ...
      <Grid.Debug>                                                              <-- Debugging values. DOM Counts, rows rendered, derived variables, etc
        {({debugging}) => <Fragment||div>                                       <-- Each value is of a format {key:(string): value:(string)}
          {debugging.map(({key, value}) => <div>{key}: {value}</div>}
        </Fragment||div>}
      </Grid.Debug>
      ...
      <Grid.Headers>                                                             <-- Header wrapper with CSS grid-structure component. Open to styling, etc
        {({gridHeaders}) => <Fragment||div>
          {gridHeaders.map(gridHeader => <Grid.Header {...{gridHeader}} />)}
        </Fragment||div>}
      </Grid.Headers>
      ...
      <Grid.Rows>                                                               <-- Adds a container wrapper for scrolling & detectors for scrolling throttling
        {({gridRows}) => <Fragment||div>                                        <-- Remaining filtered rows as observable entries
          {gridRows.map(gridRow => <Grid.Row {...{ gridRow }} />)}              <-- Observable row entry. Open to styling, etc
        </Fragment||div>}
      </Grid.Rows>
      ...
      <Grid.Stats>                                                              <-- Stats object offering based on core context some stats
        {({stats}) => <div class="...">
          <div>Total rows: {rows.total}</div>
          <div>Filtered rows: {stats.filteredCount}</div>                       <-- property:(string) - Filtered rows count
          <div>Current row: {stats.currentRow}</div>                            <-- property:(string) - Current highlighted row
          <div onClick={stats.gotoTop}>↑</div>                                  <-- method:(func) - Scroll smoothly from current position to the top
        </div>}
      </Grid.Stats>
      ...
    </Grid>
    ...
  </Fragment>
}
```
