import {HOME} from '../crawler/urls';
import { LinkType } from '../types';

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