import { useContext, useEffect, useRef, useState } from 'react';
import storeContext from '../../context';
import { grid } from '@svar-ui/gantt-store';
import { useStore } from '@svar-ui/lib-react';

function CellGrid() {
  const api = useContext(storeContext);
  const cellWidth = useStore(api, 'cellWidth');
  const cellHeight = useStore(api, 'cellHeight');
  const cellBorders = useStore(api, 'cellBorders');

  const nodeRef = useRef(null);
  const [color, setColor] = useState('#e4e4e4');

  useEffect(() => {
    if (typeof getComputedStyle !== 'undefined' && nodeRef.current) {
      const border = getComputedStyle(nodeRef.current).getPropertyValue(
        '--wx-gantt-border',
      );
      // Matched rather than sliced from the '#': Lightning CSS (Turbopack) rewrites
      // `#1d1e261a` to `rgba(29, 30, 38, .1)`, and the whole `1px solid rgba(...)` is not a
      // colour — canvas ignores it and strokes black.
      const match = border.match(/#[0-9a-f]+|(?:rgb|hsl)a?\([^)]*\)/i);
      setColor(match ? match[0] : '#1d1e261a');
    }
  }, []);

  const style = {
    width: '100%',
    height: '100%',
    background:
      cellWidth != null && cellHeight != null
        ? `url(${grid(cellWidth, cellHeight, color, cellBorders)})`
        : undefined,
    position: 'absolute',
  };

  return <div ref={nodeRef} className="wx-cell-grid" style={style} />;
}

export default CellGrid;
