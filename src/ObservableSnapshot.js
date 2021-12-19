import React, { useEffect, useState } from 'react'
import domtoimage from 'dom-to-image'

const ObservableSnapshot =  ({
  id,
  children
}) => {
  const [snapshot, setSnapshot] = useState('')

  useEffect(() => {
    const node = document.getElementById(id)
    if (node) {
      domtoimage.toPng(node)
        .then(function (dataUrl) { setSnapshot(dataUrl) })
        .catch(function (error) { console.error('oops, something went wrong!', error)})
    }
  }, [id])

  return <React.Fragment >
    {snapshot && <img src={snapshot} />}
    {snapshot === '' && <div id={id}>{children}</div>}
  </React.Fragment>
}

export default ObservableSnapshot