<script>
  import Icon from "./icons/Icon.svelte";

  import { showPanel } from "./../_stores/headerStore.js";

  // TODO: Create real functions
  const togglePanels = () => showPanel.toggle();
  const toggleHistory = () => console.log("toggle history");
  const goHome = () => console.log("go Home");
  const goBack = () => console.log("go Back one page");
  const goForward = () => console.log("go Forward one page");
</script>

<style>
  :root {
    --offset: -1.5rem;
  }

  .switch {
    position: absolute;
    height: 3rem;
    width: 3rem;
    right: 1.5rem;
    top: 1.5rem;
    box-sizing: border-box;
    border: 1px solid green;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: 0.5s;
  }

  .switch > div {
    position: absolute;
  }

  .switch:hover {
    padding: 1rem;
    right: 0.5rem;
    top: 0.5rem;
    height: 5rem;
    width: 5rem;
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

<div class="switch">
  <div class="logo">
    <Icon icon={'◯'} size="2rem" on:click={togglePanels} />
  </div>

  <div class="outer top left">
    <Icon icon={'🏡'} on:click={goHome} />
  </div>
  <div class="outer top right">
    <Icon icon={'⋮'} on:click={toggleHistory} />
  </div>
  <div class="outer bottom left">
    <Icon icon={'⇠'} toolSide={'top'} on:click={goBack} />
  </div>
  <div class="outer bottom right">
    <Icon icon={'⇢'} toolSide={'top'} on:click={goForward} />
  </div>
</div>
