import MainPage from './pages/MainPage';

type AppProps = {
  data: {
    offersCount: number;
  };
}

const App = ({data}: AppProps) => (
  <body>
    <MainPage offersCount={data.offersCount}/>
  </body>
);

export default App;
