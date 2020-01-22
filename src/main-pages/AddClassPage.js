import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../redux/actions';
import CenterContainer from '../ui/CenterContainer';
import Form from '../ui/Form';
import ContentWidth from '../ui/ContentWidth';
import PlaceAutoComplete from '../components/google-map/PlaceAutoComplete';
import Button from '../ui/Button';

const AddClassPage = props => {
    const { className } = useSelector(state => state.createClassPage)
    const autocompleteRef = React.useRef()
    const onLoad = React.useCallback(autocomplete => {
        autocomplete.addListener('place_changed', () => {
            console.log(autocomplete.getPlace())
        })
        autocompleteRef.current = autocomplete
        console.log('loaded')
    }, [])
    const onFormSubmit = React.useCallback(e => {
        console.log(autocompleteRef.current.getPlace())
        e.preventDefault()
    }, [])
    const dispatch = useDispatch()
    return <CenterContainer>
        <ContentWidth>
            <Form onSubmit={onFormSubmit}>
                <div>
                    <label>
                        <div>Class name</div>
                        <input type='text' value={className} onChange={text => { dispatch(setText('className', text)) }} />
                    </label>
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