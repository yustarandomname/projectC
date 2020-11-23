<script>
  export let width = "40rem";
  export let background = "white";

  /*
  Params: [
    width: width of container
    background: background of container
  ]

  Purpose: Standard container without box-shadow/padding/border-radius
  */
</script>

<style>
  .container {
    position: relative;
    box-sizing: border-box;
    max-width: 90vw;
    margin: 2rem auto;
  }
</style>

<div class="container" style="width:{width}; background:{background}">
  <slot name="header" />
  <slot />
</div>
