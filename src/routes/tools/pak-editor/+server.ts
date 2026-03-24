import { redirect } from '@sveltejs/kit';

export function GET() {
	redirect(308, '/tools/pak-editor/index.html');
}

export const HEAD = GET;
