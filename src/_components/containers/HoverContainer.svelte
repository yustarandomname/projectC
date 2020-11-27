<script>
  export let background = "";
  export let ratio = 1;
  export let contextMenu = false;

  const toggleContextMenu = _ => {
    contextMenu.isVisible = !contextMenu.isVisible;
  };

  const hideContextMenu = _ => {
    //contextMenu.isVisible = false;
  };
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

  .relativeContainer:hover .container,
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

  :global(.centerTitle > *) {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* CONTEXT MENU */
  .contextMenu {
    position: absolute;
    left: calc(100% + 1rem);
    top: 0;
    width: 5rem;
    height: fit-content;
    min-height: 100%;
    z-index: 10;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: white;
  }
</style>

{#if contextMenu}
  <div
    class="relativeContainer"
    style="height:{ratio * 100}%"
    on:contextmenu|preventDefault={toggleContextMenu}>
    <div class="container" style="background:{background}" on:click>
      <div class="centerTitle">
        <slot name="title" />
      </div>
    </div>

    {#if contextMenu.isVisible}
      <div class="contextMenu" />
    {/if}
  </div>
{:else}
  <div class="relativeContainer " style="height:{ratio * 100}%">
    <div class="container" style="background:{background}" on:click>
      <div class="centerTitle">
        <slot name="title" />
      </div>
    </div>
  </div>
{/if}
