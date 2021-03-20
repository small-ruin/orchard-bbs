import React, {useEffect, useState} from 'react';
import { Text, FlatList, useWindowDimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HTML from "react-native-render-html";
import getTopicData from '../../crawler/topic'
import { Body, Card, CardItem, Container } from 'native-base';
import { RootStackParamList, ScreenName, StackNavParams, TopicData } from '../../types';

type TopicScreenProp = StackNavigationProp<RootStackParamList<StackNavParams>, ScreenName.TOPIC>;
type TopicRouteProp = RouteProp<RootStackParamList<StackNavParams>, ScreenName.TOPIC>;
type Props = {
    navigation: TopicScreenProp,
    route: TopicRouteProp,
}

export default function Topic({ route, navigation }: Props) {
    const url = route.params?.url;
    console.log('topic', url);
    const [data, setData] = useState<TopicData | undefined>(undefined)
    const [contentWidth,setContentWidth] = useState<number>(useWindowDimensions().width)
    useEffect(() => {
        let topicData: TopicData | undefined;
        (async () => {
            topicData = await getTopicData(url);
            setData(topicData);
            if (topicData?.title) {
                navigation.setParams({
                    title: topicData.title,
                })
            }
            setContentWidth(useWindowDimensions().width);
        })();
    }, [])
    console.log(data)
    return (
        <Container>
            <FlatList
                data={data?.posts}
                renderItem={({item}) => <Card>
                    <CardItem>
                        <Body>
                            <HTML source={{ html: item }} contentWidth={contentWidth} />
                        </Body>
                    </CardItem>
                </Card>}
            >
            </FlatList>
        </Container>
    )
}