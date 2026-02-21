import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const data = [
    { subject: 'Automatización', A: 20, B: 100, fullMark: 100 },
    { subject: 'Datos Unificados', A: 20, B: 100, fullMark: 100 },
    { subject: 'Equipo / Cultura', A: 20, B: 100, fullMark: 100 },
    { subject: 'Tecnología', A: 20, B: 100, fullMark: 100 },
    { subject: 'Procesos', A: 20, B: 100, fullMark: 100 },
];

// Map levels to chart data
const levelData = {
    1: [20, 10, 20, 10, 30],
    2: [40, 30, 40, 30, 50],
    3: [60, 50, 60, 50, 70],
    4: [80, 70, 80, 70, 90],
    5: [100, 100, 100, 100, 100],
};

const SOHIChart = ({ level }: { level: number | null }) => {
    const currentLevel = level || 1;
    const values = levelData[currentLevel as keyof typeof levelData] || levelData[1];

    const chartData = data.map((d, i) => ({
        ...d,
        value: values[i],
    }));

    return (
        <div className="w-full h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Nivel SOHI"
                        dataKey="value"
                        stroke="#F5A623"
                        strokeWidth={3}
                        fill="#F5A623"
                        fillOpacity={0.4}
                        animationDuration={500}
                        animationEasing="ease-out"
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: '#F5A623', fontWeight: 'bold' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SOHIChart;
