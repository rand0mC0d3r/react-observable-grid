import React, { useEffect, useCallback, useState } from 'react'
import domtoimage from 'dom-to-image'

const ObservableSnapshot =  ({
  id,
  index,
  origIndex,
  children
}) => {
  const [snapshot, setSnapshot] = useState('')
  const [showReal, setShowReal] = useState(false)

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

  // useEffect(() => {
  //   if(snapshot) {
  //     console.log('children updated')
  //   //   setSnapshot('')
  //   }
  // }, [children, snapshot])

  useEffect(() => {
    getImage(id)
  }, [id, getImage])

  return <React.Fragment>
    {(snapshot && !showReal) && <img onMouseOver={() => setShowReal(true)} src={snapshot} />}
    {(snapshot === '' || showReal) && <div onMouseLeave={() => setShowReal(false)} id={id}>{children}</div>}
  </React.Fragment>
}

export default ObservableSnapshot