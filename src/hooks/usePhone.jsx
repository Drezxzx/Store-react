import { useState, useEffect } from "react";

export function usePhone() {
    const [movile, setMovile] = useState()
    const [totalPages, setTotalPages] = useState()
    const elementperpage = 6
    const [pages, setPages] = useState(1)
    const [isloading , setIsloading] = useState(true)
    useEffect(() => {
    const fechtData = async () => {
      const response = await fetch(`https://api-store-fl2b.onrender.com/phones?pages=${pages}&productsperpages=${elementperpage}`)
      const data = await response.json()

      const response2 = await fetch(`https://api-store-fl2b.onrender.com/pages/${elementperpage}`)
      const [data2] = await response2.json()
      console.log({data2, data});
      setTotalPages(data2.pages)
      if (data && data2) {
        setMovile(data)
        setIsloading(false)
      }
    }
     fechtData()
 },[pages])

 return {movile, pages, elementperpage, isloading, totalPages, setPages}
}

