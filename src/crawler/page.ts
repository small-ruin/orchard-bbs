import { Page } from "../types";

export default function getPage($: cheerio.Root): Page | undefined {
    const $page = $('.pagesection .pagelinks.align_left');

    const now = +$page.find('strong').first().text()
    let total = 1;
    $page.find('a.navPages').each(function(this: Element) {
        const $node = $(this);
        const current = parseInt($node.text());
        if (!isNaN(current) && total < current) {
            total = current;
        }
    })

    if (!isNaN(now)) {
        return {
            now, total
        }
    }
}