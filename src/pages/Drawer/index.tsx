import { Alert, TouchableHighlight } from 'react-native';
import { Container, Text, View } from 'native-base';
import React, { useState } from 'react';
import UserAvatar from 'react-native-user-avatar';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { ScreenName } from '../../types';

export default function Drawer(props: DrawerContentComponentProps<DrawerContentOptions>) {
    const [userName, setUserName] = useState<string>('未登录');
    const [userImgSrc, setUserImgSrc] = useState<string | undefined>();
    return (
        <DrawerContentScrollView {...props}>
            <TouchableHighlight
                style={{ alignItems: 'flex-start' }}
                onPress={() => handleAvatarClick()}
            >
                <UserAvatar
                    name={userName.split('')[0]}
                    src={userImgSrc}
                    size={48}
                ></UserAvatar>
            </TouchableHighlight>
            <Text>{userName}</Text>
        </DrawerContentScrollView>
    );

    function handleAvatarClick() {
        // Alert.alert('hi')
        props.navigation.navigate(ScreenName.STACK, { screen: ScreenName.LOGIN, params: { title: '登录' } });
    }
}

