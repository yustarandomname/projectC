<script>
  import Button from "./../buttons/Button.svelte";

  import { sidePanel } from "./../../_stores/headerStore.js";

  import firebase from "firebase/app";
  import "firebase/auth";

  function handleClick(attributes) {
    switch (attributes.action) {
      case "logOut":
        firebase.auth().signOut();
        break;
      case "openPage":
        console.log("changePage");
        break;
      default:
        break;
    }
  }
</script>

<style>
  .positionSidePanel {
    position: absolute;
    right: 1.5rem;
  }
</style>

<div class="positionSidePanel">
  {#each Object.entries($sidePanel) as [toolTip, attributes]}
    <Button
      icon={attributes.icon}
      {toolTip}
      toolSide={'left'}
      on:click={() => handleClick(attributes)} />
  {/each}
</div>
