<template>
    <div class="patientContainer">
      <div class="patientTable">
        <el-table
            :data="tableData"
          stripe
          border
          style="width: 100%; color: black"
        >
          <el-table-column
            align="center"
            prop="patientId"
            label="编号"
            width="60"
          >
          </el-table-column>
  
          <el-table-column
            align="center"
            prop="deptName"
            label="诊断科"
            width="180"
          >
          </el-table-column>
  
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="downloadResult(scope.row)"
                >下载诊断</el-button
              >
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

          >
          </el-pagination>
        </div>
      </div>
    </div>
  </template>
    
    <script>
import { mapGetters } from 'vuex'
  export default {
    name:"downLoadPatient",
    data() {
        return {
            tableData:[],
            page:1,
            pageSize:4
        }
    },
    mounted() {
       this.showPatient()
    },
    computed: {
        ...mapGetters(['overCount'])

    },
    methods: {
        handleCurrentChange(){

        },
        async showPatient(){
            const patientData = this.$route.query
            const patientId = this.$route.query.patientId
           await this.$store.dispatch('queryOverCount',patientId)

           const overCount1 = JSON.parse(JSON.stringify(this.overCount))
           this.tableData = overCount1
            console.log(this.tableData)
            // console.log(patientData)
            console.log(overCount1)
        },

    },
  }
  </script>
    
    <style lang="less" scoped>
  .patientContainer {
    /* display: flex; */
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    position: fixed;
   
    .patientTable {
      position: absolute;
      /* display: flex; */
      top: 175px;
      width: 541px;
      left: 50%;
      transform: translate(-50%);
    }
    .buttonstyle {
      width: 79px;
    }
    .pagination {
      position: absolute;
      left: 50%;
      margin-top: 15px;
      transform: translateX(-50%);
    }
  }
  </style>