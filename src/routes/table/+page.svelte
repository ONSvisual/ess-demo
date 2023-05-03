<script>
  import { getContext } from "svelte";
  import Table from "$lib/Table.svelte";

  const state = getContext("state");
  const data = getContext("data");

  $: tableData = data.data[$state.dataset.code].places;
  $: years = data.data[$state.dataset.code].years;
</script>

<h1>Table</h1>

<Table data={tableData} {years}/>