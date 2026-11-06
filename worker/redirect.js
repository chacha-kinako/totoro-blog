// 旧アドレス（workers.dev）と www に来た人を、正式なアドレスへ案内する（301＝引っ越し済みの合図）
const MAIN_HOST = 'marumadonoie.com';

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.hostname.endsWith('.workers.dev') || url.hostname === `www.${MAIN_HOST}`) {
			url.protocol = 'https:';
			url.hostname = MAIN_HOST;
			url.port = '';
			return Response.redirect(url.toString(), 301);
		}
		return env.ASSETS.fetch(request);
	},
};
