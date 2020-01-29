import styled from 'styled-components'

const ContentWidth = styled.div`
  width: 90vw;
  max-width: ${props => props.width || '400px'};
`

export default ContentWidth