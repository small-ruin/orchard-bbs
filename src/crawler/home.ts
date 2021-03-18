import cheerio from 'cheerio';
import { get } from './api';
import { HOME } from './urls';
import { parseHref } from '../utils'

export interface HomeSectionData {
    name: string,
    infos: Info[],
}
interface Info {
    name: string,
    links?: Link[]
}
interface Link {
    text: string,
    href: string | undefined,
}

export default async function getHomeData() {
    try {
        const res = await get(HOME);
        return analysis(res.data);
    } catch (e) {
        console.error(e);
    }
}

let targetSection: HomeSectionData | null = null, targetInfo: Info | null = null;

function analysis(htmlStr: string) {
    const arr: HomeSectionData[] = []
    const $ = cheerio.load(htmlStr);
    $('.catbg, .info, .children.windowbg').each(function(i) {
        const $this = $(this);
        if ($this.hasClass('catbg')) {
            targetSection = {
                name: $this.text(),
                infos: []
            }
            arr.push(targetSection)
        }

        if ($this.hasClass('info')) {
            targetInfo = {
                name: $this.find('.subject').text(),
            }
            targetSection?.infos.push(targetInfo);
            if ($this.find('a').length) {
                $this.find('a').each(function() {
                    let $a = $(this), text = $a.text(), href = $a.attr('href');
                    if (href) {
                        // 个人信息不显示
                        if (href.match(/action=profile/))
                            return;
                        href = parseHref(href);
                    }
                    const a = {
                        text,
                        href,
                    }
                    if (targetInfo) {
                        targetInfo.links ? targetInfo.links.push(a) : (targetInfo.links = [a])
                    }
                })
            }
        }
    })
    return arr;
}
