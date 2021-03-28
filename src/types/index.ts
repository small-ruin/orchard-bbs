interface BoardSectionData {
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
    type: LinkType | undefined,
}

type LinkType = 'board' | 'topic' | undefined;

interface BoardData {
    title: string,
    subBoards: BoardSectionData[],
    topics: Link[],
}

interface Post {
    title: string,
    poster: Poster,
    time?: string,
    content: string,
}
interface Poster {
    user: string,
    postGroup: string,
    avatar?: string,
    postCount: string,
    karma: number | string,
}
interface TopicData {
    title: string,
    posts: Post[],
}

enum ScreenName {
    HOME = 'Home',
    BOARD = 'Board',
    TOPIC = 'Topic',
    STACK = 'Stack',
    LOGIN = 'LOGIN',
}

interface StackNavParams {
    url: string,
    title?: string, 
}
interface DrawerNavParams {
    params: StackNavParams,
    screen: ScreenName
}

type RootStackParamList<T> = Record<ScreenName, T>

export type {
    BoardSectionData, Link, LinkType, Info, BoardData, TopicData, RootStackParamList, StackNavParams, DrawerNavParams,
    Post, Poster,
}

export {
    ScreenName
}