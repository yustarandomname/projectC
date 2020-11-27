<script>
  // @Params: [
  //   width: width of container
  //   background: background of container
  // ]
  // Purpose: Standard container

  export let background = "";
  export let padding = "";
  export let boxShadow = "";
  export let isClickable = false;
</script>

<style>
  .container {
    width: 100%;
    width: 100%;
    position: relative;
    border-radius: 0.6rem;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-width: 90vw;
    max-height: 90vw;
    overflow: hidden;
    background: transparent;
    padding: 0.75rem;
  }

  .centerTitle {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
  }

  .clickable {
    cursor: pointer;
  }
</style>

<div
  class="container"
  class:clickable={isClickable}
  style="background:{background}; padding:{padding}; box-shadow:{boxShadow};"
  on:click>
  <div class="centerTitle">
    <slot name="title" />
  </div>
  <slot />
</div>
