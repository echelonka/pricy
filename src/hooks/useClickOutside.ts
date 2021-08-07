import { useEffect, RefObject } from 'react'

type AnyEvent = MouseEvent | TouchEvent

const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: (event: AnyEvent) => void): void => {
  useEffect(() => {
    const listener = (event: AnyEvent): void => {
      const element = ref.current

      if (element && !element.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [callback, ref])
}

export default useClickOutside
