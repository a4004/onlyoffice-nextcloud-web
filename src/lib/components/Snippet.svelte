<script lang="ts">
    import Badge from "./ui/badge/badge.svelte";
    import { toast } from "svelte-sonner";
    import { CopyIcon } from "lucide-svelte";

    export let value = "";
</script>

<Badge variant="outline" class="gap-x-2 py-0.5">
    <span class="select-text">{value}</span>
    <button on:click={() => { navigator.clipboard.writeText(value); toast.success(`Copied ${value} to clipboard!`) }}>
        <CopyIcon class="h-3 w-3" />
    </button>
</Badge>