<template>
  <div class="about">
    <div class="about-title">
      <span class="title-back" @click="handleBack">返回</span>
      <span class="title-text">亿信推垫款充值单</span>
    </div>
    <div class="about-submit">
      <p @click="handleSubmit">提交</p>
    </div>
    <ul class="content-container">
      <!-- <ItemDate tagName="申请日期" />
      <ItemInput tagName="垫款充值单号" />
      <ItemRadio tagName="付款方式" />-->

      <div v-for="(item,index) in template" :key="index" class="content-item">
        <ItemInput
          v-if="item.type==='input'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
        />
        <ItemLabel
          v-if="item.type==='label'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
          :disabled="true"
          :operator="item.operator"
        />
        <ItemRadio
          v-if="item.type==='select'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
          :source="item.source"
          :cascader="item.cascader"
        />
        <ItemDate
          v-if="item.type==='date'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
        />
        <ItemList
          v-if="item.type==='detail'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
          :details="item.details"
        />
        <ItemUpload
          v-if="item.type==='upload'"
          :text="item.text"
          :column="index+''"
          :tips="item.tips"
          :validator="item.validator||{}"
        />
      </div>
    </ul>

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
// import Nav from "@/components/Nav.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { submit } from "@/api/form";
import { Loading } from "element-ui";
import ItemDate from "@/components/ItemDate.vue";
import ItemInput from "@/components/ItemInput.vue";
import ItemRadio from "@/components/ItemRadio.vue";
import ItemList from "@/components/ItemList.vue";
import ItemUpload from "@/components/ItemUpload.vue";
let submitDisabled = false;
export default {
  name: "about",
  created() {
    let flowTypeId = this.$router.history.current.query.flowTypeId;
    let userId = localStorage.getItem("userId")
    this.flowTypeId = flowTypeId
    this.userId = userId;
    this.initAll({ flowTypeId, cuid: userId});
    // this.initAll({ flowTypeId:4 , cuid: "101277" });
  },
  

  methods: {
    ...mapActions("form", ["initAll"]),
    ...mapMutations("form", ["initForm", "changeModalData", "checkForm"]),
    handleBack() {
      this.$router.go(-1);
    },
    async handleSubmit() {
      // console.log(submitDisabled);
      if (submitDisabled) return;
      this.checkForm();
      // console.log(this.ok);
      if (this.ok) {
        let form = this.form;
        let ary = [];
        for (let i = 0; i < form.length; i++) {
          let obj = {};
          let cur = form[i];
          obj.name = cur.name;
          obj.type = cur.type;
          if (cur.type == "JSON") {
            obj.value = JSON.stringify(cur.value).replace(new RegExp(',"required":true','g'),"");
          } else {
            obj.value = cur.value;
          }
          ary.push(obj);
        }
        submitDisabled = true;
        try {
          // let response = await submit({list:ary,flowTypeId:this.flowTypeId},this.flowTypeId,101277);
          let response = await submit({list:ary,flowTypeId:this.flowTypeId},this.flowTypeId, this.userId);
          submitDisabled = false;
          let { code, data, message } = response;
          if (code == 0) {
            this.$router.push("/");
          }
        } catch (e) {
          submitDisabled = false;
          console.log(e);
        }
      }
    },
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
  computed: {
    ...mapState({
      form: state => state.form.form,
      template: state => state.form.template,
      showModal: state => state.form.showModal,
      content: state => state.form.content,
      ok: state => state.form.formOk
    })
  },
  data() {
    return {};
  },
  components: {
    ItemDate,
    ItemInput,
    ItemRadio,
    ItemList,
    ItemUpload
  }
};
</script>

<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background: #f1f1f1;
  overflow: scroll;
  padding: 1em 0;
  box-sizing: border-box;
  .about-title {
    max-width: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    top: 0;
    // left: 0;
    position: fixed;
    height: 3em;
    width: 100%;
    z-index: 999;
    padding: 0.5em;
    box-sizing: border-box;
    .title-back {
      position: absolute;
      left: 0;
      color: #409eff;
      padding: 0 1.2em;
      cursor: pointer;
    }
    .title-back::before {
      content: "";
      left: 0.5em;
      top: 5px;
      position: absolute;
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      border-bottom: 1px solid #409eff;
      border-left: 1px solid #409eff;
    }
  }
  .about-submit {
    max-width: 1000px;
    background: #fff;
    bottom: 0;
    // left: 0;
    position: fixed;
    height: 4em;
    width: 100%;
    z-index: 999;
    padding: 0.5em;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      max-width: 500px;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #409eff;
      color: #fff;
      cursor: pointer;
    }
  }

  .content-container {
    padding: 3em 0 4em 0;
  }
  .content-item {
    margin-bottom: 1em;
    background: #fff;
  }

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