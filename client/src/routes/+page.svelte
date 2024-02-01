<script>
  import { onMount } from 'svelte';
  
  let users = [];

  onMount(async () => {
    const response = await fetch('http://localhost:5000/users');
    if (response.ok) {
      users = await response.json();
    } else {
      console.error('Failed to fetch users');
    }
  });
</script>

<h1>Users</h1>

<ul>
  {#each users as user}
    <li>{user.name}</li>
  {/each}
</ul>