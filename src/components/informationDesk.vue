<template>
    <div>
        <div class="background">
            <div class="container informationText d-flex align-items-end">
                <div class="flex-direction-column">
                    <h1>Ad Astra</h1>
                    <p>
                        The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.
                    </p>
                </div>
            </div>
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
    
    .background{
        background: linear-gradient(rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 41%, rgba(0, 0, 0, 0.65) 100%),  url('../assets/background.jpg');
        width: 100%;
        height: 600px;
        position: relative;
        background-size: cover;
        background-position: center center, center center !important;
    }
    .align-items-end{
        align-items: flex-end;
    }
    .informationText{
        height: 100%;
        color: rgb(255, 255, 255);
        background: rgba(0, 0, 0, 0);
        margin-bottom: 0px;
    }
    .flex-direction-column{
        max-width: 700px;
        margin-bottom: 50px;
        flex-direction: column;
        padding: 20px;
    }
    h1{
       font-family: Abel, sans-serif;
        font-size: 48px;
        color: rgb(255, 255, 255);
    }
    p{
       font-family: Abel, sans-serif;
        font-size: 22px;
        line-height: 26px;
        color: rgb(255, 255, 255);
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