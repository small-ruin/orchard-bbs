import React from 'react';
import { Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'

type TopicScreenProp = StackNavigationProp<RootStackParamList, 'Topic'>;
type TopicRouteProp = RouteProp<RootStackParamList, 'Topic'>;
type Props = {
    navigation: TopicScreenProp,
    route: TopicRouteProp,
}

export default function Topic({ route }: Props) {
    const url = route.params?.url;
    return (<ScrollView>
        <Text>topic</Text>
    </ScrollView>)
}