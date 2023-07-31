<template>
  <div class="drugCheckContainer">
    <div class="topOption">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        style="width: 280px; margin-left: 100px"
        type="text"
      >
      </el-input>
      <el-button
        type="success"
        style="width: 65px; font-size: 10px; text-align: center"
        >搜索</el-button
      >
    </div>
    <div class="drugTable">
      <el-table stripe  border  style="width: 100%; color: black" :data="inCheckData.records" >
        <el-table-column align="center" prop="drugsId" label="编号" width="50"> </el-table-column>
       
        <el-table-column  align="center" prop="drugsName" label="药品名" width="140">
        </el-table-column>

        <el-table-column align="center" prop="drugsManufactor" label="生产企业" width="180" >
        </el-table-column>

        <el-table-column align="center" prop="checkStartTime" label="开始时间" width="140">
        </el-table-column>

        <el-table-column align="center" prop="checkEndTime" label="结束时间" width="140" >
        </el-table-column>

        <el-table-column align="center" prop="checkStatus" label="审核状态" width="100" >
        </el-table-column>

        <el-table-column align="center" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button size="mini" @click="toDetailPage(scope.row.drugsId)">查看详情</el-button>
            <el-button type="success" size="mini" @click="toInCheck(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <!-- <span class="demonstration">直接前往</span> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="inCheckData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "checkDrug",
  data() {
    return {
      page: 1,
      pageSize: 4,
     
      
    };
  },
  computed: {
    ...mapGetters(["inCheckData"]),
    records() {
      return this.inCheckData.records;
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
   async handleCurrentChange(val) {
        try {
          const params = {
            page: val,
            pageSize: this.pageSize,
            status:this.records.checkStatus
          };
          await this.$store.dispatch("queryAllIncheckDrugs", params);
        } catch (error) {}
    },
    
    //分页展示数据
    async getData() {
      try {
        const params = {

          // status:this.records.checkStatus,   请求没发出去无法拿到status，
          // 而我们想到它只要审核中的数据，于是将其值固定设置为2
          status:2,
          page: this.page,
          pageSize: this.pageSize,
        };
        await this.$store.dispatch("queryAllIncheckDrugs", params);
      } catch (error) {}
    },

      // 点击按钮去详情页面
      toDetailPage(drugsId) {
      // 路由传参，将要修改的数据的id传到详情页面
      this.$router.push({ path: `/drugDetail/${drugsId}` });
    },

    // 去审核页面
    toInCheck(row){
      const data = {
        drugsId:row.drugsId,
        drugsName:row.drugsName,
        drugsManufactor:row.drugsManufactor,
        checkStatus:row.checkStatus,
        checkContent:row.checkContent,
        version : row.version
      }
      this.$router.push({path:`/inCheckDrug/${row.drugsId}`, query:{data}})
    }

  }, 
};
</script>

<style lang="less" scoped>
.drugCheckContainer {
  /* display: flex; */
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  position: fixed;
  .topOption {
    /* display: flex; */
    width: 660px;
    height: 40px;
    position: absolute;
    left: 50%;
    margin-top: 70px;
    transform: translate(-50%, 50%);
  }
  .drugTable {
    position: absolute;
    /* display: flex; */
    top: 175px;
    width: 971px;
    left: 50%;
    transform: translate(-50%);
  }
  .pagination {
    position: absolute;
    left: 50%;
    margin-top: 15px;
    transform: translateX(-50%);
  }
}
</style>