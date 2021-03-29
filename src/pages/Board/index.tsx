import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { List, ListItem, Toast } from 'native-base';
import getBoardData from '../../crawler/board';
import { BoardData, RootStackParamList, ScreenName, StackNavParams } from '../../types';
import { jump, urlChangePage } from '../../utils';
import BoardSection from '../../components/BoardSection';
import { useSwipe } from '../../hooks';

type BoardNavProp = StackNavigationProp<RootStackParamList<StackNavParams>, ScreenName.BOARD>;
type BoardRouteProp = RouteProp<RootStackParamList<StackNavParams>, ScreenName.BOARD>;
type Props = {
    navigation: BoardNavProp,
    route: BoardRouteProp,
}

export default function Board({route, navigation}: Props) {
    const url = route.params?.url;
    console.log('board', url)
    const [data, setData] = useState<BoardData | undefined>();
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft() {
        if (data?.page) {
            let { now, total } = data.page;
            if (now >= total) {
                Toast.show({ text: '已经到最后一页了！' });
            } else {
                const newUrl = urlChangePage(url, ++now)
                navigation.push(ScreenName.BOARD, { url: newUrl });
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
        let boardData: BoardData | undefined;
        (async () => {
            boardData = await getBoardData(url);
            setData(boardData);
            if (boardData?.title) {
                navigation.setParams({
                    title: boardData.title,
                })
            }
        })();
    }, [])
    return (<ScrollView onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {data?.subBoards.map(i => {
            return <BoardSection
                data={i}
                onInfoClick={link => link.href && jump(navigation, link.href, link.type)}
            ></BoardSection>
        })}
        <List>
            {
                data?.topics.map(topic => {
                    return <ListItem onPress={() => {
                            console.log('====info====press')
                            topic.href && jump(navigation, topic.href, topic.type)
                        }}>
                        <Text>{topic.text}</Text>
                    </ListItem>
                })
            }
        </List>
    </ScrollView>)
}