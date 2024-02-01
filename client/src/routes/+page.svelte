<!-- src/routes/index.svelte -->
<script>
  export let users = [];
</script>

<h1>Users</h1>

<ul>
  {#each users as user}
    <li>{user.name} - {user.email}</li>
  {/each}
</ul>
