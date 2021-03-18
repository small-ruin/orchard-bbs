import {HOME} from '../crawler/urls';

export function parseHref(href: string) {
    if (href.match(/^\?/)) return HOME + href;
    if (href.match(/^index.php\?/)) return href.replace(/index.php/, HOME);
}

export function html($: cheerio.Root, $node: cheerio.Cheerio) {
    return $('<div>').append($node.clone()).html()
}