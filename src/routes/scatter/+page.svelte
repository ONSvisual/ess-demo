<script>
  import { getContext } from "svelte";
  import { ScatterChart } from "@onsvisual/svelte-charts";
  import { colors } from "$lib/config";
  import { getYear } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");

  $: chartData = data.data[$state.dataset.code].places;
  $: year = getYear($state);
</script>

<h1>Scatter Chart <small>{year}</small></h1>

{#key $state.dataset.code}
<div class="viz-container">
  <ScatterChart
    data={chartData}
    xTicks={[100]} yTicks={[100]}
    xKey="{year}_ind" yKey="{year}_change_abs_ind" zKey="{year}_biv_color"
    idKey="areacd" labelKey="areanm"
    colors={colors.biv.flat()} zDomain={colors.biv.flat()}
    legend={false} snapTicks={false}
    select hover labels
    on:select={(e) => $state.place = data.places.find(p => p.areacd === e.detail?.id)}
    selected={$state.place?.areacd}
    height="400px"/>
</div>
{/key}