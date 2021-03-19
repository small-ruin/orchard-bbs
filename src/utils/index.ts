import { StackNavigationProp } from '@react-navigation/stack';
import {HOME} from '../crawler/urls';
import { LinkType, RootStackParamList, ScreenName } from '../types';

export function parseHref(href: string) {
    if (href.match(/^\?/)) return HOME + href;
    if (href.match(/^index.php\?/)) return href.replace(/index.php/, HOME);
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
export function jump(navigation: StackNavigationProp<RootStackParamList, ScreenName>, url: string, type: LinkType) {
    if (!url)
        return;
    if (type === 'board') {
        navigation.navigate('Board', { url });
    }
    if (type === 'topic') {
        navigation.navigate('Topic', { url });
    }
}