<script setup>
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
const greetMsg = ref("");
const name = ref("");

async function greet() {
    greetMsg.value = await invoke("greet", { name: name.value });
}
</script>


<template>
    <div>
        <p>Summer is here!</p>
        <input></input>
    </div>
</template>