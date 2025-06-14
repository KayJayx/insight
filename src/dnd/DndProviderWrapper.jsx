import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function DndProviderWrapper({ children }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

export default DndProviderWrapper
