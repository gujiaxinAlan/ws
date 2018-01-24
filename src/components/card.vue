<template>
  <div class="card">
    <a :href="`#/detail/${list.id}`" target="_blank">
      <dl>
        <dt>
          <span class="name" v-html="filter"></span>
          <span class="color">{{list.caseType}}</span>
        </dt>
        <dd style="color:#999">{{list.courtName}} &nbsp;&nbsp; | &nbsp;&nbsp;{{list.caseNumber}}
          &nbsp;&nbsp; | &nbsp;&nbsp;
          {{list.judgementDate}}
        </dd>
        <dd style="color:#333;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" v-html="filterContent"></dd>
      </dl>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: {
      list: {
        type: Object,
        default() {
          return {}
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
    }
  };
</script>

<style scoped lang="scss">
  .card {
    padding: 20px;
    border: 1px solid #ddd;
    transition: all .8s linear;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      box-shadow: 0 0 20px silver;
    }
    dl {
      dt {
        font-size: 20px;
        .name {
          color: #2ea5eb;
        }
        .color {
          background-color: #4990e2;
          border-radius: 2px;
          margin-left: 10px;
          padding: 4px 10px;
          font-size: 15px;
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
    margin-bottom: 20px;
  }
</style>
