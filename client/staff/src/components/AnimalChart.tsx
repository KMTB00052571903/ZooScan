import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from 'recharts';
import type { TopAnimal } from '../types';

interface Props {
  data: TopAnimal[];
}

// Colores por categoría de animal
const CATEGORY_COLORS: Record<string, string> = {
  reptiles: '#52b788',
  mammals:  '#0099ee',
  birds:    '#f59e0b'
};

export const AnimalChart = ({ data }: Props) => {
  if (!data.length) {
    return (
      <div style={{ textAlign: 'center', color: 'rgba(226,238,255,0.3)', fontSize: '13px', padding: '60px 0' }}>
        Sin datos de escaneos aún.
        <br />Escanea algunos QR para ver el gráfico.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 40 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: 'rgba(226,238,255,0.5)' }}
          angle={-35}
          textAnchor="end"
          interval={0}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'rgba(226,238,255,0.5)' }}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: '#0d1a2e',
            border: '1px solid rgba(0,119,204,0.3)',
            borderRadius: '10px',
            color: '#e2eeff',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '13px'
          }}
          formatter={(value: number) => [value, 'Escaneos']}
        />
        <Bar dataKey="scan_count" radius={[5, 5, 0, 0]} maxBarSize={50}>
          {data.map((entry) => (
            <Cell
              key={entry.id}
              fill={CATEGORY_COLORS[entry.category] ?? '#0077cc'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
