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
    subBoard: BoardSectionData[],
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

export type {
    BoardSectionData, Link, LinkType, Info, BoardData, TopicData, ScreenName
}