import { useEffect, useMemo, useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type DataPoint = {
  timestamp: string;
  value: number;
};

const MAX_POINTS = 20;

export function Dashboard() {
  const [points, setPoints] = useState<DataPoint[]>([]);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");

    ws.onopen = () => setStatus("connected");
    ws.onclose = () => setStatus("disconnected");
    ws.onerror = () => setStatus("error");

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const bitcoin = Number(payload.bitcoin);
      if (!Number.isFinite(bitcoin)) return;

      setPoints((current) => {
        const next = [
          ...current,
          {
            timestamp: new Date().toLocaleTimeString(),
            value: bitcoin
          }
        ];
        return next.slice(-MAX_POINTS);
      });
    };

    return () => ws.close();
  }, []);

  const chartData = useMemo(
    () => ({
      labels: points.map((point) => point.timestamp),
      datasets: [
        {
          label: "Bitcoin (USD)",
          data: points.map((point) => point.value),
          borderColor: "rgb(37, 99, 235)",
          backgroundColor: "rgba(37, 99, 235, 0.2)"
        }
      ]
    }),
    [points]
  );

  return (
    <main style={{ margin: "2rem auto", maxWidth: "64rem", fontFamily: "Inter, sans-serif" }}>
      <h1>Real-Time Streaming Dashboard</h1>
      <p>WebSocket status: <strong>{status}</strong></p>
      <Line data={chartData} />
    </main>
  );
}
