<script>
  export let title;
  export let attributes;
  export let form;

  import { components } from "./components.js";

  let component = components(attributes.type);

  // Merge default component with attribute settings
  // attribute overrides
  attributes = { ...component, ...attributes };

  // Set base case isValid
  attributes.isValid = attributes.required
    ? attributes.testValid(attributes.value)
    : true;

  // set global attributes
  form.fields[title] = attributes;

  // Update component isRaised
  function handleKeyup(e) {
    attributes.isRaised = attributes.value && attributes.value.length > 0;

    attributes.isValid = attributes.required
      ? attributes.testValid(attributes.value)
      : true;
  }
</script>

<style>
  .inputContainer {
    position: relative;
    display: inline-block;
    width: calc(50% - 1rem);
    margin: 0.2rem 0 1.6rem 0;
  }

  .inputWrapper {
    position: relative;
    border: 1px solid var(--unfocus);
    border-radius: 0.3rem;
    padding: 0.6rem 0.3rem;
    width: calc(100% - 0.7rem);
    display: flex;
    color: var(--unfocus);
    transition: 0.5s border, 0.5s color;
  }

  .inputWrapper::after {
    content: attr(title);
    position: absolute;
    font-size: 0.8rem;
    top: 0.7rem;
    left: 0rem;
    padding: 0 0.25rem;
    background: transparent;
    transition: 0.25s top, 0.25s left;
  }

  .noPadding {
    padding: 0;
  }

  /* raised */
  .inputWrapper.raised {
    border-color: black;
    color: black;
  }

  .inputWrapper.raised::after {
    top: -0.85rem;
    left: 0.4rem;
    background: white;
  }

  /* width */
  .fullWidth {
    display: flex;
    width: 100%;
  }

  :global(.fullWidth input) {
    margin-right: 1rem;
    border-right: 1px solid var(--unfocus);
    border-radius: 0 !important;
  }

  :global(.fullWidth input:last-child) {
    margin-right: 0;
    border-right: none;
  }
</style>

<div class="inputContainer" class:fullWidth={component.fullWidth}>
  <div
    class="inputWrapper"
    class:raised={attributes.isRaised || (attributes.value && attributes.value.length > 0)}
    class:noPadding={attributes.noPadding}
    title={title + (attributes.required ? ' *' : '')}>

    <svelte:component
      this={attributes.src}
      {attributes}
      on:keyup={handleKeyup} />
  </div>
</div>
