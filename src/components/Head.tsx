import React from 'react';
import { Text } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';

export default function GFHead() {
    return <Header>
        <Left>
        <Button transparent>
            <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body><Text>纯美苹果园</Text></Body>
        <Right>
        <Button transparent>
            <Icon name='menu' />
        </Button>
        </Right>
    </Header>
}
