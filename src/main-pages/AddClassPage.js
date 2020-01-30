import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import { useSelector } from 'react-redux'
import CenterContainer from '../ui/CenterContainer';
import Form from '../ui/Form';
import ContentWidth from '../ui/ContentWidth';
import PlaceAutoComplete from '../components/google-map/PlaceAutoComplete';
import Button from '../ui/Button';
import Input from '../components/form-items/Input';

const AddClassPage = props => {
    const [place, setPlace] = React.useState()
    const [className, setClassName] = React.useState('')
    const { user } = useSelector(state => state.global)

    const onLoad = React.useCallback(autocomplete => {
        autocomplete.addListener('place_changed', () => {
            setPlace(autocomplete.getPlace())
        })
        console.log('loaded')
    }, [])
    const onFormSubmit = React.useCallback(setSubmitting => {
        const firestore = firebase.firestore();
        const geofirestore = new GeoFirestore(firestore);
        const geocollection = geofirestore.collection('classes');
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        geocollection.add({
            name: className,
            owner: user.uid,
            coordinates: new firebase.firestore.GeoPoint(lat, lng)
        }).then((geoDocumentRef) => {
            setSubmitting(false)
            props.history.push('/manage_classes')
        })
            .catch(reason => {
                console.log(reason)
                setSubmitting(false)
            })
    }, [className, user.uid, place, props.history])

    const onClassNameChange = React.useCallback(newClassName => { setClassName(newClassName) }, [setClassName])

    const placeOptions = React.useMemo(() => {
        return {
            componentRestrictions: { country: 'th' }
        }
    }, [])

    return <CenterContainer>
        <ContentWidth>
            <Form onSubmit={onFormSubmit}>
                <Input label='Class name' value={className} onChange={onClassNameChange} />
                <PlaceAutoComplete options={placeOptions} onLoad={onLoad} />
                <Button type='submit' text='Add Class' disabledText='Uploading class...' />
            </Form>
        </ContentWidth>
    </CenterContainer>
}

export default AddClassPage