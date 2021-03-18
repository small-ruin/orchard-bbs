import { get } from './api';
import { HOME } from './urls';

async function getHomeData() {
    try {
        const res = get(HOME);
    } catch (e) {
        console.error(e);
    }
}

function analysis(htmlStr: string) {
}

