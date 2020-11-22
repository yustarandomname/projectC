<script>
  import Icon from "./icons/Icon.svelte";

  // TODO: Create real functions
  const goHome = () => console.log("go Home");
  const toggleCenter = () => console.log("toggle center container");
  const toggleMenu = () => console.log("toggle side menu");
  const goBack = () => console.log("go Back one page");
  const goForward = () => console.log("go Forward one page");
</script>

<style>
  :root {
    --offset: -1.5rem;
  }

  .container {
    position: absolute;
    height: 3rem;
    width: 3rem;
    right: 1.5rem;
    top: 1.5rem;
    border: 1px solid green;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: 0.5s;
  }

  .container > div {
    position: absolute;
  }

  .container:hover {
    padding: 1rem;
    right: 0.5rem;
    top: 0.5rem;
    overflow: unset;
    --offset: 0;
  }

  .top {
    top: var(--offset);
  }
  .right {
    right: var(--offset);
  }
  .bottom {
    bottom: var(--offset);
  }
  .left {
    left: var(--offset);
  }
</style>

<div class="container">
  <div class="logo">
    <Icon icon={'◯'} size="2rem" on:click={goHome} />
  </div>

  <div class="outer top left">
    <Icon icon={'--'} on:click={toggleCenter} />
  </div>
  <div class="outer top right">
    <Icon icon={'⋮'} on:click={toggleMenu} />
  </div>
  <div class="outer bottom left">
    <Icon icon={'⇠'} toolSide={'top'} on:click={goBack} />
  </div>
  <div class="outer bottom right">
    <Icon icon={'⇢'} toolSide={'top'} on:click={goForward} />
  </div>
</div>
