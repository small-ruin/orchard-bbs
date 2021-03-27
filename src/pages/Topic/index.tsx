import React, {useEffect, useState} from 'react';
import { Text, FlatList, useWindowDimensions, StyleSheet, Dimensions, ScaledSize } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HTML from "react-native-render-html";
import getTopicData from '../../crawler/topic'
import { Body, Card, CardItem, Container, Spinner, Toast, View } from 'native-base';
import { RootStackParamList, ScreenName, StackNavParams, TopicData } from '../../types';
import { Colors } from '../../commonStyle';

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
    let [shouldShowSpinner, setShouldShowSpinner] = useState(true);

    let windowDimensions = useWindowDimensions()
    useEffect(() => {
        getTopicData(url).then(data => {
            setData(data);
            if (data?.title) {
                navigation.setParams({
                    title: data.title,
                })
            }
            setShouldShowSpinner(false);
            console.log(data?.posts.map(i => i.poster))
        }, err => {
            Toast.show({ text: err});
        })

        const handler = ({ window }: {window: ScaledSize}) => {
            setContentWidth(window.width);
        }

        Dimensions.addEventListener('change', handler);

        return () => {
            Dimensions.removeEventListener('change', handler);
        }
    }, [])
    return (
        <Container>
            { shouldShowSpinner && <Spinner  /> }
            <FlatList
                data={data?.posts}
                renderItem={({item}) => <Card style={styles.card} >
                    <CardItem header style={[styles.cardItem, styles.cardTitleItem]} bordered>
                            <Text style={styles.postTitle} numberOfLines={1}>{ item.title }</Text>
                            <View style={styles.userWrapper}>
                                <Text style={[styles.userItem, { marginLeft: 0 }]}>{ item.poster.user }</Text>
                                <Text style={styles.userItem}>{ item.poster.postGroup }</Text>
                                <Text style={styles.userItem}>{ item.poster.postCount }</Text>
                            </View>
                    </CardItem>
                    <CardItem style={styles.cardItem}>
                        <Body>
                            <HTML source={{ html: item.content }} contentWidth={contentWidth} />
                        </Body>
                    </CardItem>
                </Card>}
            >
            </FlatList>
        </Container>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowOpacity: 0,
    },
    cardItem: {
        backgroundColor: '#fefefe',
        borderColor: Colors.GreyBlue_舛花,
        borderWidth: 0.5,
        borderRadius: 0,
        shadowOpacity: 0,
        borderTopWidth: 0,
    },
    cardTitleItem: {
        backgroundColor: Colors.GreyBlue_舛花,
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'flex-start'
    },
    postTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'PingFangSC-Medium'
    },
    userWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 3,
    },
    userItem: {
        color: '#fffffb',
        marginLeft: 5,
        lineHeight: 18,
    }
})