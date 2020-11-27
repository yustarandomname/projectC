<script>
  export let attributes; // All field properties
  export let title;
</script>

<style>
  .radioItem {
    margin-top: 0.3rem;
    margin-right: 1rem;
    border: 2px solid var(--green);
    border-radius: 0.3rem;
  }

  .checked {
    background: var(--green);
  }

  .radioItem:hover {
    background: var(--green);
  }

  input[type="radio"] {
    display: none;
  }

  .radioItem label {
    padding: 0.25rem 0.5rem;
    display: block;
    cursor: pointer;
  }
</style>

{#each attributes.items as item}
  <div class="radioItem" class:checked={attributes.value == item}>
    <input
      type="radio"
      id={item + title}
      bind:group={attributes.value}
      value={item}
      required={attributes.required}
      autocomplete={attributes.autoComplete} />
    <label for={item + title}>{item}</label>
  </div>
{:else}{console.warn('user items array not found')}{/each}
