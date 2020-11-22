<script>
  export let attributes;
</script>

<input
  type="password"
  bind:value={attributes.value}
  required={attributes.required}
  autocomplete={attributes.autoComplete}
  on:keyup />
