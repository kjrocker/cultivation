<script lang="ts">
    let xml = '';
    fetch("/ACS/Settings/AreaTypeDef/AreaTypeDef.xml")
        .then(val=>val.blob())
        .then(blob=>blob.text())
        .then(text=> xml = text)
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{xml}
