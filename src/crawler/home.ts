import { get } from './api';
import { HOME } from './urls';

get(HOME).then(res => console.log(res)).catch(e => console.error(e));