import cheerio from 'cheerio';
import { get } from './api';
import { parseHref } from '../utils';
import { analysisBoardSection } from './home';
import { BoardData, Link } from '../types';


export default async function getBoardData(url: string): Promise<BoardData | undefined> {
    try {
        const res = await get(url);
        return analysis(res.data) as BoardData;
    } catch (e) {
        console.error(e);
    }
}

function analysis(htmlStr: string) {
    const $ = cheerio.load(htmlStr);
    const boardData: BoardData = { title: '', topics: [], subBoards: analysisBoardSection(htmlStr) };
    $('td.subject span a').each(function(this: Element) {
        let $node = $(this);
        let topic: Partial<Link> = {};
        topic.text = $node.text();
        topic.href = parseHref($(this).attr('href') || '');
        topic.type = 'topic';

        if (topic.href) {
            boardData.topics.push(topic as Link);
        }
    })
    return boardData;
}