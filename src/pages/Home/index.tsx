import { Card, CardItem, H1, H2, List, ListItem, Body } from 'native-base';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import getHomeData, {HomeSectionData} from '../../crawler/home';
import commonStyles, { Colors } from '../../commonStyle';

export default function Home() {
    const [data, setData] = useState<HomeSectionData[]>([]);
    useEffect(async () => {
        setData(await getHomeData() || []);
    }, []);
    console.log(data);
    return <View style={styles.wrapper}>
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
                            info.links?.map(link => <ListItem key={link.text + link.href}>
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
    </View>
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