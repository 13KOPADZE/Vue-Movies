<template>
    <div @keydown.esc="showModal = true" v-if="showModal" @click="showModal = false"  class="modal is-active">
        <div class="modal-background"></div>
        
            <div class="modal-content">

                <iframe v-bind:src="YOUTUBE_URL+ this.trailers"></iframe>
                
                <button class="modal-close is-large" aria-label="close" @click="$emit('close')">ez</button>

            </div>
        
    </div> <!-- Modal for Trailer -->
</template>