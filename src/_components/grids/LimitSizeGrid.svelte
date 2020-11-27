<script>
  import Grid from "./FullsizeGrid.svelte";

  export let width = "40rem";
  export let columns = 4;
  export let gap = "1rem";
</script>

<style>
  .outerGrid {
    max-width: 90vw;
    margin: 1rem auto;
  }
</style>

<div class="outerGrid" style="width:{width}">
  <div class="title">
    <slot name="title" />
  </div>

  <Grid {columns} {gap}>
    <slot />
  </Grid>
</div>
