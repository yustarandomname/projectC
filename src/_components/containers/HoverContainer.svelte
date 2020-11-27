<script>
  export let background = "";
  export let ratio = 1;
</script>

<style>
  .relativeContainer {
    width: 100%;
    max-width: 90vw;
    max-height: 90vw;
    position: relative;
    box-sizing: border-box;
  }

  .relativeContainer:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    cursor: pointer;
    transform: scale(1);
    transition: 0.3s;
  }

  .container:hover {
    transform: scale(1.1);
  }

  .centerTitle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="relativeContainer" style="height:{ratio * 100}%">
  <div class="container" style="background:{background}" on:click>
    <div class="centerTitle">
      <slot name="title" />
    </div>
  </div>
</div>
