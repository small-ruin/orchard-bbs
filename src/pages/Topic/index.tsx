import React, {useEffect, useState} from 'react';
import { Text, ScrollView, useWindowDimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App'
import getTopicData, {TopicData} from '../../crawler/topic'
import { Card, CardItem } from 'native-base';
import HTML from "react-native-render-html";

type TopicScreenProp = StackNavigationProp<RootStackParamList, 'Topic'>;
type TopicRouteProp = RouteProp<RootStackParamList, 'Topic'>;
type Props = {
    navigation: TopicScreenProp,
    route: TopicRouteProp,
}

export default function Topic({ route, navigation }: Props) {
    const url = route.params?.url;
    const contentWidth = useWindowDimensions().width;
    const [data, setData] = useState<TopicData | undefined>(undefined)
    useEffect(async () => {
        const topicData = await getTopicData(url);
        setData(topicData);
        if (topicData?.title) {
            navigation.setParams({
                title: topicData.title,
            })
        }
    }, [])
    console.log(data)
    return (<ScrollView>
        {
            data?.posts.map(post => {
                return <Card>
                    <CardItem>
                     <HTML source={{ html: post }} contentWidth={contentWidth} />
                    </CardItem>
                </Card>
            })
        }
    </ScrollView>)
}