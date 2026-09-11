// 図書室・図鑑部屋で使う「部屋の扉」の一覧。
// 部屋の正本は管理室が書き出す src/data/rooms.json（部屋を増やすと図書室にも自動で扉が生える）。
// 最後に「総合部屋」（全グッズ）を固定で足す。
import roomsData from './data/rooms.json';

export type ZukanRoom = {
	slug: string; // URL用（/zukan/{slug}）
	name: string; // 「○○の部屋」
	emoji: string; // 見出し用の絵文字
	short: string; // 扉の看板に書く短い名前
	base: string; // 扉の色
	dark: string; // 枠線・パネルの濃い色
};

type RoomEntry = {
	slug: string;
	name: string;
	emoji?: string;
	color: string;
	sortOrder: number;
	isActive: boolean;
};

// 初期4部屋は手描き時代の濃い色をそのまま使い、見た目を変えない
const KNOWN_DARK: Record<string, string> = {
	nuigurumi: '#D97A94',
	figure: '#9C6420',
	shokki: '#3B7EC0',
	toki: '#7BA344',
};

// 新しい部屋の濃い色は base から自動で作る（少し暗く・少し濃く）
function darken(hex: string): string {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return '#9C6420';
	const n = parseInt(m[1], 16);
	let r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h = 0, s = 0;
	const l = (max + min) / 2;
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
		else if (max === g) h = ((b - r) / d + 2) / 6;
		else h = ((r - g) / d + 4) / 6;
	}
	const l2 = Math.max(0, l - 0.18);
	const s2 = Math.min(1, s + 0.1);
	const hue2rgb = (p: number, q: number, t: number) => {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	};
	const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
	const p = 2 * l2 - q;
	r = hue2rgb(p, q, h + 1 / 3);
	g = hue2rgb(p, q, h);
	b = hue2rgb(p, q, h - 1 / 3);
	const to = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
	return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

export const ALL_ROOM: ZukanRoom = {
	slug: 'all',
	name: '総合部屋',
	emoji: '📦',
	short: '総合部屋',
	base: '#F5C845',
	dark: '#D19E1D',
};

export function getZukanRooms(): ZukanRoom[] {
	const rooms = (roomsData as RoomEntry[])
		.filter((r) => r.isActive)
		.sort((a, b) => a.sortOrder - b.sortOrder)
		.map((r) => {
			const base = r.color || '#F5C845';
			return {
				slug: r.slug,
				name: r.name,
				emoji: r.emoji ?? '📖',
				short: r.name.replace(/の部屋$/, ''),
				base,
				dark: KNOWN_DARK[r.slug] ?? darken(base),
			};
		});
	return [...rooms, ALL_ROOM];
}
