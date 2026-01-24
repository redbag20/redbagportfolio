import type { PortfolioItem, Client, Language, PortfolioCategory } from '../types';

const portfolioItems: PortfolioItem[] = [
    { id: 1, category: '오리지널곡', image: 'https://picsum.photos/seed/music1/500/500', title: 'Self-Titled Album', role: 'Composition, Arrangement', date: '2023.10', youtubeId: 'dQw4w9WgXcQ' },
    { id: 2, category: '오리지널곡', image: 'https://picsum.photos/seed/music2/500/500', title: 'Digital Single "Echoes"', role: 'Composition', date: '2024.01', youtubeId: '3tmd-ClpJxA' },
    { id: 9, category: '오리지널곡', image: 'https://picsum.photos/seed/norazo/500/500', title: 'Norazo Remix Contest Winner', role: 'Remix, Arrangement', date: '2022.08', youtubeId: '0-q1KafFCLU' },
    
    { id: 3, category: '믹스마스터', image: 'https://picsum.photos/seed/vtuber1/500/500', title: 'VTuber Cover Song', role: 'Mix, Mastering', date: '2023.12', youtubeId: 'C-u5WLJ9Yk4' },
    { id: 8, category: '믹스마스터', image: 'https://picsum.photos/seed/mastering1/500/500', title: 'Indie Band EP', role: 'Mastering Engineer', date: '2024.03', youtubeId: 'fJ9rUzIMcZQ' },
    
    { id: 4, category: '라이브 사운드 오퍼레이팅', image: 'https://picsum.photos/seed/live1/500/500', title: 'Virtual Concert Live Sound', role: 'Live Sound Mix', date: '2024.02', youtubeId: 'L-iepuo0_kI' },

    { id: 5, category: '상업음악', image: 'https://picsum.photos/seed/game1/500/500', title: 'Splatoon Fan Remix', role: 'Remix, Sound Design', date: '2023.11', youtubeId: '5-_BvV_9_5E' },
    { id: 6, category: '상업음악', image: 'https://picsum.photos/seed/scon1/500/500', title: 'Scon Broadcast Content', role: 'BGM, Sound FX', date: 'Ongoing', youtubeId: 'sB6HY8r983I' },
    { id: 7, category: '상업음악', image: 'https://picsum.photos/seed/eastgames/500/500', title: 'Eastgames Project BGM', role: 'BGM Composition', date: '2023.09', youtubeId: '8N_tupPBtWQ' },
];

const clients: Client[] = [
    { name: 'Scon', logo: 'https://picsum.photos/seed/sconlogo/200/100' },
    { name: 'Jeonghwa Arts University', logo: 'https://picsum.photos/seed/jhlogo/200/100' },
    { name: 'Eastgames', logo: 'https://picsum.photos/seed/eastgameslogo/200/100' },
    { name: 'Seoul Popcon', logo: 'https://picsum.photos/seed/popconlogo/200/100' },
    { name: 'Chungkang College', logo: 'https://picsum.photos/seed/cklogo/200/100' },
];

const phoneDeckItems = portfolioItems.map(item => ({
    id: item.id,
    image: `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`,
}));


export const content: Record<Language, any> = {
    KR: {
        header: {
            logo: 'Red Bag',
            nav: {
                about: 'About',
                portfolio: 'Portfolio',
                contact: 'Contact',
            },
        },
        hero: {
            title: 'Sound Engineer & Composer',
            name: 'Red Bag',
            latest: '최신 작업물',
            phone_deck_items: phoneDeckItems,
        },
        about: {
            name: "Red Bag",
            role: "프리랜서 사운드 엔지니어 및 작곡가",
            summary_title: "경력 요약",
            summary: [
                "정화예술대학교 뮤직테크놀로지학과 졸업",
                "현 스콘(Scon) 음향 오퍼레이팅 프리랜서 재직",
                "다수의 게임 및 전시 BGM 외주 프로젝트 수행",
                "노라조 공식 리믹스 콘테스트 우승 및 음원 발매",
            ],
            services_title: "대표 서비스",
            services: [
                "상업 광고 및 애니메이션 영상 음악(BGM, 테마곡) 작곡",
                "온/오프라인 행사 및 생방송 음향 오퍼레이팅",
                "보컬 믹싱 & 마스터링 및 영상 사운드 후반 작업",
                "이머시브 오디오(Dolby Atmos) 제작 및 사운드 엔지니어링",
            ],
            strengths_title: "핵심 강점",
            strengths: [
                "콘텐츠 서사에 녹여내는 분석력",
                "디테일한 사운드 디자인 및 연출 능력",
                "유연한 커뮤니케이션을 통한 협업 능력",
                "최신 오디오 기술에 대한 지속적인 연구와 실무 적용 능력",
            ]
        },
        portfolio: {
            title: 'Portfolio',
            categories: {
                '오리지널곡': '오리지널곡',
                '믹스마스터': '믹스 & 마스터링',
                '라이브 사운드 오퍼레이팅': '라이브 사운드 오퍼레이팅',
                '상업음악': 'BGM / 사운드 디자인',
            },
            items: portfolioItems,
        },
        clients: {
            title: 'Clients & Artists'
        },
        clients_data: clients,
        contact: {
            title: 'GET IN TOUCH',
            button: 'Get a Quote',
            email: 'redbag20contact@gmail.com'
        }
    },
    EN: {
        header: {
            logo: 'Red Bag',
            nav: {
                about: 'About',
                portfolio: 'Portfolio',
                contact: 'Contact',
            },
        },
        hero: {
            title: 'Sound Engineer & Composer',
            name: 'Red Bag',
            latest: 'Latest Work',
            phone_deck_items: phoneDeckItems,
        },
        about: {
            name: "Red Bag",
            role: "Freelance Sound Engineer & Composer",
            summary_title: "Career Summary",
            summary: [
                "Graduated from Jeonghwa Arts University, Dept. of Music Technology",
                "Currently a freelance sound operator at Scon (Live streaming, content sound production)",
                "Completed numerous BGM outsourcing projects for games and exhibitions",
                "Winner of the official Norazo Remix Contest and released the track",
            ],
            services_title: "Key Services",
            services: [
                "Composing commercial/animation video music (BGM, theme songs)",
                "On/offline event and live broadcast sound operation",
                "Vocal mixing & mastering and post-production sound for video",
                "Immersive audio (Dolby Atmos) production and sound engineering",
            ],
            strengths_title: "Core Strengths",
            strengths: [
                "Analytical skills to capture the narrative and target audience needs",
                "Detailed sound design and directing abilities considering video editing points",
                "Flexible communication and collaboration with various stakeholders",
                "Continuous research and practical application of the latest audio technologies",
            ]
        },
        portfolio: {
            title: 'Portfolio',
            categories: {
                '오리지널곡': 'Original',
                '믹스마스터': 'Mix & Mastering',
                '라이브 사운드 오퍼레이팅': 'Live Sound Operating',
                '상업음악': 'BGM / Sound Design',
            },
            items: portfolioItems,
        },
        clients: {
            title: 'Clients & Artists'
        },
        clients_data: clients,
        contact: {
            title: 'GET IN TOUCH',
            button: 'Get a Quote',
            email: 'redbag20contact@gmail.com'
        }
    }
};
