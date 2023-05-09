<script>
  import { getContext } from "svelte";
  import { ScatterChart } from "@onsvisual/svelte-charts";
  import { colors } from "$lib/config";
  import { getYear, format, ukTick } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");

  $: chartData = data.data[$state.dataset.code].places;
  $: year = getYear($state);

  let hovered;
  $: activeCode = hovered ? hovered : $state.place ? $state.place.areacd : null;
</script>

<h1>Scatter Chart</h1>

<div class="viz-value">
  {#if activeCode}
  <strong>
    {format(data.data[$state.dataset.code].lookup[activeCode]?.[year], $state.dataset.unit)}
  </strong>
  in {data.lookup[activeCode]?.areanm}, {year}
  <small>
    ({@html format(data.data[$state.dataset.code].lookup[activeCode]?.[`${year}_change_abs`], $state.dataset.unit, "sign")}
  since {year - 1})
  </small>
  {/if}
</div>

{#key $state.dataset.code}
<div class="viz-container">
  <ScatterChart
    data={chartData}
    xTicks={[100]} yTicks={[0]} xFormatTick={ukTick} yFormatTick={() => "% change (+/-)"}
    xKey="{year}_ind" yKey="{year}_change_perc" zKey="{year}_biv_color"
    idKey="areacd" labelKey="areanm"
    colors={colors.biv.flat()} zDomain={colors.biv.flat()}
    colorHighlight="grey"
    legend={false} snapTicks={false}
    select hover labels
    on:select={(e) => $state.place = data.lookup[e.detail?.id]}
    selected={$state.place?.areacd} bind:hovered
    highlighted={$state.place ? data.places.filter(p => p.parentcd === $state.place.parentcd).map(p => p.areacd) : []}
    height="400px">
    <div slot="legend">
      <ul class="legend" aria-hidden="true">
        {#each [
          "Below avg. and falling",
          "Below avg. and rising",
          "Above avg. and falling",
          "Above avg. and rising"
        ] as item, i}
        <li>
          <div
            class="bullet round"
            style="background-color: {colors.biv.flat()[i]}; width: 10px; height: 10px"/>
          {item}
        </li>
        {/each}
      </ul>
    </div>
  </ScatterChart>
</div>
{/key}