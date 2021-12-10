import React, {useEffect, useState} from 'react';
import { Text, FlatList, useWindowDimensions, StyleSheet, Dimensions, ScaledSize } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HTML from "react-native-render-html";
import getTopicData from '../../crawler/topic'
import { Body, Card, CardItem, Container, Spinner, Toast, View } from 'native-base';
import { RootStackParamList, ScreenName, StackNavParams, TopicData } from '../../types';
import { Colors } from '../../commonStyle';
import { urlChangePage } from '../../utils';
import { useSwipe } from '../../hooks';
import { ScrollView } from 'react-native-gesture-handler';

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
    const [shouldShowSpinner, setShouldShowSpinner] = useState(true);
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    let windowDimensions = useWindowDimensions()

    function onSwipeLeft() {
        if (data?.page) {
            let { now, total } = data.page;
            if (now >= total) {
                Toast.show({ text: '已经到最后一页了！' });
            } else {
                const newUrl = urlChangePage(url, ++now)
                navigation.push(ScreenName.TOPIC, { url: newUrl });
            }
        }
    }
    function onSwipeRight() {
        if (data?.page) {
            const { now, total } = data.page;
            if (now === 1) {
                Toast.show({ text: '已经是第一页了！' });
            } else {
                navigation.goBack();
            }
        }
    }
    
    useEffect(() => {
        getTopicData(url).then(data => {
            setData(data);
            if (data?.title) {
                navigation.setParams({
                    title: data.title,
                })
            }
            setShouldShowSpinner(false);
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
        <Container >
            { shouldShowSpinner && <Spinner  /> }
            <FlatList
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                data={data?.posts}
                keyExtractor={(item, idx) => item.time || idx + ''}
                renderItem={({item}) => <Card style={styles.card} >
                    <CardItem header style={[styles.cardItem, styles.cardTitleItem]} bordered>
                            <Text style={styles.postTitle} numberOfLines={1}>{ item.title }</Text>
                            <View style={styles.userWrapper}>
                                <Text style={[styles.userItem, { marginLeft: 0 }]}>{ item.poster.user }</Text>
                                <Text style={styles.userItem}>{ item.poster.postGroup }</Text>
                                <Text style={styles.userItem}>{ item.poster.postCount }</Text>
                            </View>
                            <Text style={[styles.userItem, { marginLeft: 0 }]}>{item.time}</Text>
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
        color: Colors.White,
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
        color: Colors.White,
        marginLeft: 5,
        lineHeight: 18,
    }
})