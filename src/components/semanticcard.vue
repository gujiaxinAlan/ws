<template>
  <div class="semanticcard">
    <a :href="`#/semanticdetail/${list.id}`" target="_blank">
      <dl>
        <dt>
          <span class="name" v-html="filter"></span>
          <span class="color">{{list.caseType}}</span>
          <span class="color">{{list.docType}}</span>
         
        </dt>
        <dd style="color:rgba(0,0,0,0.45);">{{list.courtName}} &nbsp;&nbsp; |&nbsp;&nbsp;{{list.trialRound}} 
          &nbsp;&nbsp; | &nbsp;&nbsp;{{list.caseNumber}}&nbsp;&nbsp; | &nbsp;&nbsp;{{list.judgementDate}}
        </dd>
        <dd style="color:#333;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" v-html="filterContent"></dd>
      </dl>
    </a>
     <button @click="useful(q_id, list)" class="usefulButton"> 
           &nbsp;&nbsp;&nbsp;有用</button>
          <button @click="unuseful(q_id, list)" class="unusefulButton">
          </button>
  </div>
</template>

<script>
export default {
  name: "semanticcard",
  props: {
    list: {
      type: Object,
      default() {
        return {};
      }
    },
    q_id: {
      type: String,
      default() {
        return {};
      }
    }
  },
  computed: {
      filter() {
        let keywords = window.sessionStorage.getItem('keywords');
        return this.list.title.replace(keywords, `<span style="color:red">${keywords}</span>`)
      },
      filterContent() {
        let keywords = window.sessionStorage.getItem('keywords');
        return this.list.content.replace(keywords, `<span style="color:red;font-weight: bold">${keywords}</span>`);
      }
  },
   methods: {
     //有用信息反馈
     useful(q_id, doc){
        this.$http.post('/judgement/feedback',
        {"q_id":q_id,"doc_id":doc.id,"is_useful":'1' },{emulateJSON : true}).then(res => {
         }).catch(err =>  {
        console.log(err);
         // 响应错误回调    
      });
     },
     //无用信息反馈
     unuseful(q_id,doc){
        this.$http.post('/judgement/feedback',
        {"q_id":q_id,"doc_id":doc.id,"is_useful":'0' },{emulateJSON : true}).then(res => {
         }).catch(err =>  {
        console.log(err);
         // 响应错误回调    
      });

     },
     }

};
</script>

<style scoped lang="scss">
.semanticcard {
  position: relative;
  font-family: PingFangSC-Regular;
  width: 100%;

  padding: 20px;
  border: 1px solid #ddd;
  transition: all 0.8s linear;
  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 4px 0  rgba(0,0,0,0.12);
  }
  dl {
    dt {
      font-size: 20px;
      .name {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.85);
        letter-spacing: 0;
        line-height: 20px;
      }
      .color {
        background-color: #1890FF;;
        border-radius: 2px;
        margin-left: 10px;
        padding: 4px 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #fff;
        position: relative;
        top: -1px;
      }
    }
    dd {
      color: #999;
      font-size: 14px;
      margin-top: 15px;
    }
  }
  .usefulButton{
        position: absolute;
        top:16px;
        right: 58px;
        width: 60px;
        height: 32px;
        background:#E6F7FF  ;
        border-radius: 2px;
        border: 0px;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #1890FF ;
         background-image: url(../assets/images/el-icon-caret-top2.svg);
        background-repeat: no-repeat;
        background-position:10px center;
        &:hover {
        background:#1890FF  ;
        color: #FFFFFF ;
         background-image: url(../assets/images/el-icon-caret-top.svg);
         background-repeat: no-repeat;
        background-position:10px center;
        }
        &:onMouseDown{
          background:#1890FF  ;
        color: #FFFFFF ;
         background-image: url(../assets/images/el-icon-caret-top.svg);
         background-repeat: no-repeat;
        background-position:10px center;
        }
       }
        .unusefulButton{
        position: absolute;
        top:16px;
        right: 24px;
        width: 30px;
        height: 32px;
        background:#E6F7FF  ;
        border-radius: 2px;
        border: 0px;
        background-image: url(../assets/images/el-icon-caret-bottom.svg);
        background-repeat: no-repeat;
        background-position:center center;
        &:hover {
           background:#1890FF;
           /* img{
          src:"../assets/images/el-icon-caret-top2.svg"
         } */
         background-image: url(../assets/images/el-icon-caret-bottom2.svg);
         background-repeat: no-repeat;
        background-position:center center;
         }
      }
  margin-bottom: 24px;
}
</style>
