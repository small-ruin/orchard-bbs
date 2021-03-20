import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getHomeData from '../../crawler/home';
import { Colors } from '../../commonStyle';
import {BoardSectionData, RootStackParamList, ScreenName, StackNavParams} from '../../types'
import { jump } from '../../utils';
import BoardSection from '../../components/BoardSection'

type HomeScreenProp = StackNavigationProp<RootStackParamList<undefined>, ScreenName.HOME>;
type Props = {
    navigation: HomeScreenProp,
}

export default function Home({ navigation }: Props) {
    const [data, setData] = useState<BoardSectionData[]>([]);
    useEffect(() => {
        (async () => {
            // setData(await getHomeData() || []);
        })()
    }, []);

    return <ScrollView
            style={styles.wrapper}
            contentInsetAdjustmentBehavior="automatic"
        >
            { 
                data.map(i => <BoardSection
                    key={i.name + i.infos.map(j => j.name).join('')}
                    data={i}
                    onInfoClick={(link) => link.href && jump(navigation, link.href, link.type)}
                ></BoardSection>)
            }
        </ScrollView>
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexGrow: 1,
    }
})