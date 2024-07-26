<script lang="ts">
    import ONLYOFFICE_Icon from "$lib/images/logo_symbol.svg";
    import Button from "@/components/ui/button/button.svelte";
    import * as Alert from "$lib/components/ui/alert/index";
    import { toast } from "svelte-sonner";

    import { ExternalLink, InfoIcon } from "lucide-svelte";

    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import Spinner from "@/components/Spinner.svelte";

    let onlyoffice_url = writable<string>("");
    let nextcloud_url = writable<string>("");
    let secret_key = writable<string>("");
    let enable_ssl = writable<boolean | undefined>(undefined);

    onMount(() => {
        fetch("/info")
            .then(async (res) => {
                const json = await res.json();
                //  onlyoffice_url, nextcloud_url, secret_key, enable_ssl

                $onlyoffice_url = json.onlyoffice_url;
                $nextcloud_url = json.nextcloud_url;
                $secret_key = json.secret_key;
                $enable_ssl = json.enable_ssl;
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
            class="px-8 py-6 shadow-xl border rounded-lg md:min-w-[650px] max-w-[650px] backdrop-filter backdrop-blur-lg bg-[#effbff]/80"
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
            class="py-6 shadow-xl border rounded-lg md:min-w-[650px] max-w-[650px] backdrop-blur-lg bg-[#effbff]/80"
        >
            <div class="px-8 pb-6">
                <div class="flex flex-row items-center gap-x-4">
                    <div class="flex flex-col gap-y-0.5">
                        <h2 class="text-lg md:text-xl font-bold">
                            Get Started
                        </h2>
                        <h3 class="text-sm">
                            Follow these steps to get ONLYOFFICE on your
                            Nextcloud
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
                            Install the ONLYOFFICE connector for Nextcloud.
                        </p>
                        {#if $nextcloud_url}
                            <Button
                                variant="link"
                                on:click={() =>
                                    window.open(
                                        `${$nextcloud_url}/settings/apps/files/onlyoffice`,
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
                            Set the ONLYOFFICE Docs address and configuration
                            using the settings below.
                        </div>
                        {#if $nextcloud_url}
                            <Button
                                variant="link"
                                on:click={() =>
                                    window.open(
                                        `${$nextcloud_url}/settings/admin/onlyoffice`,
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
                    <div class="flex flex-col gap-y-0.5">
                        <h3 class="text-md font-semibold">Server settings:</h3>
                        {#if $nextcloud_url && $onlyoffice_url && $secret_key && $enable_ssl !== undefined}
                            <ul class="text-sm pb-4">
                                <li>
                                    Server: <span
                                        class="font-mono font-bold mx-1 border bg-white/50 backdrop-filter backdrop-blur-lg px-1 rounded-md"
                                        ><button
                                            on:click={() => {
                                                navigator.clipboard.writeText(
                                                    $onlyoffice_url,
                                                );
                                                toast.success(
                                                    "Server URL copied to clipboard",
                                                );
                                            }}>{$onlyoffice_url}</button
                                        ></span
                                    >
                                </li>
                                <li>
                                    Disable certificate verification (insecure): <span
                                        class="font-mono font-bold mx-1 border bg-white/50 backdrop-filter backdrop-blur-lg px-1 rounded-md"
                                        >{$enable_ssl
                                            ? "No - don't tick this option"
                                            : "Yes - tick this option"}</span
                                    >
                                </li>
                                <li>
                                    Secret key: <span
                                        class="font-mono font-bold mx-1 border bg-white/50 backdrop-filter backdrop-blur-lg px-1 rounded-md"
                                    >
                                        <button
                                            on:click={() => {
                                                if ($secret_key === undefined || $secret_key === "Leave this field blank") {
                                                    return;
                                                }
                                                navigator.clipboard.writeText(
                                                    $secret_key,
                                                );
                                                toast.success(
                                                    "Secret key copied to clipboard",
                                                );
                                            }}>{$secret_key}</button
                                        >
                                    </span>
                                </li>
                                <li>
                                    Advanced server settings: <span
                                        class="font-mono font-bold mx-1 border bg-white/50 backdrop-filter backdrop-blur-lg px-1 rounded-md"
                                        >Ignore these options, leave them blank</span
                                    >
                                </li>
                            </ul>
                            <Alert.Root>
                                <InfoIcon class="h-4 w-4" />
                                <Alert.Title>Remarks</Alert.Title>
                                <Alert.Description>
                                    These settings are unlikely to cause a
                                    security problem in most cases when using
                                    your Umbrel on your local home network.
                                    Support for encrypted connections and
                                    authentication will be coming in a future
                                    update of umbrelOS and subsequently, this
                                    app.
                                </Alert.Description>
                            </Alert.Root>
                        {:else}
                            <div class="pb-6 pt-3">
                                <Spinner />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </section>
</nain>