import { useEffect, useState } from "react"
import { fetchRoom } from '../../api/nodeServer/Room'

function useReadRoom() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchRoom.read()
      .then(data => data)
      .then(resJson => setData(resJson))
  }, [])

  return data
}

export default useReadRoom