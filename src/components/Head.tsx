import React from 'react';
import { Text } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';
import { StackHeaderProps } from '@react-navigation/stack';

export default function GFHead(props: StackHeaderProps) {
    const title = props?.scene?.route?.params?.title;
    return <Header>
        <Left style={{flex: 0}}>
        <Button transparent onPress={props.navigation.goBack}>
            <Icon name='arrow-back' />
        </Button>
        </Left>
        <Body><Text numberOfLines={1}>{ title || '纯美苹果园' }</Text></Body>
        <Right style={{flex: 0}}>
        <Button transparent>
            <Icon name='menu' />
        </Button>
        </Right>
    </Header>
}
