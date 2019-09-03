<template>
  <div class="item-Radio" @click="click">
    <span class="item-tag">
      <span class="title-neccesarry" v-if="validator.required">*</span>
      {{text}}
    </span>
    <span class="choose-content">{{ddd.length>0?ddd:tips}}</span>
    <div class="gray-marsk" @click="clickContent" v-show="showModal">
      <div class="marsk-content">
        <el-radio-group :value="ddd" @input="changeRadio">
          <el-radio v-for="(item,index) in source" :label="item.text" :key="index">{{item.text}}</el-radio>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { arrayToStr } from "@/utils/utils.js";

export default {
  name: "itemRadio",
  updated() {
    // console.log(this.cascader);
  },
  props: {
    text: String,
    column: String,
    tips: String,
    validator: {
      type: Object,
      default: function() {
        return {};
      }
    },
    cascader: Object,
    source: Array
  },

  data() {
    return {
      showModal: false,
      radio2: ""
    };
  },
  computed: {
    computedColumn() {
      return this.column.split(",");
    },
    ...mapState({
      ddd(state) {
        let key = this.computedColumn;
        let str = `state.form.form`;
        // console.log(state.form.form[this.column].value);
        if (key.length > 1) {
          str += arrayToStr([...key, "value"]);
          // console.log(eval(str));
          return eval(str) + "";
        }
        return state.form.form[this.column].value;
      }
    })
  },
  methods: {
    ...mapActions("form", ["changeTemplate"]),
    ...mapMutations("form", [
      "changeFormData",
      "changeModalData",
      "changeFormDataCascader"
    ]),
    click(e) {
      let source = this.source || [];
      // console.log(source,this.text);
      if (source.length <= 0 && this.text === "项目ID") {
        e.stopPropagation();
        this.changeModalData({ showModal: true, content: "请先选择客户" });
        return;
      }
      this.showModal = true;
    },
    changeRadio(value) {
      // console.log(value);

      let item = this.source.find(item => item.text == value);
      // 存在联动关系
      if (this.cascader) {
        // 有api 的需要修改api
        if (this.cascader.api) {
          this.changeTemplate({ value: item.value, cascader: this.cascader });
        } else {
          // 没有api的直接取值 赋值
          let { items } = this.cascader;
          if (typeof items == "string") {
            items = JSON.parse(items);
          }
          this.changeFormDataCascader({
            key: [...this.computedColumn],
            cascader: items,
            value: item
          });
        }
      }
      if (this.text === "项目ID") {
        this.changeFormData({ key: this.computedColumn, value: item.text });
      } else {
        this.changeFormData({ key: this.computedColumn, value: item.text });
      }
      // console.log(item);
      this.showModal = false;
    },
    clickContent(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      this.showModal = false;
    }
  }
};
</script>

<style lang="less" scoped>
.item-Radio {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  background: #fff;
  .title-neccesarry {
    color: red;
    font-size: 1em;
  }
  span {
    // width: 10em;
    text-align: left;
  }
  .item-tag{
    flex-basis: 35%
  }
  .choose-content {
    flex-basis: 65%;
    padding-right: 20px;
    position: relative;
    text-align: right;
  }
  .choose-content:after {
    content: "";
    right: 0;
    top: 5px;
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border-top: 1px solid #aaa;
    border-right: 1px solid #aaa;
  }
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
    max-width: 80%;
    min-width: 50%;
    max-height: 20em;
    overflow-y: scroll;
    background: #fff;
    padding: 1em 1em 0 1em;
    .el-radio {
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      // overflow-y: hidden
      // max-width: 20em;
    }
  }
}
.el-radio-group {
  display: flex;
  flex-direction: column;
  // justify-content: flex-start;
  label {
    text-align: left;
    margin-bottom: 1em;
  }
}
</style>