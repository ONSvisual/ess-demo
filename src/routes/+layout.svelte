<script>
  import "../app.css";
  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import Content from "$lib/Content.svelte";
  import Nav from "$lib/Nav.svelte";
  import { datasets } from "$lib/config";

  export let data;

  const state = writable({
    place: null,
    dataset: datasets[0],
    year: data.years[data.years.length - 1]
  });
  
  setContext("state", state);
  setContext("data", data);
</script>

<Content>
  <div class="selectors">
    <label>
      Area<br/>
      <select bind:value={$state.place}>
        <option value={null}>No area selected</option>
        {#each data.places as place}
        <option value={place}>{place.areanm}</option>
        {/each}
      </select>
    </label>
    <label>
      Dataset<br/>
      <select bind:value={$state.dataset}>
        {#each datasets as dataset}
        <option value={dataset}>{dataset.label}</option>
        {/each}
      </select>
    </label>
    <label>
      Year<br/>
      <select bind:value={$state.year}>
        {#each data.years as year}
        <option value={year}>{year}</option>
        {/each}
      </select>
    </label>
  </div>
  <Nav/>
  {#if $state}
  <slot/>
  {/if}
</Content>

<style>
  div.selectors {
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;
  }
  div.selectors > label {
    margin-right: 10px;
  }
</style>