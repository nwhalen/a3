import * as d3 from 'd3';
import { Bubbles } from './chartcomponents/Bubbles';
import { DotMarks } from './chartcomponents/DotMarks';
import { useChartDimensions } from './hooks/useChartDimensions';

const chartSettings = {
  marginBottom: 40,
  marginLeft: 40,
  marginTop: 15,
  marginRight: 15,
  height: 400,
  width: 500,
};

//randomly selects one of the 10 datasets and puts it into an array
const ran = Math.floor(Math.random() * 10)

const createBubbleData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { data }: { data: any[] },

  width = 100,
  height = 100,
) => {
  //BEYOND THIS POINT IS A LOOP THE RUNS AFTER EACH CLICK OR TYPE

  const dataArr = data.map((d) => d);

  //isolates the randomly selected dataset into its own array
  const t = [];
    t.push(dataArr[ran])

  //uses the randomly selected dataset and grabs all five "value" to create the bubble graphs
  const dArr = [];
  for(let i=0; i<5;i++){
    dArr.push(t.map((d) => d.datas[i].value));
  }
  const jsonData = { children: dArr.map((d) => ({ value: d })) };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bubble: any = d3
    .pack()
    .size([width - 10, height - 10])
    .padding(1.5);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bubbleNodes = d3.hierarchy(jsonData).sum((d: any) => d.value);
  return bubble(bubbleNodes)
    .descendants()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((d: any) => !d.children).map((d: any, idx: number) => ({ bubble: d, data: data[idx] }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMarkPositions = (bubbleData: any[], selected: number[]) => bubbleData.filter((d, i) => selected.includes(i)).map(({ bubble: d }) => ({ x: d.x, y: d.y }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BubbleChart({ parameters }: { parameters: any }) {
  const [ref, dms] = useChartDimensions(chartSettings);
  const bubbleData = createBubbleData(parameters, dms.width, dms.height);
  const markPositions = createMarkPositions(bubbleData, parameters.selectedIndices);

  return (
    <div className="Chart__wrapper" ref={ref} style={{ height: '400px' }}>
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft / 2, dms.marginTop / 2].join(
            ',',
          )})`}
        >
          <Bubbles data={bubbleData} />
          <DotMarks positions={markPositions} />
        </g>
      </svg>
    </div>
  );
}

export default BubbleChart;
