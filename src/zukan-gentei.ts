// 図書室の「限定の扉」。部屋（rooms.json）とは別枠で、その場所でしか買えないグッズを並べる。
// カードの正本は管理室が書き出す src/data/gentei.json（写真・価格・お店・飛び先まで決めて書き出される）。
// 扉は、その場所のカードが1枚以上あるときだけ図書室に出る（美術館はカードが入ったら自動で扉が生える）。
import genteiData from './data/gentei.json';

export type GenteiCard = {
	id: string;
	place: string; // park / museum
	name: string; // レシート表記
	price: number | null;
	shop: string;
	area: string;
	image: string; // 空 = 撮影待ち
	link: string; // 行き止まりにしない飛び先（レビュー → シリーズ記事 → まとめ記事の見出し）
	linkType: 'review' | 'series' | 'fallback';
};

export type GenteiDoor = {
	place: string;
	slug: string; // URL用（/zukan/{slug}/）
	name: string; // ページの見出し
	emoji: string;
	short: string; // 扉の看板
	base: string; // 扉の色
	dark: string; // 枠線・パネルの濃い色
	lead: string; // ページ冒頭の説明
	asOf: string; // 価格・商品名がいつ時点か
	areas: string[]; // 絞り込みボタンに出すエリア（ここに無いエリアは「その他」）
	links: { href: string; label: string }[]; // ページ冒頭の「くわしくはこちら」
};

const DOORS: GenteiDoor[] = [
	{
		place: 'park',
		slug: 'park-gentei',
		name: 'ジブリパーク限定',
		emoji: '🎡',
		short: 'パーク限定',
		base: '#8FC9A8',
		dark: '#4E8C6A',
		lead: '通販では買えない、ジブリパークだけのグッズです。2026年10月12日に実際に買ったものを、お店のエリアごとに並べました。',
		asOf: '価格・商品名は2026年10月時点のレシート表記です。',
		areas: ['魔女の谷', 'ジブリの大倉庫'],
		links: [
			{ href: '/blog/20261027/', label: '🛍 戦利品80点まとめ' },
			{ href: '/park/', label: '🎡 ジブリパークのページ' },
		],
	},
];

const cards = genteiData as GenteiCard[];

export function getGenteiCards(place: string): GenteiCard[] {
	return cards.filter((c) => c.place === place);
}

export function getGenteiDoors(): GenteiDoor[] {
	return DOORS.filter((d) => getGenteiCards(d.place).length > 0);
}

export function getGenteiDoor(place: string): GenteiDoor {
	const door = DOORS.find((d) => d.place === place);
	if (!door) throw new Error(`限定の扉が見つかりません: ${place}`);
	return door;
}
