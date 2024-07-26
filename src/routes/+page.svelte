<script lang="ts">
    import ONLYOFFICE_Icon from "$lib/images/logo_symbol.svg";
    import Button from "@/components/ui/button/button.svelte";
    import * as Alert from "$lib/components/ui/alert/index";
    import { toast } from "svelte-sonner";

    import { ExternalLink, InfoIcon, CopyIcon } from "lucide-svelte";

    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Spinner from "@/components/Spinner.svelte";
    import Badge from "@/components/ui/badge/badge.svelte";
    import Snippet from "@/components/Snippet.svelte";

    let DOCS_ADDRESS = writable<string>("");
    let DOCS_INTERNAL_ADDRESS = writable<string>("");
    let NEXTCLOUD_INTERNAL_ADDRESS = writable<string>("");
    let NEXTCLOUD_WEB_URL = writable<string>("");

    onMount(() => {
        fetch("/info")
            .then(async (res) => {
                const json = await res.json();
                DOCS_ADDRESS.set(json.DOCS_ADDRESS);
                DOCS_INTERNAL_ADDRESS.set(json.DOCS_INTERNAL_ADDRESS);
                NEXTCLOUD_INTERNAL_ADDRESS.set(json.NEXTCLOUD_INTERNAL_ADDRESS);
                NEXTCLOUD_WEB_URL.set(json.NEXTCLOUD_WEB_URL);
            })
            .catch((e) => {
                console.error(
                    "Failed to fetch information about the Document Server. See the error details below:",
                );
                console.dir(e);
                toast.error("Oops! Something went wrong", {
                    description: `Failed to fetch information about the Document Server. See browser dev console for details.`,
                    duration: 30000,
                    dismissable: true,
                });
            });
    });
</script>

<svelte:head>
    <title>ONLYOFFICE Document Server</title>
</svelte:head>

<nain>
    <section class="flex flex-col md:flex-row justify-center m-4">
        <div
            class="px-8 py-6 shadow-xl border rounded-lg md:min-w-[700px] max-w-[700px] backdrop-filter backdrop-blur-lg bg-[#effbff]/80"
        >
            <div class="flex flex-row items-center gap-x-4">
                <img
                    src={ONLYOFFICE_Icon}
                    class="rounded-lg w-16 h-16 md:w-18 md:h-18"
                    alt="ONLYOFFICE Icon"
                />
                <div class="flex flex-col gap-y-0.5">
                    <h1 class="text-lg sm:text-xl md:text-2xl font-bold">
                        ONLYOFFICE Document Server
                    </h1>
                    <h3 class="text-sm">
                        Run your private office with the ONLYOFFICE on your
                        Umbrel.
                    </h3>
                </div>
            </div>
        </div>
    </section>
    <section class="flex flex-col md:flex-row justify-center m-4">
        <div
            class="py-6 shadow-xl border rounded-lg md:min-w-[700px] max-w-[700px] backdrop-blur-lg bg-[#effbff]/80"
        >
            <div class="px-8 pb-6">
                <div class="flex flex-row items-center gap-x-4">
                    <div class="flex flex-col gap-y-0.5">
                        <h2 class="text-lg md:text-xl font-bold">
                            Get Started
                        </h2>
                        <h3 class="text-sm">
                            Follow these steps on this page to set up ONLYOFFICE on your Nextcloud.
                        </h3>
                    </div>
                </div>
            </div>
            <hr />
            <div class="px-8 py-6 flex flex-col gap-y-4">
                <div class="flex flex-row items-center gap-x-4">
                    <img
                        alt="Nextcloud Icon"
                        src="https://getumbrel.github.io/umbrel-apps-gallery/nextcloud/icon.svg"
                        class="rounded-xl w-9 h-9 shadow-lg"
                    />
                    <div
                        class="flex flex-col md:flex-row w-full md:items-center gap-x-4 md:justify-between"
                    >
                        <p class="font-semibold">
                            Install the connector plugin in Nextcloud.
                        </p>
                        {#if $NEXTCLOUD_WEB_URL}
                            <Button
                                variant="link"
                                on:click={() =>
                                    window.open(
                                        `${$NEXTCLOUD_WEB_URL}/settings/apps/files/onlyoffice`,
                                    )}
                                class="text-blue-500 gap-x-2"
                                >Nextcloud <ExternalLink size="16" /></Button
                            >
                        {:else}
                            <Spinner />
                        {/if}
                    </div>
                </div>
                <div class="flex flex-row items-center gap-x-4">
                    <img
                        alt="Nextcloud Icon"
                        src="https://getumbrel.github.io/umbrel-apps-gallery/nextcloud/icon.svg"
                        class="rounded-xl w-9 h-9 shadow-lg"
                    />
                    <div
                        class="flex flex-col md:flex-row w-full md:items-center gap-x-4 md:justify-between"
                    >
                        <div class="font-semibold">
                            Configure the connector plugin.
                        </div>
                        {#if $NEXTCLOUD_WEB_URL}
                            <Button
                                variant="link"
                                on:click={() =>
                                    window.open(
                                        `${$NEXTCLOUD_WEB_URL}/settings/admin/onlyoffice`,
                                    )}
                                class="text-blue-500 gap-x-2"
                                >Server settings <ExternalLink
                                    size="16"
                                /></Button
                            >
                        {:else}
                            <Spinner />
                        {/if}
                    </div>
                </div>
            </div>
            <hr />
            <div class="px-8 pt-6 pb-3">
                <div class="flex flex-row items-center gap-x-4">
                    <div class="flex flex-col">
                        <h3 class="text-md font-semibold mb-1">Server settings:</h3>
                        <div class="flex flex-col text-sm pb-4 gap-y-0.5">
                            <div>ONLYOFFICE Docs address: 
                                <Snippet bind:value={$DOCS_ADDRESS}/>
                            </div>
                            <div>Disable certificate verification (insecure):
                                <span class="font-bold font-mono">Leave blank</span>
                            </div>
                            <div>Secret Key:
                                <span class="font-bold font-mono">Leave blank</span>
                            </div>
                        </div>
                        <h3 class="text-md font-semibold mb-1">Advanced server settings:</h3>
                        <div class="flex flex-col text-sm pb-4 gap-y-0.5">
                            <div>Authorization header: 
                                <span class="font-bold font-mono">Leave blank</span>
                            </div>
                            <div>ONLYOFFICE Docs address for internal requests from the server:
                               <Snippet bind:value={$DOCS_INTERNAL_ADDRESS}/>
                            </div>
                            <div>Server address for internal requests from ONLYOFFICE Docs:
                                <Snippet bind:value={$NEXTCLOUD_INTERNAL_ADDRESS}/>
                            </div>
                        </div>
                        <Alert.Root>
                            <InfoIcon class="h-4 w-4" />
                            <Alert.Title>Remarks</Alert.Title>
                            <Alert.Description>
                                These settings are unlikely to cause a security
                                problem in most cases when using your Umbrel on
                                your local home network. Support for encrypted
                                connections and authentication will be coming in
                                a future update of umbrelOS and subsequently,
                                this app.
                            </Alert.Description>
                        </Alert.Root>
                    </div>
                </div>
            </div>
        </div>
    </section>
</nain>
