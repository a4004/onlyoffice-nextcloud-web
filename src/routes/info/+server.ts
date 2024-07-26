import { json } from '@sveltejs/kit';

const DOCS_ADDRESS = process.env.DOCS_ADDRESS === undefined ? "http://umbrel.local:5672" : process.env.DOCS_ADDRESS;
const DOCS_INTERNAL_ADDRESS = process.env.DOCS_INTERNAL_ADDRESS === undefined ? "http://umbrel.local:5672" : process.env.DOCS_INTERNAL_ADDRESS;
const NEXTCLOUD_INTERNAL_ADDRESS = process.env.NEXTCLOUD_INTERNAL_ADDRESS === undefined ? "http://umbrel.local:8081" : process.env.NEXTCLOUD_INTERNAL_ADDRESS;
const NEXTCLOUD_WEB_URL = process.env.NEXTCLOUD_WEB_URL === undefined ? "http://umbrel.local:8081" : process.env.NEXTCLOUD_WEB_URL;

export async function GET(request) {
    return json({
        DOCS_ADDRESS, DOCS_INTERNAL_ADDRESS, NEXTCLOUD_INTERNAL_ADDRESS, NEXTCLOUD_WEB_URL
    });
}