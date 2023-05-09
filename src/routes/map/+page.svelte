<script>
  import { getContext } from "svelte";
  import { Map, MapSource, MapLayer, MapTooltip } from "@onsvisual/svelte-maps";
  import BreaksChart from "$lib/BreaksChart.svelte";
  import { mapStyle, mapBounds, colors } from "$lib/config";
  import { getYear, format, numToString } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");
  $: year = getYear($state);

  let hovered;
  $: activeCode = hovered ? hovered : $state.place ? $state.place.areacd : null;
</script>

<h1>Map</h1>

<div class="viz-value">
  {#if activeCode}
  <strong>
    {format(data.data[$state.dataset.code].lookup[activeCode]?.[year], $state.dataset.unit)}
  </strong>
  in {data.lookup[activeCode]?.areanm}, {year}
  {/if}
</div>

<div class="viz-container">
  <Map id="map" style={mapStyle} location={{bounds: mapBounds}}>
    {#key $state.dataset.code}
    <MapSource id="bounds" type="geojson" promoteId="areacd" data={data.geojson}>
      <MapLayer
        id="fill"
        type="fill"
        data={data.data[$state.dataset.code].places}
        select hover
        bind:hovered
        on:select={(e) => $state.place = data.lookup[e.detail?.id]}
        selected={$state.place?.areacd}
        colorKey="{year}_color"
        paint={{
          'fill-color': ['case',
            ['!=', ['feature-state', 'color'], null], ['feature-state', 'color'],
            'rgba(255, 255, 255, 0)'
          ],
          'fill-opacity': 0.7
        }}
        order="place_other">
          <MapTooltip content={data.lookup[hovered]?.areanm}/>
        </MapLayer>
      <MapLayer
        id="line"
        type="line"
        paint={{
          'line-color': ['case',
            ['==', ['feature-state', 'selected'], true], 'black',
            ['==', ['feature-state', 'hovered'], true], 'orange',
            'rgba(255, 255, 255, 0)'
          ],
          'line-width': ['case',
            ['==', ['feature-state', 'selected'], true], 2,
            1
          ]
        }}
        order="place_other"/>
    </MapSource>
    {/key}
  </Map>
</div>
<div class="viz-value">
  <BreaksChart
    breaks={data.data[$state.dataset.code].breaks[year]}
    colors={colors.seq}
    selected={$state.place ? data.data[$state.dataset.code].lookup[$state.place.areacd]?.[year]: null}
    hovered={hovered ? data.data[$state.dataset.code].lookup[hovered]?.[year] : null}
    unit={$state.dataset.unit}/>
</div>