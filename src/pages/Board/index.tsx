import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { List, ListItem } from 'native-base';
import getBoardData from '../../crawler/board';
import { BoardData, RootStackParamList, ScreenName, StackNavParams } from '../../types';
import { jump } from '../../utils';
import BoardSection from '../../components/BoardSection';

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

    useEffect(() => {
        let boardData: BoardData | undefined;
        (async () => {
            boardData = await getBoardData(url);
            console.log(boardData)
            setData(boardData);
            if (boardData?.title) {
                navigation.setParams({
                    title: boardData.title,
                })
            }
        })();
    }, [])
    return (<ScrollView>
        {data?.subBoards.map(i => {
            return <BoardSection
                data={i}
                onInfoClick={link => link.href && jump(navigation, link.href, link.type)}
            ></BoardSection>
        })}
        <List>
            {
                data?.topics.map(topic => {
                    return <ListItem onPress={() => topic.href && jump(navigation, topic.href, topic.type)}>
                        <Text>{topic.text}</Text>
                    </ListItem>
                })
            }
        </List>
    </ScrollView>)
}