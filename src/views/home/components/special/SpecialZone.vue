<template>
  <div id="specialZone">
    <div class="titleWrapper">
      <div class="title">{{ $t("home.specialZone") }}</div>
    </div>
    <!-- 新品尝鲜 -->
    <div class="wrapperItem">
      <div v-for="newItem in special_zone.newItemList" :key="newItem.id" class="newItem">
        <span class="itemTitle">{{ newItem.title }}</span>
        <p class="itemSubTitle">{{ newItem.subtitle }}</p>
        <img v-lazy="newItem.imageOne" class="itemImg" alt />
        <img v-lazy="newItem.imageTwo" class="itemImg" alt />
      </div>

      <!-- 九月热卖 -->
      <div v-for="hotItem in special_zone.hotItemList" :key="hotItem.id" class="hotItem">
        <span class="itemTitle hotItemTitle">{{ hotItem.title }}</span>
        <p class="itemSubTitle">{{ hotItem.subtitle }}</p>
        <img v-lazy="hotItem.imageOne" class="itemImg" alt />
        <img v-lazy="hotItem.imageTwo" class="itemImg" alt />
      </div>

      <!-- VIP专享 -->
      <div v-for="vipItem in special_zone.vipItemList" :key="vipItem.id" class="vipItem">
        <span class="itemTitle vipItemTitle">{{ vipItem.title }}</span>
        <p class="itemSubTitle">{{ vipItem.subtitle }}</p>
        <img v-lazy="vipItem.imageOne" class="itemImg" alt />
        <img v-lazy="vipItem.imageTwo" class="itemImg" alt />
      </div>

      <!-- 其他列表 -->
      <div v-for="otherItem in special_zone.otherItemList" :key="otherItem.id" class="otherItem">
        <p class="otherTitle">{{ otherItem.title }}</p>
        <p class="otherSubTitle">{{ otherItem.subtitle }}</p>
        <img class="otherImage" src="@/images/special/peanut.jpeg" alt />
      </div>

      <!-- 平价菜场 -->
      <div
        v-for="lowPriceItem in special_zone.lowPriceItemList"
        :key="lowPriceItem.id"
        class="lowPrice"
      >
        <p class="otherTitle">{{ lowPriceItem.title }}</p>
        <p class="otherSubTitle">{{ lowPriceItem.subtitle }}</p>
        <img class="otherImage" :src="lowPriceItem.image" alt />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    special_zone: Object
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
#specialZone {
  margin-top: 0.625rem;
  padding: 1.25rem 0 0.9375rem 0;
  background-color: white;
}
.titleWrapper {
  margin: 0 0.625rem 0.625rem 0.625rem;
  height: 1.5625rem;
}
.title {
  display: inline-block;
  border-left: 4px #3cb963 solid;
  padding-left: 0.3125rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
  vertical-align: middle;
  font-size: 1.1875rem;
}
.wrapperItem {
  width: 95%;
  height: 10rem;
  border: 0.01rem solid #dddbc0;
  margin-left: 2.5%;
}
.wrapperItem .newItem {
  float: left;
  width: 49.9%;
  height: 5rem;
  border-right: 0.01rem solid #dddbc0;
  border-bottom: 0.01rem solid #dddbc0;
}
.itemTitle {
  width: 100%;
  font-size: 0.625rem;
  background-image: linear-gradient(135deg, red, orange);
  -webkit-background-clip: text;
  color: transparent;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
}

.itemSubTitle {
  font-size: 0.45rem;
  color: grey;
  padding-left: 0.5rem;
  padding-top: 0.3rem;
}
.hotItem {
  float: left;
  width: 49.9%;
  height: 5rem;
  border-bottom: 0.01rem solid #dddbc0;
}
.hotItemTitle {
  background-image: linear-gradient(150deg, #b2233f, #f70d3c);
  -webkit-background-clip: text;
  color: transparent;
}
.vipItem {
  float: left;
  width: 49.9%;
  height: 5rem;
  border-right: 0.01rem solid #dddbc0;
}
.vipItemTitle {
  background-image: linear-gradient(150deg, #0e9e09, #51b14d);
  -webkit-background-clip: text;
  color: transparent;
}
.itemImg {
  padding: 0.3rem 0.5rem 0rem 0.7rem;
  width: 3rem;
  height: 2.5rem;
}
.otherItem {
  float: left;
  width: 25%;
  border-right: 0.01rem solid #dddbc0;
  height: 5rem;
}

.otherTitle {
  font-size: 0.625rem;
  color: black;
  padding-left: 0.5rem;
  padding-top: 0.5rem;
}

.otherSubTitle {
  font-size: 0.45rem;
  color: grey;
  padding-left: 0.5rem;
  padding-top: 0.3rem;
}

.otherImage {
  width: 2.5rem;
  height: 2.5rem;
  padding-left: 1rem;
  border-radius: 50%;
}
.lowPrice {
  float: left;
  width: 24.5%;
  height: 5rem;
}
</style>
