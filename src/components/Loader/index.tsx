import {FC, PropsWithoutRef} from 'react'
import {LoaderWrapper, LoaderCircle, LoaderProps} from './styled'

const Loader: FC<LoaderProps> = (props: PropsWithoutRef<LoaderProps>) => (
  <LoaderWrapper {...props}>
      {Array.from({ length: 5}).map((item, i) => <LoaderCircle key={i} />)}
  </LoaderWrapper>
)

export default Loader
