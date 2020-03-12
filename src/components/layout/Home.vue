<template>
  <el-container>
    <el-header class="header bgColor" :style="{height: herdHeight + 'px',padding:0}">
      <vHeader />
    </el-header>
    <el-container :style="{'margin-top':herdHeight + 'px'}" id="container">
      <div id="container_left">
        <vMenu />
      </div>
      <div class="main" id="container_right">
        <router-view name="pages" class="main_box" />
      </div>
    </el-container>

    <!-- <el-footer class="footer bgColor">
      <div>2016-2019 © 成都快扣科技有限公司</div>
    </el-footer>-->
  </el-container>
</template>

<script>
import vHeader from "./HeaderT";
import vMenu from "./Menu";

export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          label: "系统管理",
          path: "/setting",
          icon: "el-icon-setting",
          child: [
            {
              label: "菜单管理",
              icon: "el-icon-menu",
              path: "/Menu"
            },
            {
              label: "角色管理",
              icon: "el-icon-user",
              path: "/Role"
            },
            {
              label: "用户管理",
              icon: "el-icon-s-custom",
              path: "/User"
            },
            {
              label: "字典管理",
              icon: "el-icon-notebook-2",
              path: "/Dict"
            },
            {
              label: "意见反馈",
              icon: "el-icon-notebook-1",
              path: "/FeedBack"
            }
          ]
        },
        {
          label: "商品管理",
          path: "/home",
          icon: "el-icon-location",
          child: [
            {
              label: "类目管理",
              icon: "el-icon-menu",
              path: "/GoodsType"
            },
            {
              label: "税收编码管理",
              icon: "el-icon-shopping-bag-1",
              path: "/TaxCodeManager"
            },
            {
              label: "商品维护",
              icon: "el-icon-shopping-bag-1",
              path: "/GoodsUphold"
            },
            {
              label: "商品发布",
              icon: "el-icon-sell",
              path: "/GoodsAdd"
            },
            {
              label: "商品回收站",
              icon: "el-icon-delete",
              path: "/GoodsGarbage"
            }
          ]
        },
        {
          label: "库存管理",
          path: "/kucun",
          icon: "el-icon-takeaway-box",
          child: [
            {
              label: "库存管理",
              icon: "el-icon-takeaway-box",
              path: "/Inventory"
            }
          ]
        },
        {
          label: "客户管理",
          path: "/kh",
          icon: "el-icon-user",
          child: [
            {
              label: "客户管理",
              icon: "el-icon-user",
              path: "/Customer"
            },
            {
              label: "客户类型列表",
              icon: "el-icon-collection",
              path: "/CustomerType"
            }
          ]
        },
        {
          label: "分销商管理",
          path: "/fx",
          icon: "el-icon-shopping-cart-full",
          child: [
            {
              label: "分销商管理列表",
              icon: "el-icon-shopping-cart-full",
              path: "/Distributor"
            }
          ]
        },
        {
          label: "促销管理",
          path: "/cx",
          icon: "el-icon-s-promotion",
          child: [
            {
              label: "促销管理",
              icon: "el-icon-s-promotion",
              path: "/Promotion"
            },
            {
              label: "优惠券管理",
              icon: "el-icon-discount",
              path: "/Coupon"
            }
          ]
        },
        {
          label: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
          child: [
            {
              label: "商品订单",
              icon: "el-icon-s-order",
              path: "/GoodsOrder"
            },
            {
              label: "定制订单",
              icon: "el-icon-s-order",
              path: "/MadeOrder"
            }
          ]
        },
        {
          label: "发票管理",
          path: "/fp",
          icon: "el-icon-notebook-2",
          child: [
            {
              label: "发票列表",
              icon: "el-icon-notebook-2",
              path: "/InvoiceList"
            },
            {
              label: "开票信息",
              icon: "el-icon-notebook-1",
              path: "/InvoiceInfo"
            }
          ]
        },
        {
          label: "广告管理",
          path: "/gg",
          icon: "el-icon-money",
          child: [
            {
              label: "广告管理",
              icon: "el-icon-money",
              path: "/Advert"
            }
          ]
        }
      ],
      herdHeight: "40" //头部高度
    };
  },
  methods: {
    init() {
      let { windowHeight } = this.$store.state;
      document.querySelector("#container").style.height =
        windowHeight - 40 + "px";
      document.querySelector(".main_box").style.minHeight =
        windowHeight - 80 + "px";
    }
  },
  components: {
    vHeader,
    vMenu
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(to, from) {
      let { windowHeight } = this.$store.state;
      this.$nextTick(() => {
        document.querySelector(".main_box").style.minHeight =
          windowHeight - 80 + "px";
      });
    }
  }
};
</script>

<style scoped>
/* 底部和头部颜色 */
.bgColor {
  /* background: #157fcc; */
  background: #333;
  color: #fff !important;
}
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

/* 8-19 新加 */
/* 缩放 */
.main {
  padding: 20px;
  box-sizing: border-box;
  background: #fafafa;
}

#container {
  width: 100%;
  overflow: hidden;
}
#container_left,
#container_right {
  float: left;
  box-sizing: border-box;
}
#container_left {
  width: 251px;
  border-right: solid 1px #e6e6e6;
  overflow-y: scroll;
  overflow-x: hidden;
}
#container_right {
  width: calc(100% - 251px);
  overflow-y: scroll;
}
#container_left.active {
  width: 64px;
}
#container_right.active {
  width: calc(100% - 64px);
}
.main_box {
  background: #fff;
  padding: 20px;
  border: solid 1px #e6e6e6;
   box-sizing: border-box;
}
/* .footer {
  height: 30px !important;
  text-align: center;
  line-height: 30px;
} */
</style>
