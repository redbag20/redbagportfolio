import type { PortfolioItem, Client, Language, PortfolioCategory } from '../types';

const portfolioItems: PortfolioItem[] = [
    { id: 1, category: '오리지널곡', image: 'https://picsum.photos/seed/music1/500/500', title: 'Self-Titled Album', role: 'Composition, Arrangement', date: '2023.10', youtubeId: 'dQw4w9WgXcQ' },
    { id: 2, category: '오리지널곡', image: 'https://picsum.photos/seed/music2/500/500', title: 'Digital Single "Echoes"', role: 'Composition', date: '2024.01', youtubeId: '3tmd-ClpJxA' },
    { id: 9, category: '오리지널곡', image: 'https://picsum.photos/seed/norazo/500/500', title: 'Norazo Remix Contest Winner', role: 'Remix, Arrangement', date: '2022.08', youtubeId: '0-q1KafFCLU' },
    
    { id: 10, category: '믹스마스터', image: 'https://picsum.photos/seed/raon1/500/500', title: '라온 - 독쥐', role: '라온 Office 협업 / 보컬 디렉팅', date: '2024.05', youtubeId: 'dI3myyT-Uwg' },
    { id: 11, category: '믹스마스터', image: 'https://picsum.photos/seed/raon2/500/500', title: '라온 - 독쥐', role: '라온 Office 협업 / 보컬 디렉팅 및 믹스 마스터링', date: '2024.05', youtubeId: 'QUFznPj7bak' },
    { id: 12, category: '믹스마스터', image: 'https://picsum.photos/seed/suncheon1/500/500', title: '순천페스티벌 - 미녕이데려오께', role: '오퍼레이팅 및 Vocal Mix/Master', date: '2023.11', youtubeId: 'eWwUkpY1DjU' },
    { id: 13, category: '믹스마스터', image: 'https://picsum.photos/seed/suncheon2/500/500', title: '순천페스티벌 - 마젯', role: '오퍼레이팅 및 Vocal Mix/Master', date: '2023.11', youtubeId: 'KuXSAe-Sm5o' },
    { id: 14, category: '믹스마스터', image: 'https://picsum.photos/seed/agf1/500/500', title: 'AGF 2025 - 스콘', role: '블루스테이지 음향 오퍼레이팅 및 Vocal Mix & Master', date: '2023.12', youtubeId: 'cGSq0tRB8WU' },
    { id: 15, category: '믹스마스터', image: 'https://picsum.photos/seed/agf2/500/500', title: 'AGF 2025 - 스콘', role: '블루스테이지 음향 오퍼레이팅 및 Vocal Mix & Master', date: '2023.12', youtubeId: 'Q_8qdg8oAGs' },
    { id: 16, category: '믹스마스터', image: 'https://picsum.photos/seed/agf3/500/500', title: 'AGF 2025 - 스콘', role: '블루스테이지 음향 오퍼레이팅 및 Vocal Mix & Master', date: '2023.12', youtubeId: 'LHTijE7Wuic' },

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
                pricing: '견적',
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
        pricing: {
            title: '서비스 가격',
            cards: [
                {
                    title: '작곡 & 편곡',
                    features: [
                        '오리지널 곡: ₩700,000~',
                        '상업용 BGM: ₩500,000~',
                        '방송용 음악 (~1분): ₩100,000',
                        '16비트 / 8비트 레트로: ₩50,000',
                    ],
                    note: '협의 후 가격이 변동될 수 있습니다.',
                },
                {
                    title: '믹스 & 마스터링',
                    features: [
                        '스탠다드 (보정 포함): ₩70,000 (트랙 무제한)',
                        '베이직 (보정 미포함): ₩50,000',
                        '1절 믹스: ₩40,000',
                        '음정/박자 보정: +₩20,000 (1인 기준)',
                        '빠른 마감: +₩50,000',
                        '당일 마감: +₩70,000',
                    ],
                    note: '',
                },
                {
                    title: '방송 & 음향 세팅',
                    features: [
                        '온라인 DAW/OBS 지원: ₩50,000',
                        '오디오 장비 세팅: ₩70,000',
                        '현장출장 및 오디오 오퍼레이팅 출장: ₩150,000',
                    ],
                    note: '출장 시 출장비가 발생할 수 있습니다.',
                },
            ],
            cta_button: '견적 문의하기',
            pricingNotes: {
                title: '가격 정책 안내',
                list: [
                    '**저작권 양도**: 방송, 상업 음반 발매 등 저작권의 완전한 양도가 필요한 경우, 기본 견적의 2배 비용이 적용됩니다.',
                    '**상업적 이용**: 광고, 게임 삽입 등 제작물을 상업적 목적으로 사용하는 경우, 기본 견적의 2배 비용이 적용됩니다. (저작권 양도와 별개)',
                    '**협의 및 조정**: 모든 서비스 비용은 프로젝트의 규모, 복잡성, 기간 등 제반 사항에 따라 상호 협의 하에 조정될 수 있습니다.',
                ]
            },
            copyrightNotes: {
                title: '저작권 및 사용 범위 안내',
                list: [
                    '**포트폴리오 사용**: 완성된 모든 작업물(믹스, 마스터링, 작곡 등)은 아티스트의 포트폴리오로 사용될 수 있습니다.',
                    '**저작권 귀속**: 별도의 저작권 양도 계약이 없는 한, 제작된 BGM 등 모든 창작물의 저작권은 작곡가(Red Bag)에게 귀속됩니다.',
                    '**상업적 이용 범위**: 유튜브 수익 창출, 광고, 게임 삽입 등 상업적 이용 범위는 별도 협의가 필요하며, 확정된 내용에 따라 가격 정책이 적용됩니다.',
                    '**2차 저작물**: 원곡을 바탕으로 한 편곡, 샘플링 등 2차 저작물 제작은 사전에 반드시 협의해야 합니다.',
                ]
            }
        },
        contact: {
            title: '함께 일할 준비가 되셨나요?',
            email: 'redbag20contact@gmail.com',
            cta_button: '카카오톡으로 문의하기',
            social_title: 'Follow Me'
        }
    },
    EN: {
        header: {
            logo: 'Red Bag',
            nav: {
                about: 'About',
                portfolio: 'Portfolio',
                pricing: 'Pricing',
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
        pricing: {
            title: 'Pricing',
            cards: [
                {
                    title: 'Composition & Arrangement',
                    features: [
                        'Original Song: ₩700,000~',
                        'Commercial BGM: ₩500,000~',
                        'Broadcast Music (~1 min): ₩100,000',
                        '16Bit / 8Bit Retro: ₩50,000',
                    ],
                    note: 'Prices may vary after consultation.',
                },
                {
                    title: 'Mix & Mastering',
                    features: [
                        'Standard M&M (Correction incl.): ₩70,000 (Unlimited Tracks)',
                        'Basic M&M (No Correction): ₩50,000',
                        '1 Verse Mix: ₩40,000',
                        'Pitch/Time Correction: +₩20,000 (per person)',
                        'Rush Fee (Fast): +₩50,000',
                        'Same Day Delivery: +₩70,000',
                    ],
                    note: '',
                },
                {
                    title: 'Stream & Sound Setup',
                    features: [
                        'Online DAW/OBS Support: ₩50,000',
                        'Audio Gear Setup: ₩70,000',
                        'On-site Support & Audio Operating: ₩150,000',
                    ],
                    note: 'Travel fees may apply for on-site support.',
                },
            ],
            cta_button: 'Get a Quote (KakaoTalk)',
            pricingNotes: {
                title: 'Pricing Policy',
                list: [
                    '**Copyright Transfer**: For a complete transfer of copyright (e.g., for broadcasting or commercial album releases), the cost is double the base rate.',
                    '**Commercial Use**: For commercial use (e.g., in ads or games), the cost is double the base rate. This is separate from copyright transfer.',
                    '**Consultation & Adjustments**: All service fees are negotiable and can be adjusted based on project scope, complexity, and other requirements.',
                ]
            },
            copyrightNotes: {
                title: 'Copyright & Usage Policy',
                list: [
                    '**Portfolio Use**: All completed works (mixes, masters, compositions, etc.) may be used in the artist\'s portfolio.',
                    '**Copyright Ownership**: Unless a separate copyright transfer agreement is made, the copyright for all creative works, including BGM, belongs to the composer (Red Bag).',
                    '**Scope of Commercial Use**: The scope of commercial use (e.g., YouTube monetization, ads, game inclusion) requires separate consultation, and pricing will be applied accordingly.',
                    '**Derivative Works**: The creation of derivative works (e.g., arrangements, sampling) must be discussed and agreed upon in advance.',
                ]
            }
        },
        contact: {
            title: 'Ready to work together?',
            email: 'redbag20contact@gmail.com',
            cta_button: 'Contact via KakaoTalk',
            social_title: 'Follow Me'
        }
    }
};