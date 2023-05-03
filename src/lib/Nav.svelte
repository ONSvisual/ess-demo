<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  const links = [
    {path: `${base}/`, label: "Home"},
    {path: `${base}/map`, label: "Map"},
    {path: `${base}/scatter`, label: "Scatter chart"},
    {path: `${base}/line`, label: "Time series"},
    {path: `${base}/table`, label: "Table"},
  ];
</script>

<nav>
  {#each links as link}
  <a href="{link.path}" class:active={$page.url.pathname === link.path}>{link.label}</a>
  {/each}
</nav>

<style>
  nav > a {
    display: inline-block;
    padding-right: 6px;
  }
  nav > a + a {
    border-left: 1px solid grey;
    padding-left: 6px;
  }
  nav > a.active {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }
</style>