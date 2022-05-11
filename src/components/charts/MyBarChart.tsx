import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  ToolboxComponentOption,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useMemo, useRef } from "react";
import { ECharts } from "echarts/core";
import { TransRow } from "src/data/transactions/transaction.atom";
import { Box } from "@mui/material";
import { currencyToNumber } from "src/helpers/common";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
  LabelLayout,
]);

type MyBarChartOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | BarSeriesOption
  | ToolboxComponentOption
>;

const MyBarChart = (props: MyBarChartProps) => {
  const { data } = props;
  const me = useRef<HTMLDivElement>(null);
  const echartRef = useRef<ECharts | null>(null);
  const names = useMemo(() => {
    return data.reduce((arr, ele) => {
      if (!arr.includes(ele.title)) arr.push(ele.title);
      return arr;
    }, [] as string[]);
  }, [data]);
  const optionsRef = useRef<MyBarChartOption>({
    legend: {
      top: 10,
      align: "auto",
    },
    toolbox: {
      feature: {
        restore: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (!me.current) return;
    if (echartRef.current) return;
    echartRef.current = echarts.init(me.current);
    echartRef.current.setOption(optionsRef.current);
  }, []);

  useEffect(() => {
    if (!echartRef.current) return;
    const newSeries = Array.isArray(optionsRef.current.series)
      ? [...optionsRef.current.series]
      : [];
    const obj = {} as { [name: string]: number };
    data.forEach((ele) => {
      if (!(ele.title in obj)) {
        obj[ele.title] = 0;
      }
      obj[ele.title] += currencyToNumber(ele.money);
    });
    newSeries[0] = {
      ...newSeries[0],
      data: Object.entries(obj).map(([key, value]) => ({ name: key, value })),
    };
    optionsRef.current = {
      ...optionsRef.current,
      legend: {
        ...optionsRef.current.legend,
      },
      series: newSeries,
    };
    echartRef.current.setOption(optionsRef.current);
  }, [data]);

  return (
    <Box
      ref={me}
      sx={{
        width: "100%",
        height: 320,
        display: "flex",
        justifyContent: "center",
      }}
    ></Box>
  );
};

export interface MyBarChartProps {
  data: TransRow[];
}

export default MyBarChart;
