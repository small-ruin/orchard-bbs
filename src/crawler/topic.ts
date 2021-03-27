import cheerio from 'cheerio';
import { get } from './api';
import { html, parseHref } from '../utils';
import { Post, Poster, TopicData } from '../types'

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
    $('#top_subject, .post_wrapper, .attachments').each(function(this: Element) {
        let $node = $(this);
        if ($node.attr('id') === 'top_subject') {
            topicData.title = $node.text();
        }
        if ($node.hasClass('post_wrapper')) {
            const post: Partial<Post> = {}
            const $post = $node.find('.postarea');
            const $poster = $node.find('.poster');
            if ($post) {
                post.title = $post.find('h5 a').text().trim();
                post.content = html($, $post.find('.post')) || '';
            }
            if ($poster) {
                const poster:Partial<Poster> = {}
                poster.user = $poster.find('h4').text().trim();
                poster.avatar = parseHref($poster.find('img.avatar')?.attr('src') || '');
                poster.karma = $poster.find('.karma').text();
                poster.postGroup = $poster.find('.postgroup').text(); 
                poster.postCount = $poster.find('.postcount').text();
                post.poster = poster as Poster;
            }
            topicData.posts.push(post as Post);
        }
    })
    return topicData;
}