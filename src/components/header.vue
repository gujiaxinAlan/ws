<template>
  <div class="header">
    <router-link to="/">
      <img src="../assets/images/word.png" alt="word"/>
    </router-link>
    <div class="right">
      <el-input
        size="large"
        placeholder="输入空格定位到案由,案件名称,案号,法院名称,案件类型等"
        icon="search"
        v-model.trim="input"
        @change="handleChange"
        @keydown.native.enter="handleIconClick"
        @keydown.native.space="handleSpace"
        :on-icon-click="handleIconClick">
      </el-input>
      <button @click="handleIconClick" class="btn btn-primary btn-lg" style="position: absolute;left: 510px;top: 0;height: 42px;background-color:#1c6991;">
        全文搜索
      </button>
      <button @click="handleResult" class="btn btn-primary btn-lg" style="position: absolute;left: 630px;top: 0;height: 42px;background-color:#1c6991;">
        结果中搜索
      </button>
      <ul v-show="flag" style="border: 1px solid #ccc;" class="dropdown">
        <h1>快捷分类<i class="el-icon-close" style="font-size: 14px;cursor: pointer;float: right;" @click="cancel"></i></h1>
        <li v-for="item in fields" :key="item" @click="set(item)" style="cursor: pointer;font-size: 20px;">{{item}}</li>
      </ul>
      <ul v-show="flag1" class="dropdown">
        <input class="form-control" type="text" v-model="filter" @input="filterAy" placeholder="用于过滤案由选项"
               style="margin-bottom: 10px;">
        <h1>分类<i class="el-icon-close" title="关闭提示框" style="cursor: pointer;float: right;" @click="cancel1"></i></h1>
        <li v-for="(item,index) in ay" :key="index" @click="setAy(item)">{{item}}</li>
      </ul>
      <img src="../assets/images/close.png" alt="close" v-show="input" @click="reset">
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        input: '',
        fields: ['案由', '案件名称', '案号', '法院名称', '案件类型', '审判程序', '文书类型', ' 裁判日期', '审判人员', '当事人', '法律依据'],
        flag: false,
        ay: [],
        flag1: false,
        num: 0,
        filter: '',
        temp: [],
        result: ''
      };
    },
    created() {
      this.result = window.sessionStorage.getItem('key');
      /* this.$http.get('/law-paper/v2/name-list/').then(res => {
         if (res.data.code === 100) {
           this.ay = res.data.data;
           this.temp = this.ay;
         }
       }).catch(err => {
         console.log(err);
       });*/
    },
    methods: {
      init(name) {
        this.$http.get(`/law-paper/v2/name-list/${name}`).then(res => {
          if (res.data.code === 100) {
            this.ay = res.data.data;
            this.temp = this.ay;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      handleChange() {
        if (!this.input) {
          this.num = 0;
        }
      },
      filterAy() {
        this.ay = this.ay.filter(item => {
          return new RegExp(this.filter).test(item)
        });
        if (!this.filter) {
          this.ay = this.temp
        }
      },
      cancel1() {
        this.flag1 = false;
      },
      cancel() {
        this.flag = false;
      },
      handleSpace() {
        this.flag = true;
      },
      handleResult() {
        if (this.input === '') {
          this.$message('请输入搜索条件')
          return;
        }
        this.result = this.result + ' ' + this.input.trim();
        this.$emit('changeSearch2', this.result);
        this.input = '';
      },
      set(item) {
        this.input += ` ${item}:`;
        this.flag = false;
        let filter = ['案由', '法院名称', '案件类型', '审判程序', '文书类型'];
        if (filter.includes(item)) {
          this.init(this.transform(item));
          this.flag1 = true;
        }
        document.querySelector('.el-input__inner').focus();
        if (/案由/.test(this.input)) {
          // this.flag1 = true;
          if (this.num < 1) {
            this.flag1 = true;
            this.num++;
          }
        }
      },
      setAy(item) {
        this.input += `${item}`;
        this.flag1 = false;
        window.document.querySelector('.el-input__inner').focus();
      },
      // 跳转到列表页
      handleIconClick() {
        if (this.input) {
          this.input = this.input.trim();
          this.result = this.input;
          this.num = 0;
//          this.$router.push({name: 'list', params: {keywords: this.input}});
          this.$emit('changeSearch', this.input);
          this.input = '';
        } else {
          this.$message({
            type: 'info',
            message: '请输入关键字'
          });
        }
      },

      transform(item) {
        let temp = '';
        switch (item) {
          case '案由':
            return 'ay';
          case '法院名称':
            return 'fy';
          case '案件类型':
            return 'ajlx';
          case '审判程序':
            return 'spcx';
          case '文书类型':
            return 'wslx';
          default:
            return '';
        }
      },

      rewrite(value) {
        this.input = value;
      },
      //清空输入框
      reset() {
        this.num = 0;
        this.input = '';
      }
    }
  };
</script>

<style scoped lang="scss">
  .header {
    font-family: "Microsoft YaHei UI", serif;
    margin: 8px 0;
    padding-bottom: 10px;
    img {
      height: 24px;
      vertical-align: text-bottom;
      margin-right: 16px;
      margin-left: 16px;
    }
    .right {
      position: relative;
      display: inline-block;
      width: 500px;
      .btn-lg {
        border: none;
        &:hover {
          background-color: #1c85eb !important;
        }
      }
      .dropdown {
        width: 500px;
        z-index: 1000;
        background-color: #fff;
        position: fixed;
        left: 212px;
        top: 50px;
        margin-top: 2px;
        height: 250px;
        overflow: auto;
        color: rgba(0, 0, 0, .7);
        h1 {
          color: #000;
          opacity: .5;
          font-weight: bolder;
          margin-bottom: 8px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, .6);
          i {
            position: relative;
            top: 4px;
            font-size: 20px;
            border-radius: 50%;
            overflow: hidden;
            color: rgb(147, 147, 147);
            &:hover {
              cursor: pointer;
              background-color: red;
              color: #fff;
            }
          }
        }
        padding: 16px;
        border-radius: 4px;
        box-shadow: inset 0 0 20px #e4e4e4;
        li {
          font-weight: bold;
          &:hover {
            color: #1979ff;
            background-color: #cfe8ed;
          }
        }
      }
      img {
        position: absolute;
        right: 19px;
        top: 12px;
        width: 16px;
        height: 16px;
        &:hover {
          cursor: pointer;
          opacity: .8;
        }
      }
    }
  }
</style>
