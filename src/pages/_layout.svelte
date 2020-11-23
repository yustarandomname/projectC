<script>
  import CenterPanel from "./../_components/header/CenterPanel.svelte";
  import SidePanel from "./../_components/header/SidePanel.svelte";
  import Switch from "./../_components/Switch.svelte";

  import { showPanel } from "./../_stores/headerStore.js";
</script>

<style>
  .header {
    width: 100vw;
    height: 3rem;
    padding: 1.5rem 0;
    display: block;
  }
</style>

<div class="header">
  {#if $showPanel}
    <CenterPanel />
    <SidePanel />
  {/if}

  <Switch />
</div>
<slot />
