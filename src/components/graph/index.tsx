import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ActionGraphProps {
    xAxis: string[] | number[];
    yAxis: string[] | number[];
}
export const ChartGraph = ({ xAxis, yAxis }: ActionGraphProps) => {
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={{
                chart: {
                    type: 'line',
                    spacingBottom: 0,
                    spacingTop: 10,
                    spacingLeft: 0,
                    spacingRight: 10,
                    width: null,
                    height: 250,
                },
                title: {
                    text: ' ',
                },
                xAxis: {
                    categories: xAxis.length > 0 ? xAxis : [],
                },
                yAxis: {
                    title: {
                        text: ' ',
                    },
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                        },
                        enableMouseTracking: true,
                    },
                },
                series: [
                    {
                        name: ' ',
                        data: yAxis.length > 0 ? yAxis : [],
                    },
                ],
            }}
        />
    );
};
