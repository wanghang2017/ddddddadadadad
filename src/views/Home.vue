<template>
  <div class="home">
    <div>
      <MenuContainer v-for="(menu,index) in menus" :menu="menu" :key="index" />
    </div>

    <div class="gray-marsk" v-show="showModal">
      <div class="marsk-content" @click.stop>
        <p>{{content}}</p>
        <div>
          <span @click="clickContent" class="ok">确认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import MenuContainer from "@//components/MenuContainer.vue";
import { menu } from "@/data/data.js";
import { mapState, mapActions } from "vuex";
export default {
  name: "home",
  created() {
    // this.init({ cuid: localStorage.getItem("userId") });
    if (this.menus.length <= 0) {
      this.init({ cuid: localStorage.getItem("userId") });
    }
  },
  data: function() {
    return {};
  },
  computed: {
    ...mapState({
      menus: state => state.home.menu,
      showModal: state => state.form.showModal,
      content: state => state.form.content
    })
  },
  methods: {
    ...mapActions("home", ["init"]),
    clickContent(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      this.changeModalData({ showModal: false, content: "" });
    }
  },
  components: {
    Nav,
    MenuContainer
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background: #eee;
  overflow: scroll;

  .gray-marsk {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    // padding: 1em;
    .marsk-content {
      max-width: 500px;
      width: 50%;
      background: #fff;
      padding: 1em;
    }
    .ok {
      background: #409eff;
      border-radius: 3px;
      width: 4em;
      display: inline-block;
      margin-top: 1em;
    }
  }
}
</style>
