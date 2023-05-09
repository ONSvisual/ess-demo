<script>
  import { getContext } from "svelte";
  import { LineChart } from "@onsvisual/svelte-charts";
  import { makeLongData, getYear, format, ukTick } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");

  $: longData = makeLongData(data, $state.dataset.code);
  $: year = getYear($state);
  
  let hovered;
  $: activeCode = hovered ? hovered : $state.place ? $state.place.areacd : null;
</script>

<h1>Time series</h1>

<div class="viz-value">
  {#if activeCode}
  <strong>
    {format(data.data[$state.dataset.code].lookup[activeCode]?.[year], $state.dataset.unit)}
  </strong>
  in {data.lookup[activeCode]?.areanm}, {year}
  {/if}
</div>

{#key $state.dataset}
<div class="viz-container">
  <LineChart
    data={longData}
    xKey="year" yKey="ind" zKey="areacd" labelKey="areanm"
    yMin={Math.min(...longData.map(d => d.ind))}
    yTicks={[100]} yFormatTick={ukTick}
    area={false} legend={false} snapTicks={false}
    color="lightgrey" colorHighlight="darkgrey" lineWidth={1}
    padding={{left: 50, right: 100, top: 0, bottom: 20}}
    select hover labels
    on:select={(e) => $state.place = data.lookup[e.detail?.id]}
    selected={$state.place?.areacd}
    bind:hovered
    highlighted={$state.place ? data.places.filter(p => p.parentcd === $state.place.parentcd).map(p => p.areacd) : []}
    height="400px">
    <div slot="legend">
      <ul class="legend" aria-hidden="true">
        {#if $state.place}
        <li>
          <div
            class="bullet"
            style="background-color: #206095; width: 16px; height: 2px"/>
          {$state.place.areanm}
        </li>
        <li>
          <div
            class="bullet"
            style="background-color: darkgrey; width: 16px; height: 2px"/>
          Areas in selected region
        </li>
        {/if}
        <li>
          <div
            class="bullet"
            style="background-color: lightgrey; width: 16px; height: 1px"/>
          {activeCode ? "Areas in other regions" : "All areas"}
        </li>
      </ul>
    </div>
  </LineChart>
</div>
{/key}