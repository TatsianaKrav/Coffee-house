export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: INews[];
}

export interface INews {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
}
