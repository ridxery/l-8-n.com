import { Handle, Position, useNodeConnections, useNodesData, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';

function LightnessNode({ id }) {
    const { updateNodeData } = useReactFlow();

    const conection = useNodeConnections({ handleType: 'target' });
    const nodesData = useNodesData(conection?.[0].source);

    const [lightness, setLightness] = useState('dark');

    useEffect(() => {
        if (nodesData?.data) {
            const color = nodesData.data.value as { r: number; g: number; b: number };
            const isLight = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b >= 128;
            setLightness(isLight ? 'light' : 'dark');

            const newNodeData = isLight ? { light: color, dark: null } : { light: null, dark: color };
            updateNodeData(id, newNodeData);
        } else {
            setLightness('dark');
            updateNodeData(id, { light: null, dark: { r: 0, g: 0, b: 0 } });
        }
    }, [nodesData, updateNodeData]);

    return (
        <div
            className="lightness-node"
            style={{
                background: lightness === 'light' ? 'white' : 'black',
                color: lightness === 'light' ? 'black' : 'white',
            }}
        >
            <Handle
                type="target"
                position={Position.Left}
            />
            <p className="mr-3">Lightness</p>
            <Handle
                type="source"
                id="light"
                position={Position.Right}
                style={{ top: 25 }}
            />
            <p className="mr-3">{lightness}</p>
            <Handle
                type="source"
                id="dark"
                position={Position.Right}
                style={{ top: 75 }}
            />
        </div>
    );
}

export default LightnessNode;
