
export type Language = 'KR' | 'EN';

export type PortfolioCategory = '오리지널 및 개인 프로젝트' | '보컬 디렉팅 및 믹스마스터링' | '믹스마스터' | '라이브 사운드 오퍼레이팅' | '상업음악';

export interface PortfolioItem {
    id: number;
    category: PortfolioCategory;
    image: string;
    title: string;
    role: string;
    date: string;
    youtubeId?: string;
}

export interface Client {
    name: string;
    logo: string;
}