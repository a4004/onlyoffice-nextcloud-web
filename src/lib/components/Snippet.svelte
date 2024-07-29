<script lang="ts">
    import Badge from "./ui/badge/badge.svelte";
    import { toast } from "svelte-sonner";
    import { CopyIcon } from "lucide-svelte";

    export let value = "";

    function copyTextModern(text: string) {
        navigator.clipboard
            .writeText(text)
            .then(function () {
                console.log("Text copied to clipboard successfully!");
            })
            .catch(function (err) {
                console.error("Could not copy text: ", err);
            });
    }

    function copyTextLegacy(text: string) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0"; // Hidden but on the page

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }

    function copyText(text: string) {
        try {
            if (("clipboard" in navigator)) {
                copyTextModern(text);
            } else {
                copyTextLegacy(text);
            }
            toast.success(`Copied ${value} to clipboard!`);
        } catch (err) {
            console.error("Oops, unable to copy", err);
            toast.error(
                "Couldn't copy the text to the clipboard. Your browser is unsupported or you are using an insecure connection which prohibits JavaScript clipboard access.",
            );
        }
    }
</script>

<Badge variant="outline" class="gap-x-2 py-0.5 bg-white/80">
    <span class="select-text">{value}</span>
    <button
        on:click={() => {
            copyText(value);
        }}
    >
        <CopyIcon class="h-[12px] w-[12px]" />
    </button>
</Badge>
