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
    return (
        <Card style={styles.card} noShadow key={data.name}>
            <CardItem header>
                <Text style={styles.cardHeader}>{data.name}</Text>
            </CardItem>
            { data.infos?.map(info => <CardItem key={info.name}>
                <Body>
                    <Text style={styles.linkHeader}>{ info.name }</Text>
                    <List style={styles.list}>
                        {
                            info.links?.map(link => <ListItem
                                key={link.text + link.href}
                                onPress={() => onInfoClick(link)}>
                                {
                                    <Text style={styles.link}>{link.text}</Text>
                                }
                            </ListItem>)
                        }
                    </List>
                </Body>
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
        color: Colors.primary,
    },
    list: {
        flex: 1,
    },
    linkHeader: {
        color: Colors.dark,
    },
    link: {
        color: Colors.darker
    }
})