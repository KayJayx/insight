import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function DndProviderWrapper({ children }) {
  // This component wraps the application in a React DnD provider
  // using the HTML5 backend, enabling drag-and-drop support in the browser.
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

export default DndProviderWrapper
