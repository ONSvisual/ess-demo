<script>
  import { getContext } from "svelte";
  import { Map, MapSource, MapLayer, MapTooltip } from "@onsvisual/svelte-maps";
  import { mapStyle, mapBounds } from "$lib/config";
  import { getYear } from "$lib/utils";

  const state = getContext("state");
  const data = getContext("data");
  $: year = getYear($state);
</script>

<h1>Map <small>{year}</small></h1>

<div class="viz-container">
  <Map id="map" style={mapStyle} location={{bounds: mapBounds}}>
    <MapSource id="bounds" type="geojson" promoteId="areacd" data={data.geojson}>
      <MapLayer
        id="fill"
        type="fill"
        data={data.data[$state.dataset.code].places}
        select hover
        on:select={(e) => $state.place = data.places.find((p) => p.areacd === e.detail?.id)}
        selected={$state.place?.areacd}
        colorKey="{year}_color"
        paint={{
          'fill-color': ['case',
            ['!=', ['feature-state', 'color'], null], ['feature-state', 'color'],
            'rgba(255, 255, 255, 0)'
          ],
          'fill-opacity': 0.7
        }}
        order="place_other"/>
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
  </Map>
</div>