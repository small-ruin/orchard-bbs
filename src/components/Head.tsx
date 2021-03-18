import React from 'react';
import { Text } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';
import { StackHeaderProps } from '@react-navigation/stack';

export default function GFHead(props: StackHeaderProps) {
    return <Header>
        <Left>
        <Button transparent onPress={props.navigation.goBack}>
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
