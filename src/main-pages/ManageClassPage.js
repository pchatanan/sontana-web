import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Map from '../components/google-map/Map'

const Card = styled.div`
    background: white;
    border-radius: 14px;
    margin: 7px;
    padding: 14px;
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
`

const ContentWrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
  }
`

const Container = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%,0);
  height: 100%;
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: lightgrey;
    overflow: auto;
    padding: 7px;
    box-sizing: border-box;
    flex: 1;
`
const BottomContainer = styled.div`
    background: blue;
    flex: 1;
`

const ManageClassPage = props => {
    const { user } = useSelector(state => state.global)
    const [classes, setClasses] = React.useState()
    React.useEffect(() => {
        firebase.firestore().collection('classes').where('d.owner', '==', user.uid).onSnapshot(querySnapshot => {
            if (!querySnapshot.empty) {
                var temp = []
                querySnapshot.forEach(doc => {
                    temp.push(doc.data())
                })
                setClasses(temp)
            }
        })
    }, [user.uid])

    const onMapLoad = React.useCallback(map => {
        console.log('map loaded')
    }, [])
    const options = React.useMemo(() => {
        return {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        }
    }, [])
    if (!classes) {
        return <div>Loading...</div>
    }
    if (classes.length === 0) {
        return <div>No class</div>
    }
    return <Container>
        <ContentWrapper>
            <TopContainer>
                {classes.map((myClass, index) => {
                    return <Card key={index}>
                        {myClass.d.name}
                    </Card>
                })}
            </TopContainer>
            <BottomContainer>
                <Map id='GOOGLE_MAP_HOME_PAGE' options={options} onMapLoad={onMapLoad} />
            </BottomContainer>
        </ContentWrapper>
    </Container>
}

export default ManageClassPage