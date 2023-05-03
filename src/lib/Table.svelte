<script>
  import { sortData, commas } from "$lib/utils";

  export let data;
  export let years;

  $: _data = [...data];
</script>

<div class="table-container">
  <table>
    <thead>
      <tr>
        <th>
          <button on:click={() => _data = sortData(_data, "areanm")}>
            Name &#11137;
          </button>
        </th>
        <th>
          <button on:click={() => _data = sortData(_data, "areacd")}>
            Code &#11137;
          </button>
        </th>
        {#each years as y}
        <th class="right">
          <button on:click={() => data = sortData(data, `${y}`)}>
            {y} &#11137;
          </button>
        </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each _data as d}
      <tr>
        <td>{d.areanm}</td>
        <td>{d.areacd}</td>
        {#each years as y}
        <td class="right">{commas(d[`${y}`])}</td>
        {/each}
      </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-container {
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
  }
	table {
		border-collapse: collapse;
		width: 100%;
	}
	tr {
		border-bottom: 1px solid lightgrey;
	}
	thead > tr {
		border-bottom: 1px solid black;
	}
	th {
		text-align: left;
	}
	.right {
		text-align: right;
	}
	td + td, th + th {
		padding-left: 8px;
	}
	th > button {
		display: inline-block;
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		font-weight: bold;
		white-space: nowrap;
	}
</style>