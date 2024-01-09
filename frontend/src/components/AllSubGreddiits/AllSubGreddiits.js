import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { useState, useEffect } from 'react'
import { getAllSubGreddiits } from '../../services/subgreddiits'
import { AllSubElem } from './AllSubElem'
import Fuse from 'fuse.js'

const AllSubGreddiits = () => {
  const [searchVal, setSearchVal] = useState('')
  const [selectTag, setSelectTag] = useState('')
  const [tagArray, setTagArray] = useState([])
  const [sortArray, setSortArray] = useState([])

  const [allSubs, setAllSubs] = useState([])
  const user = JSON.parse(window.localStorage.getItem('loggedUser'))

  const [ascend, setAscend] = useState(false)
  const [descend, setDescend] = useState(false)
  const [followerOrder, setFollowerOrder] = useState(false)
  const [dateOrder, setDateOrder] = useState(false)

  const useEffectFn = () => {
    const getAllSub = async () => {
      const mySubsList = await getAllSubGreddiits(user.token)
      setAllSubs(mySubsList)
    }

    getAllSub()
  }

  useEffect(useEffectFn, [user.token])

  const appendTag = (event, tagName) => {
    event.preventDefault()
    if (tagName.trim() && !tagArray.includes(tagName))
      setTagArray(tagArray.concat(tagName))
    setSelectTag('')
  }

  const deleteTag = (event, tagName) => {
    event.preventDefault()
    setTagArray(tagArray.filter(tag => tag !== tagName))
  }

  const ascendClick = () => {
    setSortArray(sortArray.filter(sortNum => sortNum !== 1))
    if (!ascend) {
      setDescend(false)
      setSortArray(sortArray.filter(sortNum => sortNum !== 2).concat(1))
    }
    setAscend(!ascend)
  }

  const descendClick = () => {
    setSortArray(sortArray.filter(sortNum => sortNum !== 2))
    if (!descend) {
      setAscend(false)
      setSortArray(sortArray.filter(sortNum => sortNum !== 1).concat(2))
    }
    setDescend(!descend)
  }

  const followerOrderClick = () => {
    setSortArray(sortArray.filter(sortNum => sortNum !== 3))
    if (!followerOrder) setSortArray(sortArray.concat(3))
    setFollowerOrder(!followerOrder)
  }

  const dateOrderClick = () => {
    setSortArray(sortArray.filter(sortNum => sortNum !== 4))
    if (!dateOrder) setSortArray(sortArray.concat(4))
    setDateOrder(!dateOrder)
  }

  const tagFilter = allSubList => tagArray.length ? allSubList.filter(allSub => allSub.tags.some(t => tagArray.includes(t))) : allSubList

  const tieSort = (subA, subB) => {
    if ((subA.creator || subA.isMember) && !subB.creator && !subB.isMember) return -1
    else if (!subA.creator && !subA.isMember && (subB.creator || subB.isMember)) return 1
    else if (subA.creator && !subB.creator) return -1
    else if (!subA.creator && subB.creator) return 1
    return 0
  }

  const sortFn = (sortParam, subA, subB) => {
    if (sortParam === 1) {
      if (subA.name.toLowerCase() < subB.name.toLowerCase()) return -1
      else if (subA.name.toLowerCase() > subB.name.toLowerCase()) return 1
    } else if (sortParam === 2) {
      if (subA.name.toLowerCase() > subB.name.toLowerCase()) return -1
      else if (subA.name.toLowerCase() < subB.name.toLowerCase()) return 1
    } else if (sortParam === 3) {
      if (subA.members > subB.members) return -1
      else if (subA.members < subB.members) return 1
    } else if (sortParam === 4) {
      if (subA.creationDate < subB.creationDate) return -1
      else if (subA.creationDate > subB.creationDate) return 1
    }
    return tieSort(subA, subB)
  }

  const subListSort = (subA, subB) => {
    if (sortArray.length >= 1) {
      if (sortFn(sortArray[0], subA, subB)) return sortFn(sortArray[0], subA, subB)
      else if (sortArray.length >= 2) {
        if (sortFn(sortArray[1], subA, subB)) return sortFn(sortArray[1], subA, subB)
        else if (sortArray.length === 3)
          if (sortFn(sortArray[2], subA, subB)) return sortFn(sortArray[2], subA, subB)
      }
    }
    return tieSort(subA, subB)
  }

  const arraySort = arr => {
    const sortedArray = [...arr]
    return sortedArray.sort(subListSort)
  }

  const sortColor = sortNum => {
    if (sortArray.length >= 1 && sortArray[0] === sortNum) return 'success'
    else if (sortArray.length >= 2 && sortArray[1] === sortNum) return 'warning'
    else if (sortArray.length >= 3 && sortArray[2] === sortNum) return 'error'
    else return 'primary'
  }

  const fuseJsOptions = {
    findAllMatches: true,
    keys: ["name"]
  }

  const fuse = new Fuse(tagFilter(allSubs), fuseJsOptions)

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper position='sticky'
            component='form'
            sx={{ mb: 1, p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }} value={searchVal} onChange={event => setSearchVal(event.target.value)}
              placeholder='Search Subgreddiits'
              inputProps={{ 'aria-label': 'search subgreddiits' }}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={1}>
            <Button size='large' variant={ascend ? 'contained' : 'outlined'} color={sortColor(1)} onClick={ascendClick}>Ascending</Button>
            <Button size='large' variant={descend ? 'contained' : 'outlined'} color={sortColor(2)} onClick={descendClick}>Descending</Button>
            <Button size='large' variant={followerOrder ? 'contained' : 'outlined'} color={sortColor(3)} onClick={followerOrderClick}>Followers</Button>
            <Button size='large' variant={dateOrder ? 'contained' : 'outlined'} color={sortColor(4)} onClick={dateOrderClick}>Creation Date</Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={1}>
            {
              tagArray.map(tag => {
                return (<Chip key={tag} label={tag} color='primary' variant='outlined' onDelete={event => deleteTag(event, tag)} />)
              })
            }
          </Stack>
          <Paper position='sticky'
            component='form'
            sx={{ mb: 1, p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }} value={selectTag} onChange={event => setSelectTag(event.target.value)}
              placeholder='Select Tags'
              inputProps={{ 'aria-label': 'select tags' }}
            />
            <IconButton type='button' sx={{ p: '10px' }} aria-label='add' onClick={event => appendTag(event, selectTag)}>
              <AddIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {
          searchVal ?
            arraySort(fuse.search(searchVal)
              .map(result => result.item))
              .map(allSub => <Grid item xs={2} sm={4} md={4} key={allSub.id}><AllSubElem allSubId={allSub.id} /></Grid>)
            :
            arraySort(tagFilter(allSubs))
              .map(allSub => <Grid item xs={2} sm={4} md={4} key={allSub.id}><AllSubElem allSubId={allSub.id} /></Grid>)
        }
      </Grid>
    </div>
  )
}

export { AllSubGreddiits }