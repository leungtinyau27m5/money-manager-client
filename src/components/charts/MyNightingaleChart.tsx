import { memo, useEffect, useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as echarts from "echarts/core";
import { PieChart, PieSeriesOption } from "echarts/charts";
import {
  LegendComponent,
  LegendComponentOption,
  TooltipComponent,
  TooltipComponentOption,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { ECharts } from "echarts/core";
import { LabelLayout } from "echarts/features";
import { formatCurrencyWithPlaces } from "src/helpers/common";
import { CategorizedType } from "src/containers/categorize/CategorizeTranRow";

echarts.use([
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TooltipComponent,
]);

type MyNightingaleCharOption = echarts.ComposeOption<
  LegendComponentOption | PieSeriesOption | TooltipComponentOption
>;

const MyNightingaleChart = memo((props: MyNightingaleChartProps) => {
  const { data, sum } = props;
  const me = useRef<HTMLDivElement>(null);
  const echartRef = useRef<ECharts | null>(null);
  const names = data.reduce((arr, ele) => {
    arr.push(ele[0]);
    return arr;
  }, [] as string[]);
  const optionsRef = useRef<MyNightingaleCharOption>({
    legend: {
      top: 10,
      align: "auto",
    },
    tooltip: {
      formatter: (params: any) => {
        return `${params.name}: $${formatCurrencyWithPlaces(params.value)} \n(${
          params.percent
        }%)`;
      },
    },
    series: [
      {
        type: "pie",
        radius: ["0%", "50%"],
        center: ["50%", "60%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 15,
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
              fontSize: "12px",
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
      data: data.map((ele) => ({ name: ele[0], value: ele[1].value })),
    };
    optionsRef.current = {
      ...optionsRef.current,
      legend: {
        ...optionsRef.current.legend,
        formatter: (name) => {
          const found = data.find((ele) => ele[0] === name);

          return found
            ? `${name} \n${((found[1].value * 100) / sum).toFixed(2)}%`
            : name;
        },
        textStyle: {
          fontFamily: "Noto Sans TC",
          color: "#000",
          fontWeight: 500,
        },
      },
      series: newSeries,
    };
    echartRef.current.setOption(optionsRef.current);
  }, [data, sum]);

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
        height: 110 + Math.ceil(names.length / 4) * 115,
        display: "flex",
        justifyContent: "center",
      }}
    ></Box>
  );
});

export interface MyNightingaleChartProps {
  data: [string, CategorizedType][];
  sum: number;
}

export default MyNightingaleChart;
