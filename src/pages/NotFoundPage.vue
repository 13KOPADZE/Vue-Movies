<template>
  <div>
    <div class="tabs is-large container">
      <ul>
        <li class="is-active">
          Searched Movies
        </li>
      </ul>
    </div>
    <div class="svg-style">
      <IconComponent name="warning" />
      <h1 class="Danger">
        The website you were trying to reach couldn't be found on the server.
      </h1>
    </div>
  </div>
</template>
<script>
import IconComponent from '../components/IconComponent';
export default {
  components: {
    IconComponent
  }
};
</script>

<style scoped>
.svg-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.svg-style h1 {
  margin-top: 30px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
}
ul li {
  color: #3273dc;
  font-size: 28px;
}
</style>
