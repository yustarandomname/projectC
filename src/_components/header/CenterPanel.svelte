<script>
  import { searchQuery } from "./../../_stores/headerStore.js";

  let query = "";

  const handleKeyup = _ => {
    searchQuery.set(query.toLowerCase());
  };
</script>

<style>
  .centerPanel {
    margin: 0 auto;
    width: 40rem;
    max-width: 90vw;
    background: green;
    height: 3rem;
  }

  .searchBar {
    padding: 0.5rem;
    background: #ddd;
  }
</style>

<div class="centerPanel">
  This is the center panel
  <div
    class="searchBar"
    contenteditable="true"
    bind:innerHTML={query}
    on:keyup={handleKeyup} />
</div>
