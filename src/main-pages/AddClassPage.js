import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setText } from '../redux/actions';
import CenterContainer from '../ui/CenterContainer';
import TextInput from '../components/form-items/TextInput';
import ContentWidth from '../ui/ContentWidth';

const AddClassPage = props => {
    const { className } = useSelector(state => state.createClassPage)
    const dispatch = useDispatch()
    return <CenterContainer>
        <ContentWidth>
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
            <TextInput label='class name' value={className} onChange={text => { dispatch(setText('className', text)) }} />
        </ContentWidth>
    </CenterContainer>
}

export default AddClassPage