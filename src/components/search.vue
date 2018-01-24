<template>
  <div class="search">
    <header>
      <img src="../assets/images/logo.png" alt="logo">
    </header>
    <section>
      <el-input
        placeholder="输入空格定位到案由,案件名称,案号,法院名称,案件类型,审判程序等"
        icon="search"
        ref="elInput"
        v-model.trim="input"
        size="large"
        @keydown.native.enter="search"
        @keydown.native.space="handleSpace"
        :on-icon-click="search">
      </el-input>
      <ul v-show="flag" style="border: 1px solid #ccc;" class="dropdown">
        <h1>快捷分类<i class="el-icon-close" title="关闭提示框" style="cursor: pointer;float: right;" @click="cancel"></i></h1>
        <li v-for="item in fields" :key="item" @click="set(item)" style="cursor: pointer;font-size: 20px;">{{item}}</li>
      </ul>
      <ul v-show="flag1" class="dropdown">
        <input class="form-control" type="text" v-model="filter" @input="filterAy" placeholder="过滤" style="margin-bottom: 10px;">
        <h1>分类<i class="el-icon-close" title="关闭提示框" style="cursor: pointer;float: right;" @click="cancel1"></i></h1>
        <li v-for="(item,index) in ay" :key="index" @click="setAy(item)">{{item}}</li>
      </ul>
      <img src="../assets/images/close.png" alt="close" v-show="input" @click="reset">
    </section>
      <div class="search-button">
        <button @click="search">开始搜索</button>
        <button @click="goToSemanticList">语义搜索</button>
      </div>
    <p>千万法律⽂书，⼀站式检索</p>
    <footer>&copy;EaseStrategy 2017-2018 Terms and Conditions and Privacy Policy 苏ICP备16045103号-1</footer>
  </div>
</template>

<script>

  export default {
    name: 'search',
    data() {
      return {
        input: '',
        fields: ['案由', '案件名称', '案号', '法院名称', '案件类型', '审判程序', '文书类型', ' 裁判日期', '审判人员', '当事人', '法律依据'],
        ay: [],
        flag: false,
        flag1: false,
        num: 0,
        filter: '',
        temp: []
      }
    },
    created() {
      window.sessionStorage.clear();
     /* this.$http.get('/law-paper/v2/ay-list/').then(res => {
        if (res.data.code === 100) {
          this.ay = res.data.data;
          this.temp = this.ay;
        }
      }).catch(err => {
        console.log(err);
      });*/
    },
    mounted() {
      window.document.querySelector('.el-input__inner').focus();
      let active = 0;
       $('.dropdown').keydown( (e) => {
         if (e.keyCode === 38) {
           active--;
         } else if (e.keyCode === 40) {
           $('.dropdown li').eq(active).css({backgroundColor:'red'});
           active++;
         }
       })

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
      filterAy() {
        this.ay = this.ay.filter(item => {
          return new RegExp(this.filter).test(item);
        });
        if (!this.filter) {
          this.ay = this.temp;
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
      set(item) {
        this.input += ` ${item}:`;
        this.flag = false;
        let filter = ['案由', '法院名称', '案件类型', '审判程序', '文书类型'];
        if (filter.includes(item)) {
          this.init(this.transform(item));
          this.flag1 = true;
        }
        window.document.querySelector('.el-input__inner').focus();
        /*if (/案由/.test(this.input)) {
          this.flag1 = true;
          /!*if (this.num < 1) {
            this.flag1 = true;
            this.num++;
          }*!/
        }*/
      },
      transform(item) {
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
        }
      },
      setAy(item) {
        this.input += `${item}`;
        this.flag1 = false;
        window.document.querySelector('.el-input__inner').focus();
      },
      // 搜索跳转到列表页
      search() {
        if (this.input) {
          this.input = this.input.trim();
          this.num = 0;
          window.sessionStorage.setItem('key', this.input);
          window.localStorage.setItem('key', this.input);
          // this.$router.push({name: 'list', params: {keywords: this.input}});
          this.$router.push({name: 'list'})
        } else {
          this.$message({
            type: 'info',
            message: '请输入关键字'
          });
        }
      },

      // 清空输入框
      reset() {
        this.input = '';
        this.num = 0;
      },
      goToSemanticList(){
         this.$router.push({ path: '/semanticlist' }) 
        },
    }
  };
</script>

<style lang="scss" scoped>
  .search {
    header {
      text-align: center;
      margin-top: 150px;
      img {
        width: 210px;
        height: 92px;
      }
    }
    section {
      width: 40%;
      margin: 32px auto 0;
      position: relative;
      .el-icon-search {
        font-size: 25px !important;
      }
      img {
        position: absolute;
        right: 35px;
        top: 12px;
        width: 18px;
        height: 18px;
        &:hover {
          cursor: pointer;
          opacity: .6;
        }
      }
      .dropdown {
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
    }
    p {
      margin-top: 12px;
      text-align: center;
      color: #bbb;
      font-size: 12px;
      /*font-family: PingFangSC-Regular;*/
    }
    footer {
      position: fixed;
      bottom: 0;
      /*left: calc(50% - 1000px / 2);*/
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      text-align: center;
      font-size: 12px;
      color: rgba(0, 0, 0, .6);
      background: #f2f2f2;
      box-shadow: inset 0 1px 0 0 #e4e4e4;
      &:hover {
        color: #000;
      }
    }
    .one{
      background-color: #ff5a00;
      color:#fff;
    }
    .search-button{
      height: 76px;
      width: 198px;
      margin:0 auto; 	
      button{
        width: 88px;
        height: 36px;
        margin:  30px 8px 10px 0px;
        border: 1px solid rgba(0,0,0,0.15);
        background: rgba(0,0,0,0);
        border-radius: 2px;
          &:hover {
            background: rgba(0,0,0,0.04); 
          }
      }
    }
    .el-input__inner{
      background: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.15);
      border-radius: 2px;
      &:hover {
            box-shadow: 0 1px 2px 0 rgba(0,0,0,0.16);
          }
    }
  }
</style>
