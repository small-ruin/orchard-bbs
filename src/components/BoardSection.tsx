import { Body, Card, CardItem, List, ListItem, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../commonStyle';
import { BoardSectionData, Link } from '../types';

interface Props {
    data: BoardSectionData,
    onInfoClick: (link: Link) => void,
}
export default function BoardSection({ data, onInfoClick }: Props) {
   const isSingleInfo = data.infos.length === 1;
    return (
        <Card style={styles.card} noShadow key={data.name}>
            <CardItem header  style={styles.cardHeader}>
                <Text style={styles.cardHeaderText}>{data.name}</Text>
            </CardItem>
            { data.infos.filter(info => info.links)?.map(info => <CardItem style={styles.cardBodyContainer} key={info.name}>
                {!isSingleInfo && <Text style={styles.linkHeader}>{ info.name }</Text>}
                <List style={styles.list}>
                    {
                        info.links?.map((link, idx) => <ListItem
                            key={(link.text || idx) + (link.href || '')}
                            onPress={() => onInfoClick(link)}>
                            {
                                <Text style={styles.link}>{link.text}</Text>
                            }
                        </ListItem>)
                    }
                </List>
            </CardItem>)}
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    cardHeader: {
        backgroundColor: '#2e5c6e',
    },
    cardHeaderText: {
        color: '#fff',
        fontFamily: 'PingFangSC-Medium',
    },
    cardBodyContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    list: {
        flex: 1,
    },
    linkHeader: {
        color: '#2b5f75',
    },
    link: {
        color: Colors.darker
    }
})