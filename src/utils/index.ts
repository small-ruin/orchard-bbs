import {HOME} from '../crawler/urls'

export function parseHref(href: string) {
    if (href.match(/^\?/)) return HOME + href;
    if (href.match(/^index.php\?/)) return href.replace(/index.php/, HOME);
}