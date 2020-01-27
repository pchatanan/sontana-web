import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../redux/actions';
import CenterContainer from '../ui/CenterContainer';
import Form from '../ui/Form';
import ContentWidth from '../ui/ContentWidth';
import PlaceAutoComplete from '../components/google-map/PlaceAutoComplete';
import Button from '../ui/Button';
import Input from '../components/form-items/Input';

const AddClassPage = props => {
    const [place, setPlace] = React.useState()
    const { className } = useSelector(state => state.createClassPage)
    const { user } = useSelector(state => state.global)
    const onLoad = React.useCallback(autocomplete => {
        autocomplete.addListener('place_changed', () => {
            setPlace(autocomplete.getPlace())
        })
        console.log('loaded')
    }, [])
    const onFormSubmit = React.useCallback(e => {
        const firestore = firebase.firestore();
        const geofirestore = new GeoFirestore(firestore);
        const geocollection = geofirestore.collection('classes');
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        geocollection.add({
            name: className,
            owner: user.uid,
            coordinates: new firebase.firestore.GeoPoint(lat, lng)
        })
        e.preventDefault()
    }, [className, user.uid, place])
    const dispatch = useDispatch()
    return <CenterContainer>
        <ContentWidth>
            <Form onSubmit={onFormSubmit}>
                <div>
                    <Input label='Class name' value={className} onChange={newClassName => { dispatch(setText('className', newClassName)) }} />
                </div>
                <PlaceAutoComplete options={{
                    componentRestrictions: { country: 'th' }
                }} onLoad={onLoad} />
                <Button type='submit'>Add Class</Button>
            </Form>
        </ContentWidth>
    </CenterContainer>
}

export default AddClassPage