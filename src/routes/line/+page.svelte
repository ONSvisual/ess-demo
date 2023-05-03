<script>
  import { getContext } from "svelte";
  import { LineChart } from "@onsvisual/svelte-charts";
  import { makeLongData } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");

  $: longData = makeLongData(data.data[$state.dataset.code].places, data.data[$state.dataset.code].years);
</script>

<h1>Time series</h1>

{#key $state.dataset}
<div class="viz-container">
  <LineChart
    data={longData}
    xKey="year" yKey="ind" zKey="areacd" labelKey="areanm"
    yMin={Math.min(...longData.map(d => d.ind))}
    yTicks={[100]}
    area={false} legend={false} snapTicks={false}
    color="lightgrey" lineWidth={1}
    select hover labels
    on:select={(e) => $state.place = data.places.find(p => p.areacd === e.detail?.id)}
    selected={$state.place?.areacd}
    height="400px"/>
</div>
{/key}