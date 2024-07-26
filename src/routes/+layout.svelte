<script lang="ts">
    import "../app.css";
    import { Toaster } from "$lib/components/ui/sonner";
</script>

<div class="absolute top-0 left-0 w-full h-full z-[-1] overflow-hidden">
    <div class="absolute top-[0%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#5dc0e8] opacity-70 blur-[200px] animate-float-fast" />
    <div class="absolute top-[30%] left-[70%] w-[500px] h-[500px] rounded-full bg-[#95c038] opacity-70 blur-[200px] animate-float-fast" />
    <div class="absolute top-[60%] left-[40%] w-[500px] h-[500px] rounded-full bg-[#ff6f3d] opacity-70 blur-[200px] animate-float-fast" />
</div>
<Toaster />
<slot></slot>
