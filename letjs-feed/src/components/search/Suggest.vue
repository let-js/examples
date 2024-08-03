<template>
  <el-autocomplete
    v-model="query"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="handleSelect"
  >
  </el-autocomplete>
</template>
<style lang="scss">
  .el-autocomplete {
    width: 500px;
  }
  .el-autocomplete input {
    height: 38px;
  }
  .navbar button {
    height: 40px;
    width: 60px;
  }
  .el-form--inline .el-form-item {
    margin-right: 20px;
  }
</style>
<script>
  export default {
    data() {
      return {
        restaurants: [],
        query: '',
        timeout: null
      }
    },
    methods: {
      loadAll() {
        // data from backend
        return [
          { value: 'aa', address: '长宁区新渔路144号' },
          { value: 'bb', address: '上海市长宁区淞虹路661号' },
          { value: 'cc', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
          { value: '泷千家(天山西路店)', address: '天山西路438号' },
          {
            value: '胖仙女纸杯蛋糕（上海凌空店）',
            address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
          },
          { value: '贡茶', address: '上海市长宁区金钟路633号' },
          {
            value: '豪大大香鸡排超级奶爸',
            address: '上海市嘉定区曹安公路曹安路1685号'
          },
          {
            value: '茶芝兰（奶茶，手抓饼）',
            address: '上海市普陀区同普路1435号'
          }
        ]
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants
        if (!restaurants) return
        var results = queryString
          ? restaurants.filter(this.createStateFilter(queryString))
          : restaurants

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter(queryString) {
        return (state) => {
          return (
            state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          )
        }
      },
      handleSelect(item) {
        console.log(item)
      }
    },
    mounted() {
      this.restaurants = this.loadAll()
    }
  }
</script>
