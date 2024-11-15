import AppProvider from './providers';
import AppRouter from './routes';
import { Provider } from 'react-redux'
import { store } from './store';
export default function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </Provider>
  );
}
