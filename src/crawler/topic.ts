import cheerio from 'cheerio';
import { get } from './api';
import { html } from '../utils';

export interface TopicData {
    title: string,
    posts: string[],
}

export default async function getTopicData(url: string): Promise<TopicData | undefined> {
    try {
        const res = await get(url);
        return analysis(res.data) as TopicData;
    } catch (e) {
        console.error(e);
    }
}

function analysis(htmlStr: string) {
    const $ = cheerio.load(htmlStr);
    const topicData: TopicData = { title: '', posts: []}
    $('#top_subject, .post, .poster, .attachments').each(function() {
        let $node = $(this);
        if ($node.attr('id') === 'top_subject') {
            topicData.title = $node.text();
        }
        if ($node.hasClass('post')) {
            topicData.posts.push(html($, $node) || '')
        }
    })
    return topicData;
}