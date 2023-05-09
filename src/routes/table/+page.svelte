<script>
  import { getContext } from "svelte";
  import Table from "$lib/Table.svelte";

  const state = getContext("state");
  const data = getContext("data");
</script>

<h1>Table</h1>

<Table
  data={data.data[$state.dataset.code].places}
  years={data.data[$state.dataset.code].years}
  unit={$state.dataset.unit}/>