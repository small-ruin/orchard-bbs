import { TouchableHighlight } from 'react-native';
import { Container, Text, View } from 'native-base';
import React, { Component, createRef, useState } from 'react';
import Drawer, { DrawerProperties } from 'react-native-drawer';
import UserAvatar from 'react-native-user-avatar';

interface State {
    userName: string,
    userImgSrc?: string,
}

const DRAW_OFFSET = 200;

export default class GFDrawer extends Component<DrawerProperties, State> {
    constructor(props: DrawerProperties) {
        super(props);
        this.state = {
            userName: '未登录'
        }
    }

    handleAvatarClick() {}

    render() {
        const {userName, userImgSrc} = this.state;
        return (
            <Drawer
                {...this.props}
                openDrawerOffset={DRAW_OFFSET}
                open={true}
            >
                <TouchableHighlight
                    style={{alignItems: 'flex-start', width: DRAW_OFFSET}}
                    onPress={() => this.handleAvatarClick()}
                >
                    <UserAvatar
                        name={userName.split('')[0]}
                        src={userImgSrc}
                        size={48}
                    ></UserAvatar>
                </TouchableHighlight>
                <Text>{userName}</Text>
            </Drawer>
        );
    }
}
