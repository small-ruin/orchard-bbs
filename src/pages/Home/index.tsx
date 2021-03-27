import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import getHomeData from '../../crawler/home';
import {BoardSectionData, RootStackParamList, ScreenName} from '../../types'
import { jump } from '../../utils';
import BoardSection from '../../components/BoardSection'
import { Accordion, Button, Container, Footer, FooterTab, Spinner, Text, View } from 'native-base';

type HomeScreenProp = StackNavigationProp<RootStackParamList<undefined>, ScreenName.HOME>;
type Props = {
    navigation: HomeScreenProp,
}

export default function Home({ navigation }: Props) {
    const [data, setData] = useState<BoardSectionData[]>([]);
    let [shouldShowSpinner, setShouldShowSpinner] = useState(true);
    useEffect(() => {
        (async () => {
            setData(await getHomeData() || []);
            setShouldShowSpinner(false)
        })()
    }, []);

    return <Container
            style={styles.wrapper}
        >
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
            >
                {
                    shouldShowSpinner && <Spinner></Spinner>
                }
                { 
                    data.map(i => <BoardSection
                        key={i.name + i.infos.map(j => j.name).join('')}
                        data={i}
                        onInfoClick={(link) => link.href && jump(navigation, link.href, link.type)}
                    ></BoardSection>)
                }
            </ScrollView>
        </Container>
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        // flexGrow: 1,
    }
})