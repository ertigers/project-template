<template>
    <div class="summary-container">
    <!-- 日期 -->
    <div class="day">
      <svg-icon icon-class="left" />
      <span>{{day}}</span>
      <svg-icon icon-class="right" />
    </div>
    <!-- 考勤情况 -->
    <div  v-for="(item,index) in employeeList" :key="index" >
      <div class="app-warp"  @click="goDetail(index)" v-if= item.showSimple>
      <h4>
        {{item.name}}
        <svg-icon icon-class="calendar" />
      </h4>
      <div class="attendance">
        <span>出勤:</span>
        <div class="info">
          <span>应到{{item.should}}天</span>
          <span>实到{{item.actual}}天</span>
          <span>出差{{item.business}}天</span>
          <span>加班{{item.overtime}}小时</span>
        </div>
      </div>
      <div class="vacation">
        <span>假期:</span>
        <div class="info">
          <span>带薪假{{item.paid}}小时</span>
          <span>事假{{item.affair}}小时</span>
          <span>病假{{item.illness}}小时</span>
        </div>
      </div>
      <div class="abnormal">
        <span>异常:</span>
        <span>迟到早退{{item.abnormal}}分钟</span>
      </div>
      </div>
      <div class="detail" v-if= item.showDetail>
        <svg-icon icon-class="recover"  @click="goCover(index)"/>
      </div>
    </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
      name: "",
  data() {
    return {
      day:"",
      employeeList:[
        {
          name:"李华---软件部",
          should:"20",
          actual:"20",
          business:"0",
          overtime:"36",
          paid:"11.5",
          affair:"15.5",
          illness:"0",
          abnormal:"0",
          showSimple:true,
          showDetail:false
        },
        {
          name:"李力龙---软件部",
          should:"20",
          actual:"20",
          business:"0",
          overtime:"36",
          paid:"11.5",
          affair:"15.5",
          illness:"0",
          abnormal:"0",
          showSimple:true,
          showDetail:false
        },
      ],
      showDetail:false
    }
  },
  mounted() {
    this.day = moment().format("YYYY-MM");
  },
  methods:{
    goDetail(index){
      this.employeeList[index].showDetail = true;
      this.employeeList[index].showSimple = false
      console.log(this.employeeList[index]);
    },
    goCover(index){
      this.employeeList[index].showDetail = false;
      this.employeeList[index].showSimple = true
    }
  }
}
</script>

<style lang="scss" scoped>
.summary-container{
        .day{
      padding-top: 21px;
      padding-right: 12px;
      display: flex;
      justify-content: flex-end;
      span{
        font-size: 14px;
        font-weight: 400;
        color: #3E73FE;
      }
    }
    .app-warp{
      margin: 8px 12px;
      width: 335px;
      height: 120px;
      background: #FFFFFF;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.09);
      border-radius: 8px 8px 8px 8px;
      h4{
        margin: 0;
        padding: 9px 12px 0px 12px;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #011627;
        .svg-icon{
          position: absolute;
          left: 320px;
          // margin-left:180px;
          width: 18px;
          height: 18px;
        }
      }
      .attendance{
        margin-left: 12px;
        margin-top: 7px;
        span{
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #20A4F3;
        }
        .info{
          display: inline-block;
          margin-left: 6px;
          margin-right: 6px;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(37,129,255,0.06);
            span:nth-child(-n+3){
              margin-right: 25px;
            }
            span{
              color: rgba(0,0,0,0.7);
            }
        }
      }
      .vacation{
        margin-left: 12px;
        margin-top: 7px;
        span{
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #2EC4B6;
        }
        .info{
          display: inline-block;
          margin-left: 6px;
          margin-right: 6px;
          padding-bottom: 3px;
          border-bottom: 1px solid rgba(37,129,255,0.06);
            span:nth-child(-n+3){
              margin-right: 22px;
            }
            span{
              color: rgba(0,0,0,0.7);
            }
        }
      }
      .abnormal{
        margin-left: 12px;
        margin-top: 7px;
        span:nth-child(0n+1){
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #FF3366;          
        }
        span:nth-child(0n+2){
          margin-left: 6px;
          font-size: 12px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: rgba(0,0,0,0.7);
        }
      }
    }
    .detail{
      width: 351px;
      height: 493px;
      background: #2EC4B6;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.09);
      border-radius: 8px 8px 0px 0px;
    }
}
</style>