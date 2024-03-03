import { useState, useEffect } from "react";

export function usePhone() {
    const [movile, setMovile] = useState()
    const [totalPages, setTotalPages] = useState()
    const elementperpage = 5
    const [pages, setPages] = useState(1)
    useEffect(() => {
    const fechtData = async () => {
      const response = await fetch(`http://localhost:3000/phones?pages=${pages}&productsperpages=${elementperpage}`)
      const data = await response.json()

      const response2 = await fetch(`http://localhost:3000/pages/${elementperpage}`)
      const [data2] = await response2.json()
      
      setTotalPages(data2.pages)
      setMovile(data)
    }
     fechtData()
 },[pages])

 return {movile, pages, elementperpage, totalPages, setPages}
}

