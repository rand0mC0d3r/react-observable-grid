/* eslint-disable import/no-anonymous-default-export */
import { useCallback, useEffect } from 'react';

export default ({
  currentSearchTerm, setTotal, setCurrentSearchTerm,
  setDataNew, setTerms, suggestions, setSuggestions,
  richPayloads, selectedItem, setRichPayloads, trees, setTrees,
  contributors, setContributors }) => {

  let queryTimeout

  useEffect(() => {
    if (currentSearchTerm !== '') {
      fetch(`https://api.npms.io/v2/search?q=${currentSearchTerm}&size=15`)
        .then(response => response.json())
        .then(data => {
          const newTerms = Object.entries(data.results.reduce((acc, item) => {
            if (item?.package?.description) {
              acc.push(...item?.package?.description?.split(' '))
            }
            return acc
          }, []).reduce((count, word) => {
            count[word] = (count[word] || 0) + 1;
            return count;
          }, {}))
            .map(item => ({ term: item[0], count: item[1] }))
            .sort((a, b) => b.count - a.count)
            .filter(item => item.count > 2 && item.term.length > 2 && item.term.toLowerCase() !== currentSearchTerm.toLowerCase())
            .filter(item => !['for', 'a', 'all','of', 'and', 'with', 'to',  'the', 'in', 'into', 'that', 'by'].some(word => word.toLowerCase() === item.term.toLowerCase()))
          setTerms(newTerms)
          setTotal(data.total)
          setDataNew(data.results.map(item => ({
            ...item, custom: {
            packageName: item.package.links.repository?.replace('https://github.com/', '')
          } })))
        });
      fetch(`https://api.npms.io/v2/search/suggestions?q=${currentSearchTerm}&size=10`)
        .then(response => response.json())
        .then(data => setSuggestions(data));
    }
  }, [currentSearchTerm, setDataNew, setSuggestions, setTerms, setTotal]);

  const accumulateData = useCallback((repoUrl, accumulator, accumulatorName, setAccumulator) => {
    if (selectedItem) {
      if (!accumulator.some(item => item.repo === selectedItem.name)) {
        fetch(repoUrl(selectedItem.url.replace('https://github.com/', '')))
          .then(response => response.json())
          .then(data => {
            setAccumulator(() => [...accumulator, { repo: selectedItem.name, data }])
            const newArray = JSON.parse(localStorage.getItem(accumulatorName) || '[]')
            localStorage.setItem(accumulatorName, JSON.stringify([...newArray, { repo: selectedItem.name, data }]))
          });
      }
    }
  }, [selectedItem])

  const doQuery = (value) => {
    clearTimeout(queryTimeout)
    queryTimeout = setTimeout(() => { setCurrentSearchTerm(value) }, 500)
  }

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}`, richPayloads, 'richPayloads', (payload) => setRichPayloads(payload))
  }, [selectedItem, richPayloads, accumulateData, setRichPayloads]);

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}/contributors`, contributors, 'contributors', (payload) => setContributors(payload))
  }, [selectedItem, contributors, accumulateData, setContributors])

  useEffect(() => {
    accumulateData((repoName) => `https://api.github.com/repos/${repoName}/git/trees/HEAD?per_page=100&recursive=1`, trees, 'trees', (payload) => setTrees(payload))
  }, [selectedItem, trees, accumulateData, setTrees])

  useEffect(() => {
    setRichPayloads(JSON.parse(localStorage.getItem('richPayloads') || '[]'))
    setContributors(JSON.parse(localStorage.getItem('contributors') || '[]'))
    setTrees(JSON.parse(localStorage.getItem('trees') || '[]'))
  }, [setContributors, setRichPayloads, setTrees])



  return null
}
