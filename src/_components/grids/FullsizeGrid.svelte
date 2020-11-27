<script>
  export let columns = 4;
  export let gap = "1rem";

  // if customColumns is defined => have custom cols / repeat equal distributed cols
  let templateColumns = `repeat(${columns},1fr)`;
</script>

<style>
  .grid {
    width: 100%;
    display: grid;
  }
</style>

<div
  class="grid normalGrid"
  style="grid-template-columns: {templateColumns}; grid-gap:{gap}">
  <slot />
</div>
