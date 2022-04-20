/* eslint-disable import/no-anonymous-default-export */
import { faLink, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, TextField } from '@material-ui/core';

export default ({ searchTerm, suggestions, setSearchTerm, setCurrentSearchTerm }) => {
  let queryTimeout

  const doQuery = (value) => {
    clearTimeout(queryTimeout)
    queryTimeout = setTimeout(() => { setCurrentSearchTerm(value) }, 500)
  }

  return <TextField
    variant='outlined'
    placeholder="Search term"
    label="Search term"
    value={searchTerm}
    onChange={e => { setSearchTerm(e.target.value); doQuery(e.target.value) }}
    InputProps={{
      endAdornment: <div style={{ display: 'flex', gap: '4px', margin: '4px', flexWrap: 'nowrap' }}>
        {[...new Set(suggestions
          .map((suggestion => suggestion.package.name.toLowerCase()))
          // .map(name => name
          //   .replace(/[\W_]+/g, " ")
          //   .replace(`${searchTerm}`, '')
          //   .trim())
          .filter(name => name.length > 0)
          .filter(name => name !== searchTerm)
          .sort()
        )]?.filter((_, index) => index < 10)
          .map(suggestion => <Chip icon={<FontAwesomeIcon
            icon={suggestion.includes(searchTerm.toLowerCase()) ? faLink : faMagnifyingGlass} />}
            key={suggestion}
            style={{ borderStyle: 'dotted'}}
            onClick={() => { setSearchTerm(suggestion); setCurrentSearchTerm(suggestion) }}
            label={suggestion}
            size="small"
            variant="outlined"
          />)}
        {/* <Chip label={dataNew.length} size="small" color="primary" variant="outlined" /> */}
        {/* <Chip label={total} size="small" color="primary" variant="outlined" /> */}
      </div>,
      }}
  />
}
