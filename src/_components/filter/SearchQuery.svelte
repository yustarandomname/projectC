<script>
  import { searchQuery } from "./../../_stores/headerStore.js";

  export let items = [];
  export let filterOn = "name";
</script>

{#each items as item}
  <!-- {console.log(item[filterOn].toLowerCase())} -->
  {#if item[filterOn].toLowerCase().match($searchQuery)}
    <slot {item} />
  {/if}
{/each}
