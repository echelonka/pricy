import {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'

const usePathLocalization = (path: string) => {
  const params = useParams<{lang: string}>()
  const {pathname} = useLocation()
  const [lang, setLang] = useState('')

  useEffect(() => {
    setLang(params.lang || pathname.substr(1, 2))
  }, [params, pathname])

  return path.replace(':lang', lang)
}

export default usePathLocalization
