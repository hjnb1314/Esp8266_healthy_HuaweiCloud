"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      heart: null,
      o2: null,
      tem: null,
      hum: null,
      socket: null,
      connectionStatus: "未连接",
      isIconVisible: true
    };
  },
  onLoad() {
    setTimeout(() => {
      this.connectToServer();
    }, 1e3);
  },
  methods: {
    connectToServer() {
      this.socket = common_vendor.lookup("http://localhost:3000");
      this.socket.on("connect", () => {
        this.connectionStatus = "已连接";
        common_vendor.index.__f__("log", "at pages/index/index.vue:58", "成功连接到服务器");
        this.socket.on("deviceData", (data) => {
          this.heart = data.heart;
          this.o2 = data.o2;
          this.tem = data.tem;
          this.hum = data.hum;
          common_vendor.index.__f__("log", "at pages/index/index.vue:64", "接收到设备数据:", data);
        });
      });
      this.socket.on("connect_error", (error) => {
        this.connectionStatus = "连接失败";
        common_vendor.index.__f__("error", "at pages/index/index.vue:69", "连接服务器失败:", error);
      });
      this.socket.on("disconnect", () => {
        this.connectionStatus = "已断开";
        common_vendor.index.__f__("log", "at pages/index/index.vue:73", "与服务器断开连接");
      });
    },
    handleIconError() {
      common_vendor.index.__f__("error", "at pages/index/index.vue:77", "心率图标加载失败");
      this.isIconVisible = false;
    }
  },
  onUnload() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n({
      "icon-hidden": !$data.isIconVisible
    }),
    b: common_vendor.o((...args) => $options.handleIconError && $options.handleIconError(...args)),
    c: common_vendor.t($data.heart),
    d: common_vendor.t($data.o2),
    e: common_vendor.t($data.tem),
    f: common_vendor.t($data.hum)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
