import { Card, CardItem, H1, H2, List, ListItem, Body } from 'native-base';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getHomeData from '../../crawler/home';
import { Colors } from '../../commonStyle';
import { RootStackParamList } from '../../App'
import {BoardSectionData, LinkType} from '../../types'

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
    navigation: HomeScreenProp,
}

export default function Home({ navigation }: Props) {
    const [data, setData] = useState<BoardSectionData[]>([]);
    useEffect(() => {
        (async () => {
            setData(await getHomeData() || []);
        })()
    }, []);

    return <ScrollView
            style={styles.wrapper}
            contentInsetAdjustmentBehavior="automatic"
        >
            { 
                data.map(i => <Card style={styles.card} noShadow key={i.name}>
                    <CardItem header>
                        <Text style={styles.cardHeader}>{i.name}</Text>
                    </CardItem>
                    { i.infos?.map(info => <CardItem key={info.name}>
                        <Body>
                            <Text style={styles.linkHeader}>{ info.name }</Text>
                            <List style={styles.list}>
                                {
                                    info.links?.map(link => <ListItem key={link.text + link.href} onPress={() => link.href && jump(link.href, link.type)}>
                                        {
                                            <Text style={styles.link}>{link.text}</Text>
                                        }
                                    </ListItem>)
                                }
                            </List>
                        </Body>
                    </CardItem>)}
                </Card>)
            }
        </ScrollView>
    
    function jump(url: string, type: LinkType) {
        if (!url)
            return;
        if (type === 'board') {
            navigation.navigate('Board', { url });
        }
        if (type === 'topic') {
            navigation.navigate('Topic', { url });
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexGrow: 1,
    },
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