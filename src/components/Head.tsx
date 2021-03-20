import React from 'react';
import { Text } from 'react-native';
import { Header, Body, Left, Right, Button, Icon } from 'native-base';
import { StackHeaderProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, ScreenName, StackNavParams } from '../types'
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';

type RootRouteProp = RouteProp<RootStackParamList<StackNavParams>, ScreenName>;

export default function GFHead(props: StackHeaderProps | DrawerHeaderProps) {
    const route = props?.scene?.route as RootRouteProp

    if (route.params && 'navigation' in props) {
        const title = route.params.title;
        return <Header>
            <Left style={{ flex: 0 }}>
                {props.navigation && <Button transparent onPress={props.navigation.goBack}>
                    <Icon name='arrow-back' />
                </Button>}
            </Left>
            <Body><Text numberOfLines={1}>{title || '纯美苹果园'}</Text></Body>
            <Right style={{ flex: 0 }}>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Right>
        </Header>
    }

    return <Header></Header>
}
