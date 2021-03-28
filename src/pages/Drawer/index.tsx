import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { ScreenName } from '../../types';
import { Colors, FontFamily } from '../../commonStyle';

interface Props extends DrawerContentComponentProps<DrawerContentOptions> {
    username: string,
}

export default function Drawer(props: Props) {
    return (
        <DrawerContentScrollView {...props}>
            <TouchableOpacity
                style={{ alignItems: 'flex-start' }}
                onPress={() => handleAvatarClick()}
            >
                <Text style={styles.avatar}>{props.username}</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );

    function handleAvatarClick() {
        props.navigation.navigate(ScreenName.STACK, { screen: ScreenName.LOGIN, params: { title: '登录' } });
    }
}

const styles = StyleSheet.create({
    avatar: {
        fontSize: 24,
        fontFamily: FontFamily.medium,
        color: Colors.DarkGreyBlue_蓝鼠,
        marginLeft: 10
    }
})

