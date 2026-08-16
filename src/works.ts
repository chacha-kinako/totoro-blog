// 作品ページの一覧（サイドバー・作品別ページ・作品一覧で共通して使う）
// ここに載せていても、その作品の記事が1本も無いあいだはサイトに表示されない。
// 記事が公開されると自動で現れる（各ページで記事数を数えて絞り込んでいる）。
export const GHIBLI_WORKS = [
	{ icon: '🌱', name: 'となりのトトロ', desc: 'ほのぼのトトログッズ' },
	{ icon: '🧹', name: '魔女の宅急便', desc: 'キキと一緒に飛ぼう' },
	{ icon: '🔥', name: 'ハウルの動く城', desc: '動く城の住人たち' },
	{ icon: '🛁', name: '千と千尋の神隠し', desc: '湯屋の世界に浸る' },
	{ icon: '🐷', name: '紅の豚', desc: '空を飛ぶ豚の物語' },
	{ icon: '🏰', name: '天空の城ラピュタ', desc: 'バルスの世界' },
	{ icon: '🎻', name: '耳をすませば', desc: 'まっすぐな青春の物語' },
	{ icon: '🐺', name: 'もののけ姫', desc: '森と神々のグッズ' },
	{ icon: '🌾', name: '風の谷のナウシカ', desc: '風の谷の記憶' },
	{ icon: '🏛️', name: 'ジブリ美術館', desc: '三鷹の森のおみやげ' },
	{ icon: '🎡', name: 'ジブリパーク', desc: 'ジブリパークのおみやげ' },
] as const;

export type GhibliWork = (typeof GHIBLI_WORKS)[number];

/** 記事が1本以上ある作品だけに絞り込む */
export function worksWithPosts<T extends { data: { showInWorks?: string[] } }>(
	posts: T[],
): { icon: string; name: string; desc: string }[] {
	return GHIBLI_WORKS.filter((w) =>
		posts.some((p) => (Array.isArray(p.data.showInWorks) ? p.data.showInWorks.includes(w.name) : false)),
	).map((w) => ({ ...w }));
}
