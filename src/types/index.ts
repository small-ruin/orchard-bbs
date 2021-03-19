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

interface TopicData {
    title: string,
    posts: string[],
}

enum ScreenName {
    HOME = 'Home',
    BOARD = 'Board',
    TOPIC = 'Topic',
}

type RootStackParamList = {
    Home: undefined,
    Board: { url: string, title?: string },
    Topic: { url: string, title?: string },
}

export type {
    BoardSectionData, Link, LinkType, Info, BoardData, TopicData, RootStackParamList
}

export {
    ScreenName
}