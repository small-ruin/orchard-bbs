import cheerio from 'cheerio';
import { get } from './api';
import { Urls } from './urls';
import { parseHref, getLinkTypeFromHref } from '../utils'
import { BoardSectionData, LinkType, Info } from '../types'
import { user } from '../store'

export default async function getHomeData() {
    try {
        const res = await get(Urls.HOME);
        return analysisBoardSection(res.data);
    } catch (e) {
        console.error(e);
    }
}

let targetSection: BoardSectionData | null = null, targetInfo: Info | null = null;

export function analysisBoardSection(htmlStr: string) {
    const arr: BoardSectionData[] = []
    const $ = cheerio.load(htmlStr);
    // 用户名
    user.setUserName($('.greeting').text().replace(/^您好 /, ''));
    // 首页内容
    $('.catbg, .info, .children.windowbg').each(function(this: Element) {
        const $this = $(this);
        if ($this.hasClass('catbg')) {
            targetSection = {
                name: $this.text().replace(/未读帖子/, '').trim(),
                infos: []
            }
            arr.push(targetSection)
        }

        if ($this.hasClass('info')) {
            targetInfo = {
                name: $this.find('.subject').text().trim(),
            }
            targetSection?.infos.push(targetInfo);
            if ($this.find('a').length) {
                $this.find('a').each(function(this: Element) {
                    let $a = $(this), text = $a.text().trim(), href = $a.attr('href'), type: LinkType;
                    if (href) {
                        // 个人信息不显示
                        if (href.match(/action=profile/))
                            return;

                        if (href === '') {
                            console.error('!!! 发现空链接！')
                        } 

                        const a = {
                            text,
                            href: parseHref(href),
                            type: getLinkTypeFromHref(href),
                        }
                        if (targetInfo) {
                            targetInfo.links ? targetInfo.links.push(a) : (targetInfo.links = [a])
                        }
                    }
                })
            }
        }
    })
    return arr;
}
