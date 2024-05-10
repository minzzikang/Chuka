import styled from 'styled-components'; 
import NotificationListItem from './NotificationListItem';

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

const NotificationList = () => {
    const 

    return (
        <Container>
            <NotificationListItem/>
        </Container>
    );
};

export default NotificationList;