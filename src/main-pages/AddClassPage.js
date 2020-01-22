import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../redux/actions';
import CenterContainer from '../ui/CenterContainer';
import Form from '../ui/Form';
import TextInput from '../components/form-items/TextInput';
import ContentWidth from '../ui/ContentWidth';
import PlaceSelector from '../components/google-map/PlaceSelecter';

const AddClassPage = props => {
    const { className } = useSelector(state => state.createClassPage)
    const dispatch = useDispatch()
    return <CenterContainer>
        <ContentWidth>
            <Form>
                <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
                <PlaceSelector />
            </Form>
        </ContentWidth>
    </CenterContainer>
}

export default AddClassPage