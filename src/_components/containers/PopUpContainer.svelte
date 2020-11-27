<script>
  import { goto } from "@sveltech/routify";
  import { fade } from "svelte/transition";

  import Icon from "./../icons/icon.svelte";
  import RoundButton from "../buttons/Button.svelte";

  export let image = "";
  export let title = "undefined";
  export let subtitle = "";
  export let onClose = () => $goto("../");
</script>

<style>
  .exitContainer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 999;
  }

  .underlay {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40rem;
    max-height: 90vh;
    max-width: 90vw;
    border-radius: 0.6rem;
    box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    background: white;
    overflow: hidden;
  }

  .content {
    padding: 0.75rem;
    height: 100%;
    max-height: calc(90vh - 17.75rem);
    overflow: scroll;
  }

  .closeContainer {
    position: fixed;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }

  .popImage {
    position: relative;
    height: 5rem;
    background-size: cover !important;
    background-position: center center !important;
  }

  .titles {
    position: absolute;
    width: calc(100% - 4em);
    bottom: 1rem;
    left: 0rem;
    padding-left: 1rem;
    background: transparent;
  }

  .popDefImage {
    height: 15rem;
  }

  .popDefImage .titles {
    background: #ffffffcf;
    padding: 1rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }
</style>

<div class="exitContainer" transition:fade={{ duration: 150 }}>
  <div class="underlay" on:click={onClose} />
  <div class="container">
    <div
      class="popImage"
      class:popDefImage={image}
      style="background:url({image})">
      <div class="titles">
        <div class="title">{title}</div>
        <p>{subtitle}</p>
      </div>
    </div>
    <div class="closeContainer">
      <RoundButton size={'2.5rem'} action={onClose}>
        <Icon padding={'0.7rem 0.75rem'} icon={'delete-sign'} />
      </RoundButton>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</div>
