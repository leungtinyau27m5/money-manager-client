import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
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
import { LabelLayout } from "echarts/features";
import { TransRow } from "src/data/transactions/transaction.atom";
import { currencyToNumber, formatCurrencyWithPlaces } from "src/helpers/common";

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
  const { data, sum } = props;
  const me = useRef<HTMLDivElement>(null);
  const echartRef = useRef<ECharts | null>(null);
  const names = useMemo(() => {
    return data.reduce((arr, ele) => {
      if (!arr.includes(ele.title)) arr.push(ele.title);
      return arr;
    }, [] as string[]);
  }, [data]);
  const optionsRef = useRef<MyNightingaleCharOption>({
    legend: {
      top: 10,
      align: "auto",
    },
    textStyle: {},
    toolbox: {
      feature: {
        restore: {},
      },
    },
    series: [
      {
        type: "pie",
        radius: ["15%", "45%"],
        center: ["50%", "60%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 5,
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
        formatter: (name) => {
          const count = data.reduce((total, ele) => {
            if (ele.title === name) total += currencyToNumber(ele.money);
            return total;
          }, 0);
          return `${name} \n${((count * 100) / sum).toFixed(2)}%`;
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
        height: 150 + Math.ceil(names.length / 4) * 115,
        display: "flex",
        justifyContent: "center",
      }}
    ></Box>
  );
};

export interface MyNightingaleChartProps {
  data: TransRow[];
  sum: number;
}

export default MyNightingaleChart;
