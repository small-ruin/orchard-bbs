import { StackNavigationProp } from '@react-navigation/stack';
import {Urls} from '../crawler/urls';
import { DrawerNavParams, LinkType, RootStackParamList, ScreenName, StackNavParams } from '../types';

const {HOME, HOST} = Urls;

export function parseHref(href: string) {
    if (href.match(/^\?/)) return HOME + href;
    if (href.match(/^index.php\?/)) return href.replace(/index.php/, HOME);
    if (href.match(/^\//)) return HOST + href;
    return undefined;
}

export function getLinkTypeFromHref(href: string): LinkType {
    if (href.match(/board/))
        return 'board';
    if (href.match(/topic/))
        return 'topic';
}
export function html($: cheerio.Root, $node: cheerio.Cheerio) { 
    return $('<div>').append($node.clone()).html()
}
export function jump(navigation: StackNavigationProp<RootStackParamList<DrawerNavParams | StackNavParams | undefined>, ScreenName>, url: string, type: LinkType) {
    if (!url)
        return;
    if (type === 'board') {
        navigation.navigate(ScreenName.STACK, { params: { url }, screen: ScreenName.BOARD });
    }
    if (type === 'topic') {
        navigation.navigate(ScreenName.STACK, { params: { url }, screen: ScreenName.TOPIC });
    }
}