import React, { useEffect, useCallback, useState } from 'react'
import domtoimage from 'dom-to-image'

const ObservableSnapshot =  ({
  id,
  index,
  origIndex,
  children
}) => {
  const [snapshot, setSnapshot] = useState('')

  const getImage = useCallback((id) => {
    const node = document.getElementById(id)
    if (node) {
      domtoimage.toPng(node)
        .then(function (dataUrl) { setSnapshot(dataUrl) })
        .catch(function (error) { console.error('oops, something went wrong!', error)})
    }
  }, [])

  useEffect(() => {
    if (index !== origIndex) {
      setSnapshot('')
    }
  }, [index, origIndex, getImage, id])

  useEffect(() => {
    getImage(id)
  }, [id, getImage])

  return <React.Fragment >
    {snapshot && <img src={snapshot} />}
    {snapshot === '' && <div id={id}>{children}</div>}
  </React.Fragment>
}

export default ObservableSnapshot