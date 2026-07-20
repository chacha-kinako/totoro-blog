// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks';
import { visit } from 'unist-util-visit';
import { defineConfig, fontProviders } from 'astro/config';

/**
 * 表を <div class="table-scroll"> で包む。
 * 表そのものは本文の幅いっぱいに広げたい（以前は表自体を横スクロール要素にしていたため、
 * 幅の割り振りが効かず中身が左半分に寄って見えていた）。
 * 列が多くて画面に収まらないときだけ、この外側の枠が横スクロールする。
 */
function rehypeWrapTables() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName !== 'table' || !parent || index === undefined) return;
			if (parent.type === 'element' && parent.properties?.className?.includes?.('table-scroll')) return;
			parent.children[index] = {
				type: 'element',
				tagName: 'div',
				properties: { className: ['table-scroll'] },
				children: [node],
			};
		});
	};
}

// https://astro.build/config
export default defineConfig({
	site: 'https://totoro-blog.atelier0maru.workers.dev',
	integrations: [mdx(), sitemap()],
	// 管理室のエディタで改行したところを、ブログでもそのまま改行して表示する
	// （Markdownの既定では1回の改行は無視されてしまうため）
	markdown: {
		remarkPlugins: [remarkBreaks],
		rehypePlugins: [rehypeWrapTables],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
