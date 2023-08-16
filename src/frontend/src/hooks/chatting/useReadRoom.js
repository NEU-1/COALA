import { useEffect, useState } from "react"
import { fetchRoom } from '../../api/nodeServer/Room'

function useReadRoom({ email }) {
  const [data, setData] = useState([])
  console.log("로그 유저룸 체크")
  useEffect(() => {
    fetchRoom.read({ email })
      .then(data => data)
      .then(resJson => setData(resJson))
  }, [])

  return data
}

export default useReadRoom