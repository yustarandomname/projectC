<script>
  export let attributes; // All field properties
</script>

<input
  type="email"
  bind:value={attributes.value}
  required={attributes.required}
  autocomplete={attributes.autoComplete}
  on:keyup />
