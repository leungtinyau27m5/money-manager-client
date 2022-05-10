import { Box } from "@mui/material";
import { useEffect, useLayoutEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { PieChart, PieSeriesOption } from "echarts/charts";
import {
  ToolboxComponent,
  ToolboxComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts } from "echarts/core";
import { TransRow } from "src/data/transactions/transaction.atom";
import { currencyToNumber, formatCurrencyWithPlaces } from "src/helpers/common";
import { LabelLayout } from "echarts/features";

echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

type MyNightingaleCharOption = echarts.ComposeOption<
  ToolboxComponentOption | LegendComponentOption | PieSeriesOption
>;

const MyNightingaleChart = (props: MyNightingaleChartProps) => {
  const { data } = props;
  const me = useRef<HTMLDivElement>(null);
  const echartRef = useRef<ECharts | null>(null);
  const optionsRef = useRef<MyNightingaleCharOption>({
    legend: {
      top: 20,
    },
    toolbox: {
      feature: {
        restore: {},
      },
    },
    series: [
      {
        type: "pie",
        radius: [60, 75],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          formatter: (param) =>
            `${param.name}: \n$${
              typeof param.value === "number"
                ? formatCurrencyWithPlaces(param.value)
                : param.value
            } \n {b|${param.percent}%}`,
          rich: {
            a: {
              fontSize: "10px",
            },
            b: {
              align: "right",
            },
          },
        },
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
    newSeries[0] = {
      ...newSeries[0],
      data: Object.entries(data).reduce((arr, [key, value]) => {
        const temp = value.map((ele) => ({
          name: ele.title,
          value: currencyToNumber(ele.money),
        }));
        arr = [...arr, ...temp];
        return arr;
      }, [] as { name: string; value: number }[]),
    };
    optionsRef.current = {
      ...optionsRef.current,
      series: newSeries,
    };
    echartRef.current.setOption(optionsRef.current);
  }, [data]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!echartRef.current) return;
      echartRef.current.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

export interface MyNightingaleChartProps {
  data: {
    [date: number]: TransRow[];
  };
}

export default MyNightingaleChart;
