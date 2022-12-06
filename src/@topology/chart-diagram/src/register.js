import { register as topologyRegister } from '@topology/core';
import { echarts, echartsList } from './echarts';
import { highcharts, highchartsList } from './highcharts';
import { lightningCharts, lightningChartsList } from './LightningChart';
export function register(_echarts) {
    echartsList.echarts = _echarts;
    topologyRegister({ echarts: echarts });
}
export function registerHighcharts(_highcharts) {
    highchartsList.highcharts = _highcharts;
    topologyRegister({ highcharts: highcharts });
}
export function registerLightningChart(_lightningCharts) {
    lightningChartsList.lightningChart = _lightningCharts;
    topologyRegister({ lightningCharts: lightningCharts });
}
//# sourceMappingURL=register.js.map