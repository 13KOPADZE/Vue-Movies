<template>
    <div>
        <div class="container background111" >
            <h1>Ad Astra</h1>
            <p>
                The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.
            </p>
        </div>
    </div>
</template>

<script>

export default {
  name: 'informationDesk',
  props: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .background111{
        max-width: 700px;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0);
    }
    h1{
       font-family: Abel, sans-serif;
        font-size: 48px;
        color: rgb(142, 142, 142);
    }
    p{
       font-family: Abel, sans-serif;
        font-size: 22px;
        line-height: 26px;
        color: rgb(142, 142, 142);
    }
    .d-flex{
        display: flex !important;
    }
    .align-items-center{
        align-items: center;
    }
    .justify-content-between{
        justify-content: space-between;
    }
</style>