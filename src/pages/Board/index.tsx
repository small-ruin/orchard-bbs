import React from 'react';
import { Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'

type BoardNavProp = StackNavigationProp<RootStackParamList, 'Board'>;
type BoardRouteProp = RouteProp<RootStackParamList, 'Board'>;
type Props = {
    navigation: BoardNavProp,
    route: BoardRouteProp,
}

export default function Board({route, navigation}: Props) {
    const url = route.params?.url;
    return (<ScrollView>
        <Text>board</Text>
    </ScrollView>)
}