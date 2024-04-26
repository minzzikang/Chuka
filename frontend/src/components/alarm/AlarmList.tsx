import styled from 'styled-components'; 
import AlarmListItem from './AlarmListItem';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        background: transparent;
        -webkit-appearance: none;
    }
`

const AlarmList = () => {
    return (
        <Container>
            <AlarmListItem/>

        </Container>
    );
};

export default AlarmList;