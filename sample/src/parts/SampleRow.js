import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faBug, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, CircularProgress, Popper, Tooltip, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';
import KeyboardArrowDownSharpIcon from '@material-ui/icons/KeyboardArrowDownSharp';
import StarsIcon from '@material-ui/icons/Stars';
import { cloneElement, memo, useState } from 'react';

export const searchString = (string, query, highlightComponent) => {
  const queryParts = query.split(' ')
  let stringTmp = `${string}`
  const parts = []
  queryParts
    .reduce((acc, curr) => {
      acc = acc.toLowerCase().replaceAll(curr, `###${curr}###`)
      return acc
    }, string || '')
    .split('###')
    .filter((part) => part.length > 0)
    .forEach((part, index) => {
      const which = queryParts.find(qp => part.includes(qp))
      if (which) {
        parts.push({ type: 'highlight', id: `${part}-${index}`, string: `${stringTmp.substring(0, which.length)}` })
      } else {
        parts.push({ type: 'string', id: `${query}-${index}`, string: `${stringTmp.substring(0, part.length)}` })
      }
      stringTmp = stringTmp.length !== part.length ? stringTmp.substring(part.length) : stringTmp
    })
  return parts.reduce((acc, curr) => {
    acc.push(curr.type === 'highlight' ? cloneElement(highlightComponent(curr.string), { key: curr.id})  : curr.string)// acc = `${acc}${curr.string}`
    return acc
  }, [])
}


const MetadataColumn = memo(({ item, value, searchTerm, setSearchTerm }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const selectedText = selection.focusNode.data.substring(selection.anchorOffset, selection.focusOffset)
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      handleClose();
      return;
    }

    fetch(`https://api.npms.io/v2/search/suggestions?q=${selectedText}&size=10`)
      .then(response => response.json())
      .then(data => {
        setSuggestions(data.map(dataItem => dataItem.package.name))
      });

    const getBoundingClientRect = () => selection.getRangeAt(0).getBoundingClientRect();

    setOpen(true);
    setSelectedText(selectedText)
    setAnchorEl({
      clientWidth: getBoundingClientRect().width,
      clientHeight: getBoundingClientRect().height,
      getBoundingClientRect,
    });
  };

  return <>
      <Typography key={`${item.package.name}.${value}`} variant="caption"  onMouseUp={handleMouseUp} color="textSecondary">{searchString(
        value,
        searchTerm,
        (children) => <Typography variant="caption" color="primary" style={{ display: 'inline-block', borderBottom: '2px dashed #3f51b5'}}>{children}</Typography>)
      }</Typography>
      <Popper {...{ open, anchorEl }} placement="bottom-start">
        <div style={{width: '600px', display: 'flex', border: '1px solid #CCC', borderRadius: '8px', padding: '8px', gap: '8px', backgroundColor: '#FFF', flexDirection: "column"}}>
          <Typography>{selectedText}</Typography>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            {[...new Set([selectedText, ...suggestions].sort().map(suggestion => suggestion.toLowerCase()))].map(suggestion => <Chip
              variant="outlined"
              style={{ borderStyle: 'dotted'}}
              key={suggestion}
              size="small"
              onClick={() => {
                handleClose()
                setSearchTerm(`${searchTerm} ${suggestion}`)
              }}
              label={suggestion}
            />)}
          </div>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
        </div>
      </Popper>
    </>
})

const SelectionAndOpenColumn = memo(({item, index, setOpenRows, openRows}) => {
  return <>
    {index % 1 === 0 && <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      <Button disableRipple onClick={() => setOpenRows(openRows.includes(item.package.name)
        ? openRows.filter(openRow => openRow !== item.package.name)
        : [...openRows.filter(row => row !== item.package.name), item.package.name]
      )}>
        {openRows.includes(item.package.name)
          ? <KeyboardArrowDownSharpIcon />
          : <ChevronRightSharpIcon />}
      </Button>
    </div>}
  </>
})
const SearchScoreColumn = memo(({ item, index, setOpenRows, openRows }) => {
  const theme = useTheme()
  const classes = searchScoreColumnStyles(theme)
  return <div className={classes.container}>
    <Tooltip title={`Position: ${index}`}>
      <Typography color="textSecondary" variant="h6" style={{ flex: '1 1 100%'}}>
        {`${(parseFloat(((item.score.detail.quality + item.score.detail.popularity + item.score.detail.maintenance) / 3) * 100).toFixed(2))}%`}
      </Typography>
    </Tooltip>
    {[
      { title: 'Quality', value: item.score.detail.quality },
      { title: 'Popularity', value: item.score.detail.popularity },
      { title: 'Maintenance', value: item.score.detail.maintenance },
    ].map(({ title, value }) => <CircularProgressBlock key={`${title}.${item.package.name}`} {...{value, title }} />)}
  </div>
})

const searchScoreColumnStyles = makeStyles((theme) => ({
  container: {
    display: 'flex !important',
    gap: '4px',
    flexWrap: 'wrap',

    '& > *': {
      position: 'relative',
    }
  }
}))

const CollaboratorsColumn = ({ item, contributors }) => {
  const groups = 5
  const theme = useTheme()
  const classes = collaboratorsColumnStyles(theme)
  return <div style={{ display: 'grid', gap: '4px', gridTemplateColumns: `repeat(${groups}, minmax(20px, 25px))` }}>
    {contributors
      .filter(contributor => contributor.repo === item.package.name)
      .map(contributor => (contributor?.data.length > 0 ? contributor.data : []).filter((_, i) => i < 10)
      .map(({ avatar_url, login }) => <Tooltip key={`${item.package.name}.${avatar_url}`} arrow title={login}>
          <img
            className={classes.avatar}
            src={avatar_url}
            style={{ width: '20px', height: '20px', borderRadius: '50%' }}
            alt="avatar"
          />
        </Tooltip>))}
    </div>
}

const collaboratorsColumnStyles = makeStyles((theme) => ({
  avatar: {
    opacity: 0.6,

    '&:hover': {
      opacity: 1,
    }
  }
}))

const NameColumn = memo(({ item, searchTerm, richPayloads }) => {
  const extraPayload = richPayloads.filter(payload => payload.repo === item.package.name).map(payload => payload.data)[0]
  return <div key={`name.${item.package.name}`} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'row', alignItems: 'center', flex: '1 1 100%' }}>
      {extraPayload?.organization?.avatar_url && <img src={extraPayload?.organization?.avatar_url} style={{ width: '24px', height: '24px', borderRadius: '50%' }} alt="avatar" />}
      <MetadataColumn {...{ item, value: item.package.name, searchTerm }} />
    </div>
      <Tooltip arrow title={`Last release: ${item.package.date}`}>
        <Chip size="small" variant="outlined" label={item.package.version} />
      </Tooltip>
      {extraPayload?.stargazers_count && <Chip
        style={{ borderColor: "orange", borderStyle: 'dotted' }}
        key={extraPayload.full_name}
        size="small"
        label={extraPayload.stargazers_count}
        variant="outlined"
        color="primary"
        icon={<StarsIcon style={{color: 'orange'}} />} />}
  </div>
})

const KeywordsColumn = memo(({ item, searchTerm, setSearchTerm }) => {
  return <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }} key={`${item.package.name}.${item.searchScore}`}>
    {[...new Set((item?.package?.keywords || []))]
      .sort()
      .filter(( _, i ) => i < 10)
      .map(keyword => <div
        key={`${item.package.name}.${item.searchScore}.${keyword}`}
        id={`${item.package.name}.${item.searchScore}.${keyword}`}
        title={`Search by ${keyword}`}
        onClick={() => setSearchTerm(keyword)}
        style={{
          fontSize: '11px',
          borderRadius: '12px',
          borderColor: keyword.toLowerCase() === searchTerm.toLowerCase() ? '#CCC' : '#000',
          color: keyword.toLowerCase() === searchTerm.toLowerCase() ? '#CCC' : '#000',
          borderWidth: '1px',
          cursor: 'pointer',
          padding: '4px 8px',
          borderStyle: 'dashed'
        }}
      >
        {keyword}
      </div>)}
  </div>
})

const LinksColumn = memo(({ item }) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [url, setUrl] = useState(null);

  const iconMap = [
    { key: 'npm', icon: faNpm, },
    { key: 'homepage', icon: faHouse, },
    { key: 'repository', icon: faGithub, },
    { key: 'bugs', icon: faBug, },
  ]

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = (event, url) => {
    setOpen(!open);
    setUrl(url);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };


  return <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    {Object
      .entries(item.package.links)
      .map(([key, value]) => ({
        key,
        value: value.replace("https://www.npmjs.com/package/", "").replace("https://github.com/", ""),
        origValue: value
      }))
      .map(({ key, value, origValue }) => <Tooltip key={key} arrow title={`Open ${value}`}>
        <span>
          <FontAwesomeIcon
            as="span"
            onClick={event => handleMouseUp(event, origValue)}
            icon={iconMap.find(icon => icon.key === key).icon} />
          </span>
        </Tooltip>)}
    <Popper {...{ open, anchorEl }} placement="bottom">
      <iframe
        src={url}
        title="Preview of website resource"
        style={{
          zIndex: '1000',
          margin: '8px',
          backgroundColor: '#FFF',
          boxShadow: '0px 4px 0px 1px #77777733',
          border: '2px dotted #777',
          borderRadius: '8px',
          width: '800px',
          height: '750px'
        }} />
      </Popper>
        </div>
})


const CircularProgressBlock = ({ value, title, uniqueKey, size = '30px' }) => {
  const computedValue = (parseFloat(value).toFixed(2) * 100).toFixed(0)
  return <div style={{position: 'relative'}}>
    <CircularProgress
      id={uniqueKey}
      color={computedValue < 50 ? 'secondary' :  'inherit'}
      style={{ width: size , height: size  }}
      variant="determinate"
      value={parseFloat(computedValue) || 0}
    />
    <Tooltip title={`${title}: ${computedValue}%`} arrow>
      <Typography style={{
        fontSize: '9px',
        position: 'absolute',
        top: '0px',
        left: '0px',
        cursor: 'pointer',
        right: '0px',
        bottom: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '0px',
        height: size,
      }} variant='body2' color={computedValue > 95 ? 'primary' : 'textSecondary'}>{`${computedValue}%`}</Typography>
      </Tooltip>
  </div>
}


export {
  LinksColumn, CircularProgressBlock, MetadataColumn, KeywordsColumn, NameColumn, SelectionAndOpenColumn, CollaboratorsColumn, SearchScoreColumn
};
