import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from "react"
import { Article } from '../types'
import xss from 'xss'

interface SearchProps {
  handleSearchResults: (data: Article[]) => void
}

function Search({handleSearchResults}: SearchProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

    const url = "http://localhost:3001/api/v1/search?";
    const params = new URLSearchParams({ 
      "string": xss(event.target.value)
    });
    
    try {
      setLoading(true);
      const data = await fetch(url + params, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      }).then(response => response.json());

      setLoading(false);
      handleSearchResults(data);

    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <TextField 
      id="outlined-basic" 
      label="Search" 
      variant="outlined"
      autoComplete='off'
      onChange={handleChange} 
      sx={{width: "100%", maxWidth: "500px"}}
      InputProps={{
        endAdornment: loading && <InputAdornment position="end"><CircularProgress size="28px" /></InputAdornment>,
      }} />
      
  )
}   

export default Search
