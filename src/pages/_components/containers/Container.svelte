<script>
  // @Params: [
  //   width: width of container
  //   background: background of container
  // ]
  // Purpose: Standard container

  export let width = "";
  export let background = "";
  export let padding = "";
  export let margin = "";
  export let boxShadow = "";
  export let borderColor = "";
</script>

<style>
  .container {
    width: 40rem;
    position: relative;
    border-radius: 0.6rem;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    max-width: 90vw;
    overflow: hidden;
    background: white;
    padding: 0.75rem;
    margin: 2rem auto;
    border: 1px solid transparent;
  }
</style>

<div
  class="container"
  style="width:{width}; background:{background}; padding:{padding}; margin:{margin};
  box-shadow:{boxShadow}; border-color:{borderColor}">
  <slot name="header" />
  <slot />
</div>
