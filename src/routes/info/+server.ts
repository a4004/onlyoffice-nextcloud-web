import { json } from '@sveltejs/kit';

const onlyoffice_url: string = process.env.ONLYOFFICE_URL === undefined ? "http://umbrel.local:5672" : process.env.UMBREL_URL;
const nextcloud_url: string = process.env.NEXTCLOUD_URL === undefined ? "http://umbrel.local:8081": process.env.NEXTCLOUD_URL;
const secret_key: string = process.env.SECRET_KEY === undefined ? "Leave this field blank" : process.env.SECRET_KEY;
const enable_ssl: string = process.env.ENABLE_SSL === undefined ? false : process.env.ENABLE_SSL_VALIDATION;

export async function GET(request) {
    //return new Response("test bad response");
    console.log(onlyoffice_url, nextcloud_url, secret_key, enable_ssl);
    return json({
        onlyoffice_url, nextcloud_url, secret_key, enable_ssl
    });
}