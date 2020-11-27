<script>
  import Input from "../inputs/Input.svelte";

  import { url } from "@sveltech/routify";
  import { notifications } from "../../_stores/NotificationStore.js";
  import { showForm } from "./../../_stores/FormStore.js";

  export let activeForm = {};
  let dev = false;

  function validateForm(onSubmit) {
    if (dev) {
      console.warn(activeForm);
      console.warn("you are running dev mode, so nothing is send");
      return;
    }

    // TODO: do things before submiting
    onSubmit();
    showForm.set(false);
  }
</script>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  input[type="submit"] {
    width: fit-content;
    cursor: pointer;
    border-radius: 0.3rem;
    background: var(--green);
    padding: 0.5rem;
  }

  .positionSubmit {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
  }

  .title {
    margin-bottom: 1rem;
  }

  .radioContainer {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
</style>

<form>
  <slot />
  {#each Object.entries(activeForm.fields) as [title, attributes], index}
    <!-- type: Header -->
    {#if attributes.type == 'header'}
      <div class="title">{title}</div>
    {:else if attributes.type == 'info'}
      <p>{attributes.value}</p>
    {:else if attributes.type == 'radio'}
      <div class="radioContainer">
        <div style="width:100%">{title}</div>
        <!-- TODO: re-enable Radio -->
        <!-- <Radio {attributes} {title} /> -->
      </div>
      <!-- type: Submit -->
    {:else if attributes.type == 'submit'}
      <div class="positionSubmit">
        <input
          type="submit"
          value={title}
          on:click|preventDefault={() => validateForm(attributes.onSubmit)} />
      </div>
    {:else}
      <Input {title} {attributes} />
    {/if}
  {:else}
    <h3>your input is not properly defined</h3>
    <p>
      go to the
      <a href={$url('docs')}>documentation</a>
      page to find what is wrong
    </p>
  {/each}
</form>
